import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Button, MD3Theme, Switch, Text } from 'react-native-paper';
import { usePreferences } from '../../context/PreferencesContext';
import { RootStackParamList } from '../../navigation/NavigationStack';
import { RouteNames } from '../../navigation/constants';

interface HomeScreenProps
  extends StackScreenProps<RootStackParamList, RouteNames.Home> {}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { toggleTheme, isDarkTheme, theme } = usePreferences();

  return (
    <View style={styles(theme).view}>
      <Text variant="displayMedium" theme={theme}>
        Home Screen
      </Text>
      <Switch theme={theme} value={isDarkTheme} onValueChange={toggleTheme} />
      <Button
        mode="contained"
        onPress={() => navigation.navigate(RouteNames.Details)}>
        Go to details
      </Button>
    </View>
  );
};

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme?.colors.surface,
    },
  });
