import './css/normalize.css';
import './css/util.css';
import './css/frombelow.css';

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="Home">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
