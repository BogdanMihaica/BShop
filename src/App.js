import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./services/router";
import DataContextProvider from "./services/dataContext";
import { auth } from "./config/firebase";

function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  );
}

export default App;
