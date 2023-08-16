import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Direction, Value } from '.';

interface Session {
  lifeTotal: number;
  timesCast: number;
  increment: (value: Value) => void;
  decrement: (value: Value) => void;
  reset: () => void;
}

const initialSession: Session = {
  lifeTotal: 40,
  timesCast: 0,
  increment: () => {},
  decrement: () => {},
  reset: () => {},
};

const SessionContext = createContext<Session>(initialSession);

export const useSession = () => {
  return useContext(SessionContext);
};

interface SessionProviderProps extends PropsWithChildren {}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [lifeTotal, setLifeTotal] = useState<number>(40);
  const [timesCast, setTimesCast] = useState<number>(0);

  const getNewValue = (prev: number, direction: Direction): number => {
    if (direction === Direction.Positive) {
      return prev + 1;
    } else if (direction === Direction.Negative && prev > 0) {
      return prev - 1;
    }

    return prev;
  };

  const changeValue = useCallback((value: Value, direction: Direction) => {
    switch (value) {
      case Value.LifeTotal:
        setLifeTotal(prev => getNewValue(prev, direction));
        break;
      case Value.TimesCast:
        setTimesCast(prev => getNewValue(prev, direction));
        break;
    }
  }, []);

  const reset = () => {
    setLifeTotal(initialSession.lifeTotal);
    setTimesCast(initialSession.timesCast);
  };

  const session = useMemo(
    () => ({
      lifeTotal,
      timesCast,
      increment: (value: Value) => {
        changeValue(value, Direction.Positive);
      },
      decrement: (value: Value) => {
        changeValue(value, Direction.Negative);
      },
      reset,
    }),
    [lifeTotal, timesCast, changeValue],
  );

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
