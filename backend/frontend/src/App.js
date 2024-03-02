import React from 'react';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import RequestScreen from './screens/RequestScreen';
import ChatScreen from './screens/ChatScreen';

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
            <Route path='/requests' element={<RequestScreen />} />
            <Route path='/chat/:id' element={<ChatScreen />} />
          


          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
