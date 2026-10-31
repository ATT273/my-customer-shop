import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

// Full class strings so Tailwind can find them when scanning the source.
const backgroundClasses: Record<ThemeColor, string> = {
  background: 'bg-background dark:bg-background-dark',
  backgroundElement: 'bg-element dark:bg-element-dark',
  backgroundSelected: 'bg-selected dark:bg-selected-dark',
  text: 'bg-foreground dark:bg-foreground-dark',
  textSecondary: 'bg-muted dark:bg-muted-dark',
};

export function ThemedView({ className, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  return (
    <View className={`${backgroundClasses[type ?? 'background']} ${className ?? ''}`} {...otherProps} />
  );
}
