import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Tab Navigator types
export type TabParamList = {
  [Paths.Home]: undefined;
  [Paths.Catalog]: undefined;
  [Paths.Services]: undefined;
  [Paths.Favorites]: undefined;
  [Paths.Profile]: undefined;
};

// Root Stack types
export type RootStackParamList = {
  [Paths.MainTabs]: NavigatorScreenParams<TabParamList>;
  [Paths.Example]: undefined;
  [Paths.Startup]: undefined;
  [Paths.Login]: undefined;
  [Paths.Signup]: undefined;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type TabScreenProps<
  S extends keyof TabParamList = keyof TabParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, S>,
  StackScreenProps<RootStackParamList>
>;
