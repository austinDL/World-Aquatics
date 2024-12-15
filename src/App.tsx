// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventDisplay from './Components/EventDisplay';
import HeatDisplay from './Components/HeatDisplay';
import SwimmerDisplay from './Components/SwimmerDisplay';

function App() {

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<EventDisplay />} />
          <Route path="/heat/:heat_name" element={<HeatDisplay />} />
          <Route path="/swimmer/:swimmer_id" element={<SwimmerDisplay />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
