# Tagline Element Editor

A React application for creating and managing tagline elements with a dynamic settings panel. Built with TypeScript, MobX, and Styled Components featuring a modern dark theme interface.

## 🚀 Features

- **Dark Theme UI** - Modern dark interface with floating panels and radial gradient background
- **Preview Area** - Real-time preview of tagline elements with applied styles
- **Drag & Drop** - Reorder tags with smooth drag-and-drop interactions (@dnd-kit)
- **Main Panel** - Manage tags with add, edit, delete, and reorder functionality
- **Create/Edit Panels** - Forms for managing tag labels and links
- **Styles Panel** - Configure visual appearance:
  - 4 style variants (Primary, Secondary, Outline, Ghost)
  - 5 size options (XS, S, M, L, XL)
  - 5 border radius options (0, 4, 8, 12, 100)
  - 3 alignment options (Left, Center, Right)
- **Data Persistence** - Simulated API calls logged to console
- **Smooth Animations** - Panel transitions and interactions

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **MobX** - State management
- **Styled Components** - CSS-in-JS styling
- **Vite** - Build tool and dev server

## 📦 Installation

```bash
npm install
```

## 🏃 Running the Project

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🏗 Architecture

### Store Structure

- **TaglineStore** - Manages tags and styles state
- **UIStore** - Handles panel navigation and UI state
- **RootStore** - Combines all stores with React Context

### Component Structure

```
src/
├── components/
│   ├── PanelHeaderComponent.tsx    # Reusable panel header
│   ├── PreviewArea/
│   │   ├── index.tsx               # Real-time element preview
│   │   └── index.styles.ts         # Preview-specific styles
│   └── tagline/
│       ├── MainPanel/
│       │   ├── index.tsx           # Tag list & management
│       │   ├── SortableItem.tsx    # Draggable tag item
│       │   └── index.styles.ts     # Panel styles
│       ├── CreateItemPanel/
│       │   ├── index.tsx           # Create new tag form
│       │   └── useCreateItem.ts    # Create logic hook
│       ├── EditItemPanel/
│       │   ├── index.tsx           # Edit tag form
│       │   └── useEditItem.ts      # Edit logic hook
│       └── StylesPanel/
│           ├── index.tsx            # Style configuration hub
│           ├── StyleVariantSection.tsx
│           ├── SizeSection.tsx
│           ├── RadiusSection.tsx
│           ├── AlignmentSection.tsx
│           └── index.styles.ts
├── stores/
│   ├── ElementStore.ts         # Generic element store factory
│   ├── TaglineStore.ts         # Tagline-specific store
│   ├── UIStore.ts              # Panel navigation & UI state
│   └── RootStore.tsx           # Store provider & context
├── config/
│   ├── elementRegistry.ts      # Element type registry
│   └── elements/
│       └── tagline.ts          # Tagline configuration
├── types/
│   ├── elements.ts             # Generic element types
│   └── tagline.ts              # Tagline-specific types
└── styles/
    ├── colors.ts               # Centralized color tokens
    ├── GlobalStyle.ts          # Global CSS reset & fonts
    ├── index.ts                # Style exports
    ├── ui/
    │   ├── layout.ts           # App layout components
    │   ├── buttons.ts          # Button variants
    │   ├── forms.ts            # Form inputs & labels
    │   └── panels.ts           # Panel containers
    └── elements/
        └── tagline/
            └── index.ts        # Tag-specific styles
```

### Scalability & Extensibility

The architecture uses a **generic element system** for easy extensibility:

1. **New Element Types**: 
   - Create element config in `config/elements/`
   - Define types in `types/`
   - Use `createElementStore` factory for state management
   - Register in `elementRegistry.ts`

2. **Custom Panels**: 
   - Override default panels in element config
   - Use custom hooks for complex logic
   - Leverage shared UI components

3. **Style System**:
   - Centralized color tokens in `colors.ts`
   - Organized by category (ui/, elements/)
   - Transient props prevent DOM pollution

4. **Performance Optimizations**:
   - React.memo on style sections
   - useCallback for event handlers
   - MobX computed values for derived state
   - toJS() conversions at boundaries

## 📋 API Simulation

All changes are logged to the browser console with simulated HTTP methods:

- `POST /api/tagline/tags` - Create new tag
- `PUT /api/tagline/tags/:id` - Update tag
- `DELETE /api/tagline/tags/:id` - Delete tag
- `PUT /api/tagline/tags/reorder` - Reorder tags
- `PUT /api/tagline/styles` - Update styles

## 🎨 Design System

### Color Tokens
Centralized color system in `src/styles/colors.ts`:
- **Background**: Single primary value for consistency
- **Opacity**: White overlay (10% for disabled states)
- **Text**: Primary, secondary, disabled, dim hierarchy
- **Surface**: Base surface color for cards/panels
- **Primary**: Main brand color with hover/light/dark variants
- **Status**: Success, warning, error, info colors

### Layout & Spacing
- **Responsive**: Desktop-first with mobile breakpoints at max-width: 768px
- **Grid**: Flex-based layout with order property for mobile reflow
- **Spacing**: 8px base unit (multiples of 8: 8px, 16px, 24px, 32px)
- **Border radius**: 8px default, 4px for small elements

### Accessibility
- **ARIA labels** on all interactive elements
- **Keyboard navigation**: Enter to submit forms, arrow keys for navigation
- **Focus indicators**: Visible focus states on all controls
- **Screen reader support**: Proper roles and labels (radiogroup, radio, button)

## 📝 Implementation Details

### MobX Integration

- Uses `makeAutoObservable` for reactive state
- `observer` HOC wraps all components that consume store data
- `toJS()` conversions at component boundaries for non-observer contexts
- Store updates automatically trigger component re-renders

### Performance Optimizations

- **React.memo**: Applied to style panel sections to prevent unnecessary re-renders
- **useCallback**: Memoizes event handlers to maintain referential equality
- **Computed values**: MobX computed properties for derived state
- **Debounced updates**: Input changes debounced before API calls

### Type Safety

- Full TypeScript coverage
- Strict type checking enabled
- Interfaces for all data structures
- Generic store factory with type inference

### Styled Components

- **Transient props** ($variant, $size, $isActive, $isCollapsed) prevent DOM pollution
- **Modular organization**: Separate files for ui/ and elements/ styles
- **Color tokens**: Consistent use of centralized color system
- **Type-safe props**: Full TypeScript support for all styled components
