// import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPanel from './Components/AdminPannel';
import ErrorPage from "./Components/ErrorPage";
const App = () => {
    const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminPanel />,
        },
        {
            path: "*",
            element:<ErrorPage/>
        }
    ])
  return (
    <div>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </div>
  );
}

export default App
