import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Progress.Root
      value={progress}
      max={100}
      className="h-3 rounded-xl bg-zinc-700 w-full overflow-hidden"
    >
      <Progress.Indicator
        className="h-3 rounded-xl bg-violet-600 w-full"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}
