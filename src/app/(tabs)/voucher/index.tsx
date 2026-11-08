import { FlatList, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import VoucherCard from "@/components/voucher-card";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { getVoucherStatus, VOUCHERS } from "@/data/vouchers";
import { SharedClasses } from "@/shared/styles";

// Usable vouchers first, then upcoming, expired last.
const statusOrder = { active: 0, upcoming: 1, expired: 2 } as const;

const VoucherView = () => {
  const insets = useSafeAreaInsets();

  const vouchers = [...VOUCHERS].sort((a, b) => statusOrder[getVoucherStatus(a)] - statusOrder[getVoucherStatus(b)]);

  const headerPaddingTop = Platform.OS === "web" ? Spacing.four : insets.top + Spacing.two;
  const listPaddingBottom = Platform.OS === "web" ? Spacing.four : insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ThemedView className={SharedClasses.container}>
      <View className={SharedClasses.content}>
        <View className="px-4 pb-2" style={{ paddingTop: headerPaddingTop }}>
          <ThemedText type="subtitle">Voucher của bạn</ThemedText>
        </View>

        <FlatList
          data={vouchers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VoucherCard item={item} />}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListEmptyComponent={
            <ThemedText themeColor="textSecondary" className="mt-8 text-center">
              Bạn chưa có voucher nào
            </ThemedText>
          }
          contentContainerClassName="px-4 pt-2"
          contentContainerStyle={{ paddingBottom: listPaddingBottom }}
        />
      </View>
    </ThemedView>
  );
};

export default VoucherView;
