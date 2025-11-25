import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { useAuth } from '@/hooks/auth/useAuth';

import { Home, Example, Startup, Login, Signup } from '@/screens';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          key={variant}
          screenOptions={{ headerShown: false }}
          initialRouteName={Paths.Home}
        >
          {/* Main App Screens - Available to everyone */}
          <Stack.Screen component={Home} name={Paths.Home} />

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

export default ApplicationNavigator;
