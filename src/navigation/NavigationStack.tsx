import { createStackNavigator } from '@react-navigation/stack';
import { usePreferences } from '../context/PreferencesContext';
import { HomeScreen } from '../screens/HomeScreen';
import { LifeCounterScreen } from '../screens/LifeCounterScreen';
import { RouteNames } from './constants';

export type RootStackParamList = {
  Home: undefined;
  LifeCounter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// const Header = (props: StackHeaderProps) => {
//   return <NavigationBar {...props} />;
// };

const RootStack = () => {
  const { theme } = usePreferences();

  return (
    <Stack.Navigator
      initialRouteName={RouteNames.Home}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme?.colors.surface,
        },
        headerTintColor: theme?.colors.text,
        gestureEnabled: true,
      }}>
      {/* screenOptions={{
        header: Header,
      }}> */}
      <Stack.Screen name={RouteNames.Home} component={HomeScreen} />
      <Stack.Screen
        name={RouteNames.LifeCounter}
        component={LifeCounterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
