// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProgressBar from "./Components/ProgressBar";
const App = () => {
  //   const appRouter = createBrowserRouter([
  //     {
  //       path: "/",
  //       element: <ProgressBar data={70} />,
  //     },
  //   ]);
  const barPercentage = [0, 3, 4, 5, 20, 50, 80, 90, 100];
  return (
    <div className="text-center">
      progress bar
      {barPercentage.map((value) => (
        <ProgressBar key={value} data={value} />
      ))}
    </div>
  );
};

export default App;
