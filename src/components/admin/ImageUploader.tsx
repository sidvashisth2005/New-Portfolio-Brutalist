import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Check } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helpText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label,
  helpText,
}) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress canvas to max width 1200px WebP
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxWidth = 1200;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/webp", 0.85);
          setPreviewUrl(compressedDataUrl);
          onChange(compressedDataUrl);
        }
        setIsCompressing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block font-mono text-xs uppercase tracking-wider text-white/80">{label}</label>}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#111111] p-3 border border-white/10 rounded-none">
        {previewUrl ? (
          <div className="relative w-24 h-24 bg-black border border-white/20 overflow-hidden flex-shrink-0 group">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setPreviewUrl("");
                onChange("");
              }}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-none opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 bg-black border border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 flex-shrink-0">
            <ImageIcon size={24} />
            <span className="font-mono text-[10px] uppercase mt-1">NO IMAGE</span>
          </div>
        )}

        <div className="flex-1 space-y-2 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setPreviewUrl(e.target.value);
              onChange(e.target.value);
            }}
            placeholder="Paste CDN image URL or upload file..."
            className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white font-mono focus:border-[#E8FF00] outline-none"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#E8FF00] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <Upload size={14} />
              {isCompressing ? "COMPRESSING..." : "UPLOAD FILE"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {helpText && <span className="font-mono text-[11px] text-white/50">{helpText}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
