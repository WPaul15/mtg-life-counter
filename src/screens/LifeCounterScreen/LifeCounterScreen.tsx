import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, MD3Theme, Text } from 'react-native-paper';
import { usePreferences } from '../../context/PreferencesContext';
import { Direction, Value, useSession } from '../../context/SessionContext';

export const LifeCounterScreen = () => {
  const { theme } = usePreferences();
  const { lifeTotal, timesCast, increment, decrement, reset } = useSession();

  const timer = useRef<NodeJS.Timeout>();

  const changeLifeTotal = (direction: Direction) => {
    switch (direction) {
      case Direction.Positive:
        increment(Value.LifeTotal);
        break;
      case Direction.Negative:
        decrement(Value.LifeTotal);
        break;
      default:
    }

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      changeLifeTotal(direction);
    }, 150);
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
        <Button mode="contained" theme={theme} onPress={reset}>
          Reset
        </Button>
      </View>
      <View style={styles(theme).rightContainer}>
        <View>
          <View style={styles(theme).castContainer}>
            <Text variant="titleMedium" theme={theme}>
              Times Cast
            </Text>
            <IconButton
              mode="outlined"
              icon="minus"
              size={8}
              theme={theme}
              onPress={() => decrement(Value.TimesCast)}
            />
            <Text variant="titleMedium" theme={theme}>
              {timesCast}
            </Text>
            <IconButton
              mode="outlined"
              icon="plus"
              size={8}
              theme={theme}
              onPress={() => increment(Value.TimesCast)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      flexDirection: 'row',
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
    castContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
  });
