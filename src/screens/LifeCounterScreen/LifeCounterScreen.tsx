import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, MD3Theme, Text } from 'react-native-paper';
import { usePreferences } from '../../context/PreferencesContext';

enum Direction {
  Positive,
  Negative,
}

export const LifeCounterScreen = () => {
  const timer = useRef<NodeJS.Timeout>();
  const [lifeTotal, setLifeTotal] = useState(40);

  const { theme } = usePreferences();

  const changeLifeTotal = (direction: Direction) => {
    switch (direction) {
      case Direction.Positive:
        setLifeTotal(prevTotal => prevTotal + 1);
        break;
      case Direction.Negative:
        setLifeTotal(prevTotal => prevTotal - 1);
        break;
      default:
    }

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      changeLifeTotal(direction);
    }, 200);
  };

  const stopTimer = () => {
    clearTimeout(timer.current);
  };

  return (
    <View style={styles(theme).rootContainer}>
      <View style={styles(theme).leftContainer}>
        <IconButton
          mode="outlined"
          icon="plus"
          theme={theme}
          onPressIn={() => changeLifeTotal(Direction.Positive)}
          onPressOut={stopTimer}
        />
        <Text variant="displayLarge" theme={theme}>
          {lifeTotal}
        </Text>
        <IconButton
          mode="outlined"
          icon="minus"
          theme={theme}
          onPressIn={() => changeLifeTotal(Direction.Negative)}
          onPressOut={stopTimer}
        />
      </View>
      <View style={styles(theme).rightContainer}>
        <Text variant="displayMedium" theme={theme}>
          Life Counter Screen
        </Text>
      </View>
    </View>
  );
};

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    rootContainer: {
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    leftContainer: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primaryContainer,
    },
    rightContainer: {
      flex: 2,
      backgroundColor: theme.colors.secondaryContainer,
    },
  });
