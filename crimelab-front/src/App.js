import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";
import { Details } from './pages/details';
import PersonEdition from "./components/NodeEdition/PersonEdition";
import CityEdition from "./components/NodeEdition/CityEdition";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/details" element={<Details />} />
        <Route path="/edit/persons/:id" element={<PersonEdition />} />
        <Route path="/edit/cities/:id" element={<CityEdition />} />
      </Routes>
    </Router>
  );
}

export default App;
