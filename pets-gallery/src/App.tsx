import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { PetProvider } from './context/PetContext';
import GlobalStyle from './styles/GlobalStyles';
import Navbar from './components/NavBar';

const App: React.FC = () => {
  return (
    <PetProvider>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </PetProvider>
  );
};

export default App;
