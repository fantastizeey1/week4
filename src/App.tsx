import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "@/components/Home";
import Header from "@/components/Header";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
