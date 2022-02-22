import './App.css';
import {Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Routes>
        <Route exact path="register" element={<Register/>} />
        <Route exact path="login" element={<Login/>} />
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
