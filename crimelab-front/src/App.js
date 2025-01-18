import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
