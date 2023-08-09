import { Suspense } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

import { SpinLoading } from './components/atoms/SpinLoading/SpinLoading';
import App from './App';

ReactDOM.render(
  <Suspense fallback={<SpinLoading />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);