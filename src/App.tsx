import './App.css'
import Home from './pages/home'
import Teams from './pages/teams'
import { Routes , Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </>
  )
}

export default App
