import { type ElementType, FC, memo } from "react";
import { FormGroup, OptionGrid } from "@/styles";
import type { Alignment } from "@/types/elements";
import AlignLeft from "@/assets/icons/align-left.svg?react";
import AlignCenter from "@/assets/icons/align-center.svg?react";
import AlignRight from "@/assets/icons/align-right.svg?react";
import { OptionButton } from "./index.styles";

const ALIGNMENTS: { value: Alignment; icon: ElementType }[] = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
];

type AlignmentSectionProps = {
  value: Alignment;
  onChange: (alignment: Alignment) => void;
};

export const AlignmentSection: FC<AlignmentSectionProps> = memo(({
  value,
  onChange,
}) => (
  <FormGroup $withBorder>
    <OptionGrid $columns={3} role="radiogroup" aria-label="Element alignment">
      {ALIGNMENTS.map((alignment) => {
        const Icon = alignment.icon;
        return (
          <OptionButton
            key={alignment.value}
            $isActive={value === alignment.value}
            onClick={() => onChange(alignment.value)}
            role="radio"
            aria-checked={value === alignment.value}
            aria-label={`Align ${alignment.value}`}
          >
            <Icon aria-hidden="true" />
          </OptionButton>
        );
      })}
    </OptionGrid>
  </FormGroup>
));

AlignmentSection.displayName = 'AlignmentSection';
