import { FC, memo } from "react";
import { FormGroup, Label, OptionGrid } from "@/styles";
import { OptionButton } from "./index.styles";
import { BorderRadius } from "@/types/elements";

const RADIUS_OPTIONS: BorderRadius[] = [0, 4, 8, 12, 100];

type RadiusSectionProps = {
  value: BorderRadius;
  onChange: (radius: BorderRadius) => void;
};

export const RadiusSection: FC<RadiusSectionProps> = memo(({ value, onChange }) => (
  <FormGroup $withBorder>
    <Label>Radius</Label>
    <OptionGrid $columns={5} role="radiogroup" aria-label="Border radius">
      {RADIUS_OPTIONS.map((radius) => (
        <OptionButton
          key={radius}
          $isActive={value === radius}
          onClick={() => onChange(radius)}
          role="radio"
          aria-checked={value === radius}
          aria-label={`Radius ${radius}px`}
        >
          {radius}
        </OptionButton>
      ))}
    </OptionGrid>
  </FormGroup>
));

RadiusSection.displayName = 'RadiusSection';
