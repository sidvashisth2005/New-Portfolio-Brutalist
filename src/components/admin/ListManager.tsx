import React from "react";
import type { FieldSchema } from "../../lib/cms/cms.types";
import { FieldRenderer } from "./FieldRenderer";
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical } from "lucide-react";

interface ListManagerProps {
  label: string;
  items: any[];
  itemSchema: FieldSchema[];
  onChange: (newItems: any[]) => void;
}

export const ListManager: React.FC<ListManagerProps> = ({
  label,
  items = [],
  itemSchema,
  onChange,
}) => {
  const handleAddItem = () => {
    const newItem: Record<string, any> = {};
    itemSchema.forEach((f) => {
      if (f.type === "tags" || f.type === "list") {
        newItem[f.key] = [];
      } else if (f.type === "number") {
        newItem[f.key] = 0;
      } else {
        newItem[f.key] = "";
      }
    });
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, key: string, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  };

  const handleDeleteItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-xs uppercase tracking-wider text-[#E8FF00] font-bold">
          {label} ({items.length} ITEMS)
        </span>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#E8FF00] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
        >
          <Plus size={14} />
          ADD ENTRY
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0D0D0D] border border-white/15 p-4 relative space-y-3 group"
          >
            {/* Header controls for list item */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-white/40" />
                <span className="font-mono text-xs uppercase text-white/70 font-bold">
                  ENTRY #{idx + 1} {item.title || item.company || item.category || ""}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(idx)}
                  disabled={idx === 0}
                  className="p-1 bg-white/5 hover:bg-white/20 text-white disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(idx)}
                  disabled={idx === items.length - 1}
                  className="p-1 bg-white/5 hover:bg-white/20 text-white disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="p-1 bg-red-600/80 hover:bg-red-600 text-white ml-2 cursor-pointer"
                  title="Delete Entry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Render item fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {itemSchema.map((field) => (
                <div
                  key={field.key}
                  className={
                    field.type === "textarea" || field.type === "tags" || field.type === "image"
                      ? "md:col-span-2"
                      : "col-span-1"
                  }
                >
                  <FieldRenderer
                    field={field}
                    value={item[field.key]}
                    onChange={(newVal) => handleUpdateItem(idx, field.key, newVal)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
