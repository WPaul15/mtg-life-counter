import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { NavigationBar } from './components/NavigationBar';
import {
  PreferencesProvider,
  usePreferences,
} from './context/PreferencesContext';
import { DetailsScreen } from './screens/DetailsScreen';
import { HomeScreen } from './screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const { theme } = usePreferences();

  return (
    <PreferencesProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: NavigationBar,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesProvider>
  );
};

export default App;
