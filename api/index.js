// Vercel Node.js serverless function wrapper for TanStack Start SSR server.
// The built server exports a Web Fetch API handler ({ fetch(req, env, ctx) }).
// This adapter bridges Vercel's Node.js (req, res) interface to the Fetch API.

import { Readable } from "node:stream";
import server from "../dist/server/server.js";

function nodeRequestToWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";

  // Parse the rewritten req.url to get search params (query parameters)
  const reqUrlParsed = new URL(req.url, `${protocol}://${host}`);

  // Extract original path from query parameter
  let originalPath = reqUrlParsed.searchParams.get("_original_path") || "/";

  // If the path doesn't start with "/", prepend it
  if (!originalPath.startsWith("/")) {
    originalPath = "/" + originalPath;
  }

  // Remove the _original_path query parameter from the search parameters
  // so the application doesn't see our internal routing query param.
  const searchParams = new URLSearchParams(reqUrlParsed.search);
  searchParams.delete("_original_path");

  const searchString = searchParams.toString();
  const url = new URL(`${originalPath}${searchString ? "?" + searchString : ""}`, `${protocol}://${host}`);

  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    const lowerKey = key.toLowerCase();
    // Skip hop-by-hop headers
    if (["connection", "keep-alive", "transfer-encoding", "te", "upgrade"].includes(lowerKey)) {
      continue;
    }
    // Skip content-length if there's no body
    if (lowerKey === "content-length" && !hasBody) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value) {
      headers.set(key, value);
    }
  }

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

async function webResponseToNode(webRes, res) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}

export default async function vercelHandler(req, res) {
  try {
    const webRequest = nodeRequestToWebRequest(req);
    const webResponse = await server.fetch(webRequest, {}, {});
    await webResponseToNode(webResponse, res);
  } catch (err) {
    console.error("SSR Error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
