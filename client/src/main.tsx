import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './pages/Home/Home.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import Projects from './pages/Projects/Projects.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/projects/:projectID" element={<Home />} />
        <Route path="/" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  </>
);