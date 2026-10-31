/** NativeWind class names shared across screens. */
export const SharedClasses = {
  /** Full-screen wrapper that centers its content horizontally (pair with `content`). */
  container: 'flex-1 flex-row justify-center',
  /** Main content column, capped at `MaxContentWidth` on wide screens. */
  content: 'flex-1 max-w-content',
} as const;
