import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import OfferScreen from './screens/OfferScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateScreen from './screens/CreateScreen';
import UsersOfferScreen from './screens/UsersOfferScreen';
import OfferEditScreen from './screens/OfferEditScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/housingoffer/:id' element={<OfferScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/create' element={<CreateScreen />} />
            <Route path='/offerlist' element={<UsersOfferScreen />} />
            <Route path='/housingoffer/:id/edit' element={<OfferEditScreen />} />


          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
