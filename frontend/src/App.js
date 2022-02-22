import './App.css';
import {Route, Routes, Link} from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import ProtectedRoute from './services/protectedroute';

function App() {
  return (
    <Routes>
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
