
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './ProductList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList/>} />

      </Routes>
    </Router>
        
  )
}

export default App
