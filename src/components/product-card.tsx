import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { formatPrice, type Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={onPress} className="active:opacity-70">
      <ThemedView type="backgroundElement" className="overflow-hidden rounded-2xl">
        <Image source={product.image} style={styles.image} contentFit="cover" transition={200} />
        <ThemedView type="backgroundElement" className="gap-1 p-2">
          <ThemedText type="small" numberOfLines={2} className="min-h-10">
            {product.name}
          </ThemedText>
          <ThemedText type="smallBold">{formatPrice(product.price)}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

// expo-image's Image isn't a NativeWind-enabled component, so it keeps a plain style.
const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
