import React from "react";
import type { SectionSchema } from "../../lib/cms/cms.types";
import { FieldRenderer } from "./FieldRenderer";
import { ListManager } from "./ListManager";

interface SectionEditorProps {
  section: SectionSchema;
  contentData: any;
  onChange: (key: string, newValue: any) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  contentData,
  onChange,
}) => {
  return (
    <div className="space-y-6 bg-[#0A0A0A] border border-white/15 p-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="font-display font-black text-xl text-[#E8FF00] tracking-wider uppercase">
          {section.title}
        </h3>
        <p className="font-mono text-xs text-white/60 mt-1">{section.description}</p>
      </div>

      <div className="space-y-6">
        {section.fields.map((field) => {
          if (field.type === "list" && field.itemSchema) {
            return (
              <ListManager
                key={field.key}
                label={field.label}
                items={contentData[field.key] || []}
                itemSchema={field.itemSchema}
                onChange={(newItems) => onChange(field.key, newItems)}
              />
            );
          }

          return (
            <FieldRenderer
              key={field.key}
              field={field}
              value={contentData[field.key]}
              onChange={(newVal) => onChange(field.key, newVal)}
            />
          );
        })}
      </div>
    </div>
  );
};
