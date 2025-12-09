# CallToAction Component

A flexible and accessible call-to-action component with multiple variants and states. Supports responsive design across mobile, tablet, and desktop breakpoints.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` \| `ReactNode` | `'Placeholder'` | Text content or custom content for the button |
| `variant` | `'primary'` \| `'secondary'` \| `'tertiary'` \| `'quaternary'` \| `'quintary'` | `'primary'` | Visual style variant |
| `state` | `'idle'` \| `'hover'` \| `'selected'` | `'idle'` | Visual state (hover state is automatic on `:hover`) |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled styling |
| `selected` | `boolean` | `false` | Applies selected state styling |
| `onClick` | `function` | `undefined` | Click handler callback |
| `className` | `string` | `''` | Additional CSS class names |
| `icon` | `string` \| `ReactNode` | `null` | Icon URL or React component |
| `showBelow` | `boolean` | `false` | Shows text below the icon (used for Tertiary variant) |

## Variants

### Primary
- **Idle**: Deep purple background with brand tertiary text
- **Hover**: Lighter purple background with subtle lift effect
- **Disabled**: Reduced opacity, grayed out
- **Selected**: Enhanced border and shadow effect

### Secondary
- **Idle**: Dark neutral background with tertiary text
- **Hover**: Slightly lighter background
- **Disabled**: Very dark background, reduced opacity
- **Selected**: Elevated appearance with glow effect

### Tertiary
- **Idle**: Icon-only button (square container)
- **Hover**: Background lightens on hover
- **Disabled**: Icon fades out
- **Selected**: Enhanced visual presence
- **Special**: Can show text below icon with `showBelow` prop

### Quaternary
- **Similar to Primary** with slightly different accent colors
- Good for secondary actions alongside Primary variant

### Quintary
- **Similar to Secondary** with subtle styling differences
- Good for tertiary actions with lower visual weight

## Usage Examples

```jsx
import CallToAction from './components/atoms/CallToAction';

// Basic Usage
<CallToAction>Click Me</CallToAction>

// With Icon
<CallToAction 
  icon="http://localhost:3845/assets/icon.png"
  variant="primary"
>
  Start Here
</CallToAction>

// Disabled State
<CallToAction 
  variant="secondary" 
  disabled
>
  Disabled Button
</CallToAction>

// Selected State
<CallToAction 
  variant="primary" 
  selected
  onClick={() => console.log('Selected')}
>
  Active Choice
</CallToAction>

// Tertiary with Icon Below Text
<CallToAction 
  variant="tertiary"
  icon="http://localhost:3845/assets/icon.png"
  showBelow
>
  Label
</CallToAction>

// Icon Only (Tertiary)
<CallToAction 
  variant="tertiary"
  icon="http://localhost:3845/assets/icon.png"
/>
```

## CSS Variables (Design Tokens)

The component uses these CSS variables from the theme:

- `--brand-tertiary-100`: Primary text color (default: `#fbfbfe`)
- `--text-onbackground-100`: Secondary text color (default: `#fbfbfe`)
- `--branded-background-idle`: Primary variant background (default: `rgba(46, 44, 116, 0.8)`)

## Responsive Behavior

- **Mobile (≤ 768px)**: Smaller icon (24px), reduced font size (14px)
- **Tablet (769px - 1920px)**: Standard size (32px icon, 16px font)
- **Desktop (> 1920px)**: Larger icon (36px), increased font size (18px)

## Accessibility

- Uses semantic `<button>` element
- Supports `disabled` attribute for proper a11y
- Proper contrast ratios for text on backgrounds
- Clear focus states (via CSS transitions)

## Styling Architecture

The component uses CSS classes with BEM naming convention:
- `.cta` - Base button element
- `.cta-{variant}` - Variant styles (primary, secondary, etc.)
- `.cta-{state}` - State styles (idle, hover, disabled, selected)
- `.cta-root` - Root container structure
- `.cta-container` - Main flex container with icon and text
- `.cta-background` - Background styling layer

All styling uses CSS custom properties and can be easily themed by overriding the CSS variables in your global styles.
