import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import App from './App';
import { SpinLoading } from './components/atoms/SpinLoading/SpinLoading';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Suspense fallback={<SpinLoading />}>
    <App />
    </Suspense>,
);
