import colors from 'tailwindcss/colors';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
      )}

      <Text className="text-white text-base font-semibold ml-3">{title}</Text>
    </TouchableOpacity>
  );
}
