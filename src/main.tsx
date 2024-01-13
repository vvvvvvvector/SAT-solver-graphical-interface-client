import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { Header } from './components';

import Home from './routes/Home/Home';
import Linker from './routes/Linker/Linker';

import './styles/global.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/linker',
        element: <Linker />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster position='top-center' />
  </React.StrictMode>
);
