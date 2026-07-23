import React, { useState, useEffect } from "react";
import { CMS_SECTIONS } from "../../lib/cms/cms.schema";
import type { PortfolioContentData } from "../../lib/cms/cms.types";
import { getPortfolioContent, savePortfolioContentLocally, savePortfolioContentToServer } from "../../lib/cms/cms.store";
import { SectionEditor } from "./SectionEditor";
import { LivePreviewPane } from "./LivePreviewPane";
import { ShieldCheck, Save, LogOut, Layout, Eye, CheckCircle2, AlertCircle } from "lucide-react";

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(CMS_SECTIONS[0].id);
  const [contentData, setContentData] = useState<PortfolioContentData>(() => getPortfolioContent());
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const activeSection = CMS_SECTIONS.find((s) => s.id === activeSectionId) || CMS_SECTIONS[0];

  const handleSectionFieldChange = (key: string, newValue: any) => {
    setContentData((prev) => {
      const updated = { ...prev, [key]: newValue };
      // Optimistic local update
      savePortfolioContentLocally(updated);
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    // Save locally & trigger server save
    await savePortfolioContentLocally(contentData);
    const result = await savePortfolioContentToServer(contentData, "admin-token-session");

    setIsSaving(false);
    if (result.success) {
      setSaveStatus({ type: "success", message: "CHANGES SAVED & PUBLISHED SUCCESSFULLY" });
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({ type: "error", message: result.message || "FAILED TO SAVE TO SERVER" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      {/* Top Telemetry Header */}
      <header className="bg-[#0A0A0A] border-b border-white/15 px-6 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E8FF00] text-black font-mono font-black flex items-center justify-center text-xs">
            SV
          </div>
          <div>
            <h1 className="font-display font-black text-lg tracking-wider text-white uppercase leading-none">
              ADMIN CMS // CONTROLLER
            </h1>
            <p className="font-mono text-[10px] text-[#E8FF00] tracking-widest uppercase mt-0.5">
              SESSION: ACTIVE · SINGLE ADMIN ACCESS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {saveStatus && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-bold border ${
                saveStatus.type === "success"
                  ? "bg-green-950/80 border-green-500 text-green-300"
                  : "bg-red-950/80 border-red-500 text-red-300"
              }`}
            >
              {saveStatus.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{saveStatus.message}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Eye size={14} />
            {showPreview ? "HIDE PREVIEW" : "SHOW PREVIEW"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-[#E8FF00] text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            {isSaving ? "SAVING..." : "SAVE & PUBLISH"}
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-xs uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
            title="Logout Admin"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Nav */}
        <aside className="w-64 bg-[#080808] border-r border-white/15 flex-shrink-0 p-4 space-y-2 overflow-y-auto hidden md:block">
          <div className="font-mono text-[10px] uppercase text-white/50 tracking-widest px-3 mb-2">
            SECTIONS ({CMS_SECTIONS.length})
          </div>
          {CMS_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSectionId(s.id)}
              className={`w-full text-left px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                activeSectionId === s.id
                  ? "bg-[#E8FF00] text-black font-bold border-[#E8FF00]"
                  : "bg-transparent text-white/70 hover:text-white hover:bg-white/5 border-transparent"
              }`}
            >
              {s.title}
            </button>
          ))}
        </aside>

        {/* Mobile Section Dropdown */}
        <div className="md:hidden p-4 bg-[#0A0A0A] border-b border-white/10 w-full">
          <select
            value={activeSectionId}
            onChange={(e) => setActiveSectionId(e.target.value)}
            className="w-full bg-black border border-white/20 px-3 py-2 text-xs font-mono text-white outline-none"
          >
            {CMS_SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Center Editor */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#050505]">
          <SectionEditor
            section={activeSection}
            contentData={contentData}
            onChange={handleSectionFieldChange}
          />
        </main>

        {/* Right Live Preview Pane */}
        {showPreview && (
          <aside className="hidden lg:block w-[450px] xl:w-[550px] bg-[#0A0A0A] border-l border-white/15 flex-shrink-0 overflow-hidden">
            <LivePreviewPane
              activeSectionId={activeSection.id}
              visualTarget={activeSection.visualTarget}
            />
          </aside>
        )}
      </div>
    </div>
  );
};
