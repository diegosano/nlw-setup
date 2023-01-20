import dayjs from 'dayjs';
import { HabitDay } from './HabitDay';
import { HabitDayFill } from './HabitDayFill';

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { MINIMUM_SUMMARY_DATES_SIZE, WEEK_DAYS } from '../utils/constants';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

const summaryDates = generateDatesFromYearBeginning();
const amountOfDaysToFit = MINIMUM_SUMMARY_DATES_SIZE - summaryDates.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await api.get<Summary[]>('/summary');
        const { data } = response;

        setSummary(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadSummary();
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {WEEK_DAYS.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) =>
            dayjs(date).isSame(day.date, 'day')
          );

          return (
            <HabitDay
              key={date.toString()}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              date={date}
            />
          );
        })}

        {amountOfDaysToFit > 0 &&
          Array.from({ length: amountOfDaysToFit }).map((_, index) => (
            <HabitDayFill key={index} />
          ))}
      </div>
    </div>
  );
}
