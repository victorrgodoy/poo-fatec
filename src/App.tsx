import { Routes, Route } from 'react-router-dom'
import NavbarLayout from './components/NavbarLayout'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Pets from './pages/Pets'
import Servicos from './pages/Servicos'
import Produtos from './pages/Produtos'
import Consumos from './pages/Consumos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/clientes' index element={<Clientes />} />
        <Route path="/clientes/:cpf/pets" element={<Pets />} />
        <Route path='/servicos' index element={<Servicos />} />
        <Route path='/produtos' index element={<Produtos />} />
        <Route path='/consumos' index element={<Consumos />} />
      </Route>
    </Routes>
  )
}

export default App