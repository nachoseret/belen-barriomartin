import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import { ErrorPage } from './routes/errorPage';
import { Info } from './routes/info';
import { Root } from './routes/root';

const router = createHashRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/info",
      element: <Info/>,
      errorElement: <ErrorPage/>
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
