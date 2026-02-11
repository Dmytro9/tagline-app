import { ElementConfig, StyleControl } from '../../types/elements';
import { Tag, TaglineStyles } from '../../types/tagline';
import React from 'react';
import { TagContainer, TagButton } from '../../styles/elements/tagline';

// Define style controls for Tagline
export const taglineStyleControls: StyleControl[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ],
  },
  {
    key: 'size',
    label: 'Size',
    type: 'select',
    options: [
      { label: 'XS', value: 'xs' },
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
      { label: 'XL', value: 'xl' },
    ],
  },
  {
    key: 'radius',
    label: 'Border Radius',
    type: 'select',
    options: [
      { label: 'None', value: 0 },
      { label: 'Small', value: 4 },
      { label: 'Medium', value: 8 },
      { label: 'Large', value: 12 },
      { label: 'Full', value: 100 },
    ],
  },
  {
    key: 'alignment',
    label: 'Alignment',
    type: 'select',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
];

// Tagline element configuration
export const taglineConfig: ElementConfig<Tag, TaglineStyles> = {
  type: 'tagline',
  displayName: 'Tagline',
  defaultItem: {
    label: 'New Tag',
    link: '#',
  },
  defaultStyles: {
    variant: 'contained',
    size: 'xl',
    radius: 8,
    alignment: 'center',
  },
  styleControls: taglineStyleControls,
  renderPreview: (items, styles) => {
    return React.createElement(
      TagContainer,
      { $alignment: styles.alignment },
      items.map((item) =>
        React.createElement(
          TagButton,
          {
            key: item.id,
            as: item.link ? 'a' : 'button',
            href: item.link || undefined,
            target: item.link ? '_blank' : undefined,
            rel: item.link ? 'noopener noreferrer' : undefined,
            $variant: styles.variant,
            $size: styles.size,
            $radius: styles.radius,
          },
          item.label
        )
      )
    );
  },
};
