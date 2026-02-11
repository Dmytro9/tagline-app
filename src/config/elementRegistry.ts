import { taglineConfig } from './elements/tagline';

// Element registry - add new element types here
export const elementRegistry = {
  tagline: taglineConfig,
} as const;

export type RegisteredElementType = keyof typeof elementRegistry;
