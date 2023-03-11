import * as React from 'react';

const BestClass = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={26} height={25} fill="none" {...props}>
      <path
        d="M13 19.587l7.725 4.663-2.05-8.787L25.5 9.55l-8.988-.763L13 .5 9.488 8.787.5 9.55l6.825 5.912-2.05 8.788L13 19.587z"
        fill="#FDFCFE"
      />
    </svg>
  );
};

const MemoBesstClass = React.memo(BestClass);
export default MemoBesstClass;
