import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { formatPrice, getProductById } from "@/data/products";
import { SharedClasses } from "@/shared/styles";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const product = getProductById(id);

  if (!product) {
    return (
      <ThemedView className="items-center justify-center flex-1 p-6">
        <Stack.Screen options={{ title: "Không tìm thấy" }} />
        <ThemedText themeColor="textSecondary" className="text-center">
          Sản phẩm không tồn tại hoặc đã bị xoá.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className={SharedClasses.container}>
      <Stack.Screen options={{ title: product.name }} />
      <View className={SharedClasses.content}>
        <ScrollView className="flex-1" contentContainerClassName="pb-6">
          <Image source={product.image} style={styles.image} contentFit="cover" transition={200} />
          <View className="gap-2 p-4">
            <ThemedText type="subtitle">{product.name}</ThemedText>
            <Text className="text-2xl font-bold text-link">{formatPrice(product.price)}</Text>
            <ThemedText type="smallBold" className="mt-4">
              Mô tả sản phẩm
            </ThemedText>
            <ThemedText themeColor="textSecondary">{product.description}</ThemedText>
          </View>
        </ScrollView>

        <ThemedView
          className="px-4 pt-3 border-t border-selected dark:border-selected-dark"
          style={{ paddingBottom: insets.bottom + Spacing.three }}
        >
          {/* TODO: wire up once a cart exists. */}
          <Pressable className="items-center py-3 rounded-full bg-link active:opacity-70">
            <Text className="text-base font-semibold text-white">Thêm vào giỏ hàng</Text>
          </Pressable>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

// expo-image's Image isn't a NativeWind-enabled component, so it keeps a plain style.
const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
