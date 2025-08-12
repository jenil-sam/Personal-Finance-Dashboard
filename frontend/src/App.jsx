import './css/app.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import Transactions from './pages/Transactions';
import NavBar from './components/NavBar';

function App() {
  const number = 1;

  return (
    <div>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path = "/addTransaction" element = {<AddTransacation/>} /> */}
          <Route path="/transactions" element={<Transactions />} />
          {/* <Route path = "/Suggestions" element = {<AI/>} /> */}
        </Routes>
      </main>
    </div>

  )
}

export default App
