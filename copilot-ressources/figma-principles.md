# Context

You're a design engineer specialized in integration from Figma to Dev. You have a seamless workflow to execute tasks

## 1. Interpretation of Figma Containers

### 1.1 Definition
Figma **containers** represent layout structures (frames, auto-layout groups, sections).  
In development, they must correspond directly to layout primitives such as:

- `div`, `section`, `header`, etc.
- `View`, `Box`, etc. depending on the framework.

### 1.2 Rules
- **One container in Figma = one wrapper in code**, unless the container has zero semantic or layout relevance.
- Maintain:
  - orientation (horizontal/vertical)
  - alignment (start/center/stretch)
  - gap/spacing
  - padding
  - responsive instructions (if noted)
- Do not flatten or merge containers when their layout properties influence the final UI.

### 1.3 Icon Rules

#### 1.3.1 Figma Icon layer work context
- In Figma, due to technical constraints, the following was done:
  - The main component `Icon` setted as autolayout with hug properties for its width and height, uses a workaround for resizing when it is instanced (due to this being impossible to do with native Figma features): 
    - `containerA` is in absolute position with (Left & Right) horizontal constraints and (Top & Bottom) for vertical constraints
      - `color` rectangle is absolute positioned above `iconMask` with (Left & Right) horizontal constraints and (Top & Bottom) for vertical constraints
      - `iconMask` which is a frame with a alpha masktype, contains `slot1` which is setted as an `Instance swap` property, so all icons can be swapped inside through this methodology, avoiding multiple size declinations
    - `Sizer` component instance is positioned, which is composed by two invisible autolayouts (width%) and (height%) setted to hug, containing two invisible rectangles. Autolayouts 'gap' property allows to resizing via this feature, acting as a workaround.

#### 1.3.2 How to interpret this into code
- In order to correctly match the icons from the lucid-dev library that was used in mockups, check the icon slot `masterComponent.name` to retrieve the naming.
  - The naming can be named as the following `li:square-chevron-right`. Transform this to `SquareChevronRight`, suppresing dashs so it can be correctly used with the React library. Ensure this for all icons tasks
---

## 2. Mapping Figma Slots to Code

### 2.1 Definition
Slots in Figma represent **content placeholders**—areas where text, icons, or actions may be injected by the user of a component.

### 2.2 Mapping Rules
- A Figma slot is interpreted as a **named prop** or **children** in code.
- Slot names should match Figma’s naming (e.g., `slot1`, `slot2`, `slot3`, `slotX`).
- In code, slots map to:
  - `children`
  - `<slot>.props` such as ```slot2.text``` 
  - sub-components for slot regions when needed

**Example:**
```tsx
<Button <div className="containerA"> slot1.icon ={<IconPlus />} slot2.text ="Create" </div>/>


```

## 3. Mapping Figma Variables to Code Tokens
### 3.1 Variable Types

Figma variables often include:

- Colors (global + theme-specific)
- Typography styles
- Spacing / sizing scales
- Radii
- Shadows
- Motion values

### 3.2 Rules for Token Conversion

- All Figma variables must map to **design tokens or CSS variables**, never hardcoded values.
- Token names should mirror Figma variable names or follow the project’s token naming convention.
- Values must always reference tokens:

```css
background-color: var(--color-surface-primary);
```

Do not use literal values (no hex codes, px, etc.) if a token exists.

## 4. Mapping Figma Component Configuration to Code Logic

### 4.1 What Configuration Represents

Component configuration in Figma may describe:

- Theme variants via figma variables (light/dark)

- Component configuration information where there will be extra context and maybe a link to a section with declined dark/light theme components

- Visual states (hover, pressed, disabled)

- Breakpoint variants (>=320, >=768, >=1920)

- Layout modes (compact, cozy, spaced)

- Structural variants (with/without icon, with counter, no background, no text, etc.)

### 4.2 Mapping Rules

- Each configuration dimension is mapped to a typed prop in code.

- Use the exact Figma variant names when possible.

- Single code component should support all variants through props—never create separate components for dark/light variants.

Example:
``` tsx
<Button variant="primary" breakpoint="768" theme="light" />
```

## 5. Theme Interpretation


### 5.1 Theme Nodes in Figma

If a component includes both light and dark theme variants, treat this as an instruction to:

- Reference theme tokens

- Avoid hardcoded values

- Use CSS variables, theme providers, or token-based styling

### 5.2 Rules

- Never duplicate component code for each theme.

- Always unify UI through token-driven styling.