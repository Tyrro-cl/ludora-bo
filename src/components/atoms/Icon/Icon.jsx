import * as LucideIcons from 'lucide-react';
import './Icon.css';

/**
 * Icon wrapper that converts Figma icon slot names into Lucide icon components.
 * Supports strings like `li:square-chevron-right` and falls back to a safe icon.
 */
const Icon = ({
  name,
  size = 24,
  color = 'var(--color-cloud-40)',
  className = '',
  children,
}) => {
  // Normalize Figma naming (e.g., "li:square-chevron-right" -> "SquareChevronRight")
  const normalizeIconName = (rawName) => {
    if (!rawName || typeof rawName !== 'string') return 'Circle';
    const withoutPrefix = rawName.replace(/^li:/i, '');
    const pascal = withoutPrefix
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join('');
    return pascal || 'Circle';
  };

  // Project-specific aliases to keep backwards compatibility with existing names
  const aliasMap = {
    Activities: 'ListTodo',
    ChevronDown: 'ChevronDown',
    Plus: 'Plus',
    CircleCheck: 'CheckCircle',
    CircleCheckBig: 'CheckCircle2',
  };

  const normalizedName = normalizeIconName(name);
  const resolvedName = aliasMap[normalizedName] || normalizedName;
  const LucideIcon = LucideIcons[resolvedName] || LucideIcons.Circle;

  return (
    <span
      className={`icon ${className}`}
      style={{ color, width: size, height: size }}
      aria-hidden="true"
    >
      {children || <LucideIcon size={size} strokeWidth={1.5} />}
    </span>
  );
};

export default Icon;
