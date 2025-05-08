import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login  from './pages/login'
import Lista from './pages/lista'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lista" element={<Lista />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
