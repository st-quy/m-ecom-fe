import { Spin } from 'antd';
import React from 'react';

import './SpinLoading.scss';

export const SpinLoading: React.FC = () => {
  return (
    <div className='spin'>
      <Spin size='large' />
    </div>
  );
};
