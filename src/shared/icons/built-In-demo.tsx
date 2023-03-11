import * as React from 'react';

const BuiltInDemo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={29} height={20} fill="none" {...props}>
      <path
        d="M14.5 3.125c4.738 0 8.962 2.662 11.025 6.875A12.199 12.199 0 0114.5 16.875c-4.75 0-8.963-2.662-11.025-6.875A12.213 12.213 0 0114.5 3.125zm0-2.5C8.25.625 2.912 4.513.75 10c2.163 5.488 7.5 9.375 13.75 9.375S26.087 15.488 28.25 10C26.087 4.513 20.75.625 14.5.625zm0 6.25a3.126 3.126 0 010 6.25 3.126 3.126 0 010-6.25zm0-2.5A5.633 5.633 0 008.875 10c0 3.1 2.525 5.625 5.625 5.625S20.125 13.1 20.125 10 17.6 4.375 14.5 4.375z"
        fill="#FDFCFE"
      />
    </svg>
  );
};

const MemoBuiltInDemo = React.memo(BuiltInDemo);
export default MemoBuiltInDemo;
