import React from "react";
import { Eye, ExternalLink, RefreshCw } from "lucide-react";

interface LivePreviewPaneProps {
  activeSectionId: string;
  visualTarget: string;
}

export const LivePreviewPane: React.FC<LivePreviewPaneProps> = ({
  activeSectionId,
  visualTarget,
}) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `/${visualTarget}`;
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/15 h-full flex flex-col">
      {/* Telemetry bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Eye size={14} className="text-[#E8FF00]" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            LIVE PREVIEW // TARGET: {visualTarget}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 bg-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Refresh Preview"
          >
            <RefreshCw size={12} />
          </button>
          <a
            href={`/${visualTarget}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#E8FF00] text-black font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            OPEN LIVE <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Embedded Iframe Preview */}
      <div className="flex-1 bg-black relative overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`/${visualTarget}`}
          title="Live Portfolio Preview"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};
