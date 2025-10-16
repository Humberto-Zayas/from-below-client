import './css/normalize.css';
import './css/util.css';
import './css/frombelow.css';

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Mixing from "./pages/Mixing";
import BookingStatus from "./pages/BookingStatus"; // Import the new page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="Home">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking/:bookingId" element={<BookingStatus />} /> 
          <Route path="/mixing" element={<Mixing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
