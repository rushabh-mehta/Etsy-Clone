import './App.css';
import Signup from './Signup';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route exact path="/signup" element={<Signup/>} />

      </Routes>
  );
}

export default App;
