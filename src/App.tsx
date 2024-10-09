import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "@/components/Home";
import Header from "@/components/Header";
import Adviceapi from "@/components/Adviceapi";
import Jokeapi from "@/components/Jokeapi";
import Countriesapi from "@/components/Countriesapi";
import Apod from "./components/Apod";
import MarsRoverPhotos from "./components/MarsRoverPhotos";
import NeoWs from "./components/NeoWs";

import NotFound from "./components/NotFound";
import MorePhotos from "./components/MorePhotos";
import NASAImageLibrary from "./components/NASAImageLibrary";

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-500 to-black min-h-screen h-full">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/advice-slip" element={<Adviceapi />} />
            <Route path="/api/joke-api" element={<Jokeapi />} />
            <Route path="/api/countries-api" element={<Countriesapi />} />
            <Route
              path="/api/nasa-api"
              element={
                <>
                  <Apod />
                  <NASAImageLibrary />
                  <MarsRoverPhotos />
                  <NeoWs />
                </>
              }
            />
            {/* Add a fallback route for undefined paths */}
            <Route path="*" element={<NotFound />} />
            <Route path="/more-photos/:type" element={<MorePhotos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
