import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, MD3Theme, Switch, Text } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import { usePreferences } from '../../context/PreferencesContext';

interface HomeScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { toggleTheme, isDarkTheme, theme } = usePreferences();

  return (
    <View style={styles(theme).view}>
      <Text variant="displayMedium" theme={theme}>
        Home Screen
      </Text>
      <Switch theme={theme} value={isDarkTheme} onValueChange={toggleTheme} />
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
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
