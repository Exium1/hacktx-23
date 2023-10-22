import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './pages/Home/Home.tsx';
import Navbar from './components/Navbar/Navbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
);