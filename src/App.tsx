import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKUs";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Stores />} />
              <Route path="/skus" element={<SKUs />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/charts" element={<Charts />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
