import type { RootStackParamList, TabParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { BottomNavigation } from '@/components/organisms/BottomNavigation';

import { Home, Catalog, Example, Startup, Login, Signup } from '@/screens';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Placeholder screens for tabs
const PlaceholderScreen = ({ title }: { title: string }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.placeholder, { backgroundColor: colors.bgDark }]}>
      <Text style={[styles.placeholderText, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.placeholderSubtext, { color: colors.textSecondary }]}>
        Próximamente
      </Text>
    </View>
  );
};

// CatalogScreen now uses the actual Catalog component
const ServicesScreen = () => <PlaceholderScreen title="Servicios" />;
const FavoritesScreen = () => <PlaceholderScreen title="Favoritos" />;
const ProfileScreen = () => <PlaceholderScreen title="Perfil" />;

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={Paths.Home} component={Home} />
      <Tab.Screen name={Paths.Catalog} component={Catalog} />
      <Tab.Screen name={Paths.Services} component={ServicesScreen} />
      <Tab.Screen name={Paths.Favorites} component={FavoritesScreen} />
      <Tab.Screen name={Paths.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          key={variant}
          screenOptions={{ headerShown: false }}
          initialRouteName={Paths.MainTabs}
        >
          {/* Main Tab Navigator */}
          <Stack.Screen component={MainTabNavigator} name={Paths.MainTabs} />

          {/* Auth Screens - Modal style */}
          <Stack.Screen
            component={Login}
            name={Paths.Login}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            component={Signup}
            name={Paths.Signup}
            options={{ presentation: 'modal' }}
          />

          {/* Other screens */}
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={Example} name={Paths.Example} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
  },
});

export default ApplicationNavigator;
