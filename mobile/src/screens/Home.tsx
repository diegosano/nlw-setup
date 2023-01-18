import { ScrollView, Text, View } from 'react-native';

import { HabitDay } from '../components/HabitDay';
import { HabitDayFill } from '../components/HabitDayFill';
import { Header } from '../components/Header';
import {
  HABIT_DAY_SIZE,
  MINIMUM_SUMMARY_DATES_SIZE,
  WEEK_DAYS,
} from '../utils/constants';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';

const datesFromYearBeginning = generateDatesFromYearBeginning();
const amountOfDaysToFill =
  MINIMUM_SUMMARY_DATES_SIZE - datesFromYearBeginning.length;

export function Home() {
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
          {datesFromYearBeginning.map((date) => (
            <HabitDay key={date.toISOString()} />
          ))}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <HabitDayFill key={index} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
