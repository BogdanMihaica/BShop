import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./services/router";
import DataContextProvider from "./services/dataContext";

function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  );
}

export default App;
