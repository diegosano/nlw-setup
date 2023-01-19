import colors from 'tailwindcss/colors';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { FULL_NAME_WEEK_DAYS } from '../utils/constants';

export function New() {
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (checkedWeekDays.includes(weekDayIndex)) {
      return setCheckedWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    }

    setCheckedWeekDays((prevState) => [...prevState, weekDayIndex]);
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          New habit
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          What is your commitment?
        </Text>

        <TextInput
          placeholder="ex. Exercise, sleep 2h, read 20 pages.."
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What is the recurrence?
        </Text>

        {FULL_NAME_WEEK_DAYS.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            onPress={() => handleToggleWeekDay(index)}
            checked={checkedWeekDays.includes(index)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
      >
        <Feather name="check" size={20} color={colors.white} />
        <Text className="font-semibold text-base text-white ml-2">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
