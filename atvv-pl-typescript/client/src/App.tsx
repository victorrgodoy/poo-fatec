import { Routes, Route } from 'react-router-dom'
import NavbarLayout from './components/NavbarLayout'
import Clientes from './pages/Clients'
import Pets from './pages/Pets'
import Servicos from './pages/Servicos'
import Produtos from './pages/Produtos'
import Consumos from './pages/Consumos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarLayout />}>
        <Route index element={<Clientes />} /> 
        <Route path="/clientes" element={<Clientes />} /> 
        <Route path="/pets/:clientId" element={<Pets />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/consumos" element={<Consumos />} />
      </Route>
    </Routes>
  );
}

export default App