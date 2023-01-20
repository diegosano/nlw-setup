import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HabitDay } from '../components/HabitDay';
import { HabitDayFill } from '../components/HabitDayFill';
import { Header } from '../components/Header';
import {
  HABIT_DAY_SIZE,
  MINIMUM_SUMMARY_DATES_SIZE,
  WEEK_DAYS,
} from '../utils/constants';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { api } from '../lib/axios';
import { Loading } from '../components/Loading';

const datesFromYearBeginning = generateDatesFromYearBeginning();
const amountOfDaysToFill =
  MINIMUM_SUMMARY_DATES_SIZE - datesFromYearBeginning.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<Summary[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await api.get<Summary[]>('/summary');
        setSummary(response.data);
      } catch (error) {
        Alert.alert(
          'Cops',
          'Could not load habit summary' + JSON.stringify(error)
        );
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {WEEK_DAYS.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{
              width: HABIT_DAY_SIZE,
              height: HABIT_DAY_SIZE,
            }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearBeginning.map((date) => {
            const dayWithHabits = summary.find((day) =>
              dayjs(date).isSame(day.date)
            );
            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            );
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <HabitDayFill key={index} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
