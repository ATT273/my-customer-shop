import { SymbolView } from 'expo-symbols';
import { TextInput, type TextInputProps } from 'react-native';

import { ThemedView } from './themed-view';

import { useTheme } from '@/hooks/use-theme';

export function SearchBar({ className, ...props }: TextInputProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" className="h-11 flex-row items-center gap-2 rounded-full px-4">
      <SymbolView
        tintColor={theme.textSecondary}
        name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
        size={18}
      />
      <TextInput
        placeholderTextColor={theme.textSecondary}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCorrect={false}
        className={`h-full flex-1 text-base text-foreground dark:text-foreground-dark web:outline-none ${className ?? ''}`}
        {...props}
      />
    </ThemedView>
  );
}
