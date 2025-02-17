import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";
import FormAddCase from "./components/Form/formAddCase";
import { Details } from './pages/details';
import PersonEdition from "./components/NodeEdition/PersonEdition";
import CityEdition from "./components/NodeEdition/CityEdition";
import LocationEdition from "./components/NodeEdition/LocationEdition";
import RelayEdition from "./components/NodeEdition/RelayEdition";
import TestimonyEdition from "./components/NodeEdition/TestimonyEdition";
import CrimeEdition from "./components/NodeEdition/CrimeEdition";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/form" element={<FormAddCase />} />
        <Route path="/details" element={<Details />} />
        <Route path="/edit/persons/:id" element={<PersonEdition />} />
        <Route path="/edit/cities/:id" element={<CityEdition />} />
        <Route path="/edit/locations/:id" element={<LocationEdition />} />
        <Route path="/edit/relays/:id" element={<RelayEdition />} />
        <Route path="/edit/testimonies/:id" element={<TestimonyEdition />} />
        <Route path="/edit/cases/:id" element={<CrimeEdition />} />
      </Routes>
    </Router>
  );
}

export default App;
