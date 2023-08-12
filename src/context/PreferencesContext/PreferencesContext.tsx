import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { NavigationTheme } from 'react-native-paper/lib/typescript/types';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

interface Preferences {
  toggleTheme: () => void;
  isDarkTheme: boolean;
  theme: MD3Theme & NavigationTheme;
}

const PreferencesContext = createContext<Preferences>({
  toggleTheme: () => {},
  isDarkTheme: false,
  theme: CombinedDefaultTheme,
});

export const usePreferences = () => {
  return useContext(PreferencesContext);
};

interface PreferencesProviderProps extends PropsWithChildren {}

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  let theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsDarkTheme(!isDarkTheme);
  }, [isDarkTheme]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isDarkTheme,
      theme,
    }),
    [toggleTheme, isDarkTheme, theme],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
};
