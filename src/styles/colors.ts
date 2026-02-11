export const colors = {
  // Base colors
  background: {
    primary: '#141414',
  },

  // Surface colors
  surface: {
    base: '#2c2c2c',
    dark: '#232323',
  },

  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#ededed',
    disabled: '#9a9a9a',
    dim: '#6a6a6a',
  },

  // Primary/Accent colors (blue)
  primary: {
    main: '#36c6ff',
    hover: '#4cd1ff',
    light: '#56adff',
    dark: '#157bda',
    darker: '#1a85e0',
  },

  // Opacity colors (using rgba)
  opacity: {
    white10: 'rgba(255, 255, 255, 0.1)',
    primaryLight15: 'rgba(54, 198, 255, 0.15)',
    primaryLight20: 'rgba(54, 198, 255, 0.2)',
    blueDark20: 'rgba(21, 123, 218, 0.2)',
    blueDark30: 'rgba(21, 123, 218, 0.3)',
  },

  // Autofill colors (for input autofill)
  autofill: {
    background: '#393939',
    text: '#dadada',
  },
} as const;

// Type for color paths
export type ColorPath = typeof colors;
