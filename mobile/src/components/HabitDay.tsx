import { TouchableOpacity } from 'react-native';
import { HABIT_DAY_SIZE } from '../utils/constants';

export function HabitDay() {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE }}
      activeOpacity={0.7}
    />
  );
}
