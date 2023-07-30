import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Paper from "./pages/Paper";
import Navbar from "./pages/Navbar";
import $ from "jquery";

function App() {
  return (
    <>
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/litepaper" element={<Paper />} />
      </Routes>
    </>
  );
}

export default App;
