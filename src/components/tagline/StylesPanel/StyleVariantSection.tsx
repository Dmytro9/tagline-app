import { FC, memo } from "react";
import { FormGroup, Label, OptionGrid } from "@/styles";
import { StyleVariantButton } from "./index.styles";
import type { StyleVariant } from "@/types/elements";

const STYLE_VARIANTS: { value: StyleVariant; label: string }[] = [
  { value: "contained", label: "Aa" },
  { value: "secondary", label: "Aa" },
  { value: "primary", label: "Aa" },
  { value: "outline", label: "Aa" },
];

type StyleVariantSectionProps = {
  value: StyleVariant;
  onChange: (variant: StyleVariant) => void;
};

export const StyleVariantSection: FC<StyleVariantSectionProps> = memo(({
  value,
  onChange,
}) => (
  <FormGroup $withBorder>
    <Label>Style</Label>
    <OptionGrid $columns={4} role="radiogroup" aria-label="Style variant">
      {STYLE_VARIANTS.map((variant) => (
        <StyleVariantButton
          key={variant.value}
          $isActive={value === variant.value}
          $variant={variant.value}
          onClick={() => onChange(variant.value)}
          role="radio"
          aria-checked={value === variant.value}
          aria-label={`${variant.value} style`}
        >
          {variant.label}
        </StyleVariantButton>
      ))}
    </OptionGrid>
  </FormGroup>
));

StyleVariantSection.displayName = 'StyleVariantSection';
