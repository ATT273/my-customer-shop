import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { PRODUCTS } from "@/data/products";
import { SharedClasses } from "@/shared/styles";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const keyword = query.trim().toLowerCase();
  const products = keyword ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(keyword)) : PRODUCTS;

  const headerPaddingTop = Platform.OS === "web" ? Spacing.four : insets.top + Spacing.two;
  const listPaddingBottom = Platform.OS === "web" ? Spacing.four : insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ThemedView className={SharedClasses.container}>
      <View className={SharedClasses.content}>
        <View className="px-4 pb-2" style={{ paddingTop: headerPaddingTop }}>
          <SearchBar placeholder="Tìm kiếm sản phẩm" value={query} onChangeText={setQuery} />
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View className="w-1/2 p-2">
              <ProductCard
                product={item}
                onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } })}
              />
            </View>
          )}
          ListEmptyComponent={
            <ThemedText themeColor="textSecondary" className="mt-8 text-center">
              Không tìm thấy sản phẩm nào
            </ThemedText>
          }
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-2"
          contentContainerStyle={{ paddingBottom: listPaddingBottom }}
        />
      </View>
    </ThemedView>
  );
}
