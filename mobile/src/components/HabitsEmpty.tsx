import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export function HabitsEmpty() {
  const { navigate } = useNavigation();
  return (
    <>
      <Text className="text-zinc-400 text-base text-center">
        You are not tracking any habits yet
      </Text>

      <Text
        className="text-violet-400 text-base underline text-center active:text-violet-500"
        onPress={() => navigate('new')}
      >
        Start creating one now
      </Text>
    </>
  );
}
