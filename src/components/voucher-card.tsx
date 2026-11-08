import { Pressable, Text, View } from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import {
  describeVoucherCondition,
  formatVoucherDate,
  formatVoucherValue,
  getVoucherStatus,
  type Voucher,
} from "@/data/vouchers";

interface VoucherCardProps {
  item: Voucher;
  onSave?: () => void;
}

const statusLabels = {
  active: null,
  upcoming: "Sắp diễn ra",
  expired: "Đã hết hạn",
} as const;

const VoucherCard = ({ item, onSave }: VoucherCardProps) => {
  const status = getVoucherStatus(item);
  const statusLabel = statusLabels[status];

  return (
    <ThemedView
      type="backgroundElement"
      className={`flex-row overflow-hidden rounded-2xl ${status === "expired" ? "opacity-50" : ""}`}
    >
      <View className="items-center justify-center w-24 gap-1 p-3 bg-link">
        {/* Plain Text: the badge is always white on blue, regardless of theme. */}
        <Text className="text-xl font-bold text-white">{formatVoucherValue(item)}</Text>
        <Text className="text-xs font-medium text-white">GIẢM</Text>
      </View>

      <View className="flex-1 gap-1 p-3">
        <ThemedText type="smallBold" numberOfLines={1}>
          {item.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {describeVoucherCondition(item.condition)}
        </ThemedText>
        <View className="flex-row items-center justify-between mt-1">
          <ThemedText type="code" themeColor="textSecondary">
            HSD: {formatVoucherDate(item.startDate)} - {formatVoucherDate(item.endDate)}
          </ThemedText>
          {statusLabel && (
            <ThemedText type="code" themeColor="textSecondary">
              {statusLabel}
            </ThemedText>
          )}
        </View>
      </View>
      {/* Pressable instead of Button: RN's Button can't be styled (Android always paints a background). */}
      <View className="items-center justify-center pr-2">
        <Pressable
          onPress={onSave}
          disabled={status === "expired"}
          className="rounded-full border border-link bg-transparent px-3 py-1 active:opacity-60"
        >
          <Text className="text-sm font-bold text-link">Save</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
};

export default VoucherCard;
