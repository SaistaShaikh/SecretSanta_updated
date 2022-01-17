import React from 'react';
import Link from 'next/link';

const Button: React.FC<{ path: string }> = ({ path }) => {
  return (
    <div>
      <Link href={path}>
        <a>Ho! Ho! Ho!</a>
      </Link>
    </div>
  );
};

export default Button;
