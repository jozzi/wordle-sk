type Props = {
  index: number;
  size: number;
  label: string;
};

export const Progress = ({ index, size, label }: Props) => {
  return (
    <div className="flex justify-left m-1">
      <div className="items-center justify-center w-2 dark:text-white">
        {index + 1}
      </div>
      <div className="rounded-full w-full ml-2">
        <div
          style={{ width: `${5 + size}%`, backgroundColor: 'rgb(35,237,232)' }}
          className="text-xs font-medium text-black text-center p-0.5 rounded-full"
        >
          {label}
        </div>
      </div>
    </div>
  );
};
