import { CharStatus } from '../../lib/statuses';
import classnames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  value?: string;
  status?: CharStatus;
  animate?: boolean;
};

export const Cell = ({ value, status, animate = false }: Props) => {
  const [size, setSize] = useState(1.25);

  useEffect(() => {
    if (!animate) {
      return;
    }

    setSize(0.8);

    setTimeout(() => {
      setSize(1.6);
    }, 200);

    setTimeout(() => {
      setSize(1.25);
    }, 400);
  }, [value, animate]);

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded transition-cell duration-300',
    {
      'bg-white border-slate-200 dark:bg-black dark:text-white': !status,
      'bg-slate-400 text-white border-slate-400 dark:bg-gray-700':
        status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-500 text-white border-yellow-500': status === 'present',
    }
  );

  return (
    <div
      className={classes}
      style={{
        fontSize: `${size}rem`,
      }}
    >
      {value}
    </div>
  );
};
