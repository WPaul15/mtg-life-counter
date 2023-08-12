import { createStackNavigator } from '@react-navigation/stack';
import { usePreferences } from '../context/PreferencesContext';
import { DetailsScreen } from '../screens/DetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RouteNames } from './constants';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
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
      }}>
      {/* screenOptions={{
        header: Header,
      }}> */}
      <Stack.Screen name={RouteNames.Home} component={HomeScreen} />
      <Stack.Screen name={RouteNames.Details} component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
