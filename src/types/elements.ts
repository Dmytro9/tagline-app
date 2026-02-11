import React from "react";

// Base types for all elements
export type ElementId = string;
export type ElementType = "tagline" | "button" | string;

// Base element that all specific elements extend
export type BaseElement = {
  id: ElementId;
  label: string;
  link?: string;
};

// Base styles that all element styles extend
export type BaseStyles = {
  variant: StyleVariant;
  size: ElementSize;
  radius: BorderRadius;
  alignment: Alignment;
};

// Common style types
export type StyleVariant = "primary" | "secondary" | "outline" | "contained";
export type ElementSize = "xs" | "s" | "m" | "l" | "xl";
export type BorderRadius = 0 | 4 | 8 | 12 | 100;
export type Alignment = "left" | "center" | "right";

// Panel types
export const PANEL = {
  MAIN: "main",
  CREATE: "create",
  EDIT: "edit",
  STYLES: "styles",
} as const;

export type PanelType = typeof PANEL[keyof typeof PANEL] | null;

export type PanelState = {
  currentPanel: PanelType;
  editingItemId: ElementId | null;
};

// Element configuration for registry
export type ElementConfig<
  TElement extends BaseElement,
  TStyles extends BaseStyles,
> = {
  type: ElementType;
  displayName: string;
  defaultItem: Omit<TElement, "id">;
  defaultStyles: TStyles;
  styleControls: StyleControl[];
  renderPreview: (
    items: TElement[],
    styles: TStyles,
    callbacks?: { onItemClick?: (id: ElementId) => void }
  ) => React.ReactNode;
  // Optional custom panel components
  MainPanel?: React.ComponentType;
  CreateItemPanel?: React.ComponentType;
  EditItemPanel?: React.ComponentType;
  StylesPanel?: React.ComponentType;
};

// Style control definition for dynamic UI generation
export type StyleControl = {
  key: string;
  label: string;
  type: "select" | "slider" | "toggle" | "color";
  options?: { label: string; value: string | number | boolean }[];
  min?: number;
  max?: number;
  step?: number;
};
