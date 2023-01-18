import { HabitDay } from './HabitDay';
import { HabitDayFill } from './HabitDayFill';

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { MINIMUM_SUMMARY_DATES_SIZE, WEEK_DAYS } from '../utils/constants';

const summaryDates = generateDatesFromYearBeginning();
const amountOfDaysToFit = MINIMUM_SUMMARY_DATES_SIZE - summaryDates.length;

export function SummaryTable() {
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
        {summaryDates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}

        {amountOfDaysToFit > 0 &&
          Array.from({ length: amountOfDaysToFit }).map((_, index) => (
            <HabitDayFill key={index} />
          ))}
      </div>
    </div>
  );
}
