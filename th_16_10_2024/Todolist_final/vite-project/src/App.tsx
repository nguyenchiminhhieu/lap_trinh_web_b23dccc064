import "./App.css";
import router from "./routers/router";
import { RouterProvider } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
