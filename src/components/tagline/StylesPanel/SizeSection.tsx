import { FC, memo } from "react";
import { FormGroup, Label, OptionGrid } from "@/styles";
import { OptionButton } from "./index.styles";
import { ElementSize } from "@/types/elements";

const SIZES: ElementSize[] = ["xl", "l", "m", "s", "xs"];

type SizeSectionProps = {
  value: ElementSize;
  onChange: (size: ElementSize) => void;
};

export const SizeSection: FC<SizeSectionProps> = memo(({ value, onChange }) => (
  <FormGroup $withBorder>
    <Label>Size</Label>
    <OptionGrid $columns={5} role="radiogroup" aria-label="Element size">
      {SIZES.map((size) => (
        <OptionButton
          key={size}
          $isActive={value === size}
          onClick={() => onChange(size)}
          role="radio"
          aria-checked={value === size}
          aria-label={`Size ${size.toUpperCase()}`}
        >
          {size.toUpperCase()}
        </OptionButton>
      ))}
    </OptionGrid>
  </FormGroup>
));

SizeSection.displayName = 'SizeSection';
