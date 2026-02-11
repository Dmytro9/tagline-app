import { BaseElement, BaseStyles, ElementId } from "./elements";

// Tagline-specific types extending base types
export type TagId = ElementId;

export type Tag = BaseElement & {
  // Tagline tags can have additional properties here if needed
};

export type TaglineStyles = BaseStyles & {
  // Extended tagline-specific styles
};
