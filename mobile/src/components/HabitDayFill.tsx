import { View } from 'react-native';
import { HABIT_DAY_SIZE } from '../utils/constants';

export function HabitDayFill() {
  return (
    <View
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
      style={{ width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE }}
    />
  );
}
