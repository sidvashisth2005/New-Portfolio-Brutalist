import type { PortfolioContentData } from "./cms.types";
import initialContent from "../../../public/data/content.json";

const STORAGE_KEY = "portfolio_cms_content_v1";

/**
 * Returns the current portfolio content.
 * Checks local storage (client-side override), then falls back to static content.json.
 */
export function getPortfolioContent(): PortfolioContentData {
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as PortfolioContentData;
      }
    } catch (e) {
      console.warn("Failed to parse cached portfolio content from localStorage:", e);
    }
  }
  return initialContent as unknown as PortfolioContentData;
}

/**
 * Saves updated content locally and triggers sync to server.
 */
export async function savePortfolioContentLocally(
  data: PortfolioContentData
): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Sends updated portfolio content payload to the serverless save API endpoint.
 */
export async function savePortfolioContentToServer(
  data: PortfolioContentData,
  token: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch("/api/admin/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      // Save locally to reflect changes immediately
      await savePortfolioContentLocally(data);
      return { success: true };
    }
    return { success: false, message: result.message || "Failed to save to server" };
  } catch (err: any) {
    return { success: false, message: err.message || "Network error while saving" };
  }
}
