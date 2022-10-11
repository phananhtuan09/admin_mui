import React from 'react';
import { Props } from '@/interfaces/childProps.interface';
const NullLayout = ({ children }: Props) => {
  return (
    <div className="wrapper">
      <div className="content">{children}</div>
    </div>
  );
};

export default NullLayout;
