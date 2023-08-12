import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text } from 'react-native-paper';
import { usePreferences } from '../../context/PreferencesContext';

export const DetailsScreen = () => {
  const { theme } = usePreferences();

  return (
    <View style={styles(theme).view}>
      <Text variant="displayMedium" theme={theme}>
        Details Screen
      </Text>
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
