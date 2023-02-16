import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  json,
  RouterProvider,
} from "react-router-dom";

import MatrixShow from '@/routes/matrix-show';
import Root from '@/routes/root'
import '@/styles/index.css'
import { z } from 'zod';
import { arrayToMatrix } from '@/lib/matrix';
import MatrixDecode from '@/routes/matrix-decode';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/show",
    loader: ({ request }) => {
      const url = new URL(request.url);
      const data = url.searchParams.get('data');
      const schema = z.array(z.number());
      const parsed = schema.safeParse(JSON.parse(data || ''));
      if (!parsed.success) throw new Error(`Invalid matrix: ${parsed.error}`);
      if (parsed.data.length % 2 !== 0) throw new Error(`Invalid matrix: odd amount of numbers in array`)

      return json({ data: arrayToMatrix(parsed.data) }, { status: 200 })
    },
    element: <MatrixShow />
  },
  {
    path: "/decode",
    element: <MatrixDecode />
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='p-4 container mx-auto'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
