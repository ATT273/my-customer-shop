import type { Href } from "expo-router";
import { TabList, TabListProps, Tabs, TabSlot, TabTrigger, TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, View } from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import { Bell, House, Ticket, User } from "lucide-react-native";
export default function AppTabs() {
  return (
    // The tab bar sits in normal flow below the slot, so screens don't need to pad around it.
    <Tabs style={{ flex: 1 }}>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <CustomTabList>
          {/* Typed routes emit `/index` and `/explore/index` for folder index files, but `/` and `/explore` are the real URLs. */}
          <TabTrigger name="(home)" href={"/" as Href} asChild>
            <TabButton>
              <House />
            </TabButton>
          </TabTrigger>
          <TabTrigger name="voucher" href={"/voucher" as Href} asChild>
            <TabButton>
              <Ticket />
            </TabButton>
          </TabTrigger>
          <TabTrigger name="notification" href={"/notification" as Href} asChild>
            <TabButton>
              <Bell />
            </TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href={"/profile" as Href} asChild>
            <TabButton>
              <User />
            </TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

// `style` is dropped on purpose: TabTrigger/TabList pass default styles that would fight the classes.
export function TabButton({ children, isFocused, style, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} className="active:opacity-70">
      <ThemedView type={isFocused ? "backgroundSelected" : "backgroundElement"} className="px-4 py-1 rounded-2xl">
        <ThemedText type="small" themeColor={isFocused ? "text" : "textSecondary"}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList({ style, ...props }: TabListProps) {
  return (
    <View {...props} className="flex-row items-center justify-center w-full p-4">
      <ThemedView
        type="backgroundElement"
        className="max-w-content grow flex-row items-center gap-2 rounded-[32px] px-3 py-2 justify-between"
      >
        {props.children}
      </ThemedView>
    </View>
  );
}
