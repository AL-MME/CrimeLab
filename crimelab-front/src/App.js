import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";
import FormAddCase from "./components/formAddCase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/form" element={<FormAddCase />} />
      </Routes>
    </Router>
  );
}

export default App;
