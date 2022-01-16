import React from 'react';
import Link from 'next/link';
const Button = (props) => {
  return (
    <div>
      <Link href={props.path}>
        <a>Ho! Ho! Ho!</a>
      </Link>
    </div>
  );
};

export default Button;
