import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HABIT_DAY_SIZE } from '../utils/constants';

interface HabitDayProps extends TouchableOpacityProps {}

export function HabitDay({ ...rest }: HabitDayProps) {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
