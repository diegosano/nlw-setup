import colors from 'tailwindcss/colors';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { FULL_NAME_WEEK_DAYS } from '../utils/constants';
import { api } from '../lib/axios';

export function New() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      return setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    }

    setWeekDays((prevState) => [...prevState, weekDayIndex]);
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          'New habit',
          'Please fill in the title and choose the recurrence'
        );
      }

      await api.post('/habits', {
        title,
        weekDays,
      });

      setTitle('');
      setWeekDays([]);

      Alert.alert('New habit', 'New habit created successfully');
    } catch (error) {
      console.log(error);
      Alert.alert('Oops', 'Error trying to create a new habit');
    }
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
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What is the recurrence?
        </Text>

        {FULL_NAME_WEEK_DAYS.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            onPress={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        onPress={handleCreateNewHabit}
      >
        <Feather name="check" size={20} color={colors.white} />
        <Text className="font-semibold text-base text-white ml-2">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
