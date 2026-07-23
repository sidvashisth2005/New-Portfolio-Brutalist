import React, { useState } from "react";
import type { FieldSchema } from "../../lib/cms/cms.types";
import { ImageUploader } from "./ImageUploader";
import { Plus, X } from "lucide-react";

interface FieldRendererProps {
  field: FieldSchema;
  value: any;
  onChange: (newValue: any) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
}) => {
  const [tagInput, setTagInput] = useState("");

  if (field.type === "image") {
    return (
      <ImageUploader
        value={value || ""}
        onChange={onChange}
        label={field.label}
        helpText={field.helpText}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase tracking-wider text-white/80">
          {field.label}
        </label>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className="w-full bg-[#111111] border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-[#E8FF00] outline-none"
        />
        {field.helpText && (
          <p className="font-mono text-[10px] text-white/50">{field.helpText}</p>
        )}
      </div>
    );
  }

  if (field.type === "tags") {
    const tags: string[] = Array.isArray(value) ? value : [];

    const handleAddTag = () => {
      if (!tagInput.trim()) return;
      onChange([...tags, tagInput.trim()]);
      setTagInput("");
    };

    const handleRemoveTag = (idx: number) => {
      onChange(tags.filter((_, i) => i !== idx));
    };

    return (
      <div className="space-y-2">
        <label className="block font-mono text-xs uppercase tracking-wider text-white/80">
          {field.label}
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#E8FF00]/40 text-white font-mono text-xs"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(idx)}
                className="text-white/60 hover:text-red-400 cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="Type item and press Enter..."
            className="flex-1 bg-[#111111] border border-white/20 px-3 py-1.5 text-xs text-white font-mono focus:border-[#E8FF00] outline-none"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 py-1.5 bg-white/10 hover:bg-[#E8FF00] hover:text-black text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
        {field.helpText && (
          <p className="font-mono text-[10px] text-white/50">{field.helpText}</p>
        )}
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase tracking-wider text-white/80">
          {field.label}
        </label>
        <input
          type="number"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={field.placeholder}
          className="w-full bg-[#111111] border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-[#E8FF00] outline-none"
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block font-mono text-xs uppercase tracking-wider text-white/80">
        {field.label}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full bg-[#111111] border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-[#E8FF00] outline-none"
      />
      {field.helpText && (
        <p className="font-mono text-[10px] text-white/50">{field.helpText}</p>
      )}
    </div>
  );
};
