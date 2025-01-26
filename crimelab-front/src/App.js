import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";
import CrimeView from "./pages/CrimeView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/crime/:id" element={<CrimeView />} />
      </Routes>
    </Router>
  );
}

export default App;
