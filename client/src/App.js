import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home, NewReport } from "./pages";

function App() {
  return (
    <Router className="container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createReport" element={<NewReport />} />
      </Routes>
    </Router>
  );
}

export default App;
