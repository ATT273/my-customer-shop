import { Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

const typeClasses: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: 'text-base font-medium',
  title: 'text-[48px] leading-[52px] font-semibold',
  small: 'text-sm font-medium',
  smallBold: 'text-sm font-bold',
  subtitle: 'text-[32px] leading-[44px] font-semibold',
  link: 'text-sm leading-[30px]',
  linkPrimary: 'text-sm leading-[30px]',
  code: 'text-xs font-medium android:font-bold',
};

// Full class strings so Tailwind can find them when scanning the source.
const colorClasses: Record<ThemeColor, string> = {
  text: 'text-foreground dark:text-foreground-dark',
  textSecondary: 'text-muted dark:text-muted-dark',
  background: 'text-background dark:text-background-dark',
  backgroundElement: 'text-element dark:text-element-dark',
  backgroundSelected: 'text-selected dark:text-selected-dark',
};

export function ThemedText({ className, style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const colorClass = type === 'linkPrimary' ? 'text-link' : colorClasses[themeColor ?? 'text'];

  return (
    <Text
      className={`${colorClass} ${typeClasses[type]} ${className ?? ''}`}
      // Platform-specific font stack, which a single Tailwind class can't express.
      style={[type === 'code' && { fontFamily: Fonts.mono }, style]}
      {...rest}
    />
  );
}
