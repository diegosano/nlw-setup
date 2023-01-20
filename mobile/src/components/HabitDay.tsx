import clsx from 'clsx';
import dayjs from 'dayjs';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { HABIT_DAY_SIZE } from '../utils/constants';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

interface HabitDayProps extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({
  date,
  amount = 0,
  completed = 0,
  ...rest
}: HabitDayProps) {
  const completedPercentage =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800']: completedPercentage === 0,
        ['bg-violet-900 border-violet-700']:
          completedPercentage > 0 && completedPercentage < 20,
        ['bg-violet-800 border-violet-600']:
          completedPercentage > 20 && completedPercentage < 40,
        ['bg-violet-700 border-violet-500']:
          completedPercentage > 40 && completedPercentage < 60,
        ['bg-violet-600 border-violet-500']:
          completedPercentage > 60 && completedPercentage < 80,
        ['bg-violet-500 border-violet-400']: completedPercentage > 80,
        ['border-white border-4']: isCurrentDay,
      })}
      style={{ width: HABIT_DAY_SIZE, height: HABIT_DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
