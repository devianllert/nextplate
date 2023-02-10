import * as React from 'react';

const Performance = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={14} height={26} fill="none" {...props}>
      <path d="M.75.5v13.75H4.5V25.5l8.75-15h-5L12 .5H.75z" fill="#FDFCFE" />
    </svg>
  );
};

const MemoPerformance = React.memo(Performance);
export default MemoPerformance;
