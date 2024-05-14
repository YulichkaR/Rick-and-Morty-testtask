import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Characters from "./components/Main/Characters/Characters";
import Episodes from "./components/Main/Episodes/Episodes";
import Locations from "./components/Main/Locations/Locations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Characters />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="locations" element={<Locations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
