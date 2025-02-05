import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";
<<<<<<< HEAD
import FormAddCase from "./components/formAddCase";
=======
import { Details } from './pages/details';
>>>>>>> main

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
<<<<<<< HEAD
        <Route path="/form" element={<FormAddCase />} />
=======
        <Route path="/details" element={<Details />} />
>>>>>>> main
      </Routes>
    </Router>
  );
}

export default App;
