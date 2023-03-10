import './App.css';
import Navbar from './components/navbar/Navbar';
import Welcome from './components/Welcome';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <Welcome />
      <Navbar />
      <Router>
        <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
