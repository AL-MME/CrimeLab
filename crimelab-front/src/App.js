import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";
import { Details } from './pages/details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
