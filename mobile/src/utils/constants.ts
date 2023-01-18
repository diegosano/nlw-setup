import { Dimensions } from 'react-native';

const NUMBER_OF_WEEK_DAYS = 7;

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;

export const HABIT_DAY_SIZE =
  Dimensions.get('screen').width / NUMBER_OF_WEEK_DAYS -
  (SCREEN_HORIZONTAL_PADDING + 5);

export const WEEK_DAYS = ['S', 'W', 'M', 'T', 'S', 'T', 'F'];

export const MINIMUM_SUMMARY_DATES_SIZE = 13 * 7; // 91 days or 13 weeks
