import type { Product, AlertInfo } from "../types/general";
import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  Form,
  Modal,
  Table,
  Alert
} from 'react-bootstrap'
import axios from 'axios'



export default function Products() {
  const [Products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'cadastrar' | 'editar' | 'remover'>('cadastrar')
  const [currentProduct, setCurrentProduct] = useState<Product>({ title: '', value: '' })
  const [alert, setAlert] = useState<AlertInfo | null>(null)

  const loadProducts = () => {
    axios.get('http://localhost:3000/api/products/')
      .then((res) => setProducts(res.data.data))
      .catch((err) => {
        console.error('Erro ao buscar Products:', err)
        setAlert({ variant: 'danger', message: 'Erro ao buscar Products' })
      })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleCadastrar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/products/',{
        title: currentProduct.title,
        value: currentProduct.value
      })
      setAlert({ variant: 'success', message: response.data.message })
      setShowModal(false)
      loadProducts()
    } catch {
      setAlert({ variant: 'danger', message: 'Erro ao cadastrar Product' })
    }
  }

  const handleEditar = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${currentProduct.id}` ,{
        title:currentProduct.title,
        value: currentProduct.value
      })
      setAlert({ variant: 'success', message: response.data.message })
      setShowModal(false)
      loadProducts()
    } catch {
      setAlert({ variant: 'danger', message: 'Erro ao editar Product' })
    }
  }

  const handleRemover = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${currentProduct.id}`)
      setAlert({ variant: 'success', message: response.data.message })
      setShowModal(false)
      loadProducts()
    } catch  {
      setAlert({ variant: 'danger', message: 'Erro ao remover Product' })
    }
  }

  return (
    <div>
      <h1 className="mb-4">Gerenciamento de Products</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Lista de Products</span>
          <Button
            onClick={() => {
              setModalType('cadastrar')
              setCurrentProduct({ title: '', value: '' })
              setShowModal(true)
            }}
          >
            Cadastrar Novo
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="w-50">Nome</th>
                <th className="w-25">Valor</th>
                <th className="w-25">Ações</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((Product, index) => (
                <tr key={index}>
                  <td>{Product.title}</td>
                  <td>{Product.value}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setModalType('editar')
                        setCurrentProduct(Product)
                        setShowModal(true)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setModalType('remover')
                        setCurrentProduct(Product)
                        setShowModal(true)
                      }}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal de Cadastrar/Editar/Remover */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'cadastrar' && 'Cadastrar Novo Product'}
            {modalType === 'editar' && 'Editar Product'}
            {modalType === 'remover' && 'Remover Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {modalType !== 'remover' ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={currentProduct.title}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="text"
                  value={currentProduct.value}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, value: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>Tem certeza que deseja remover o Product:</p>
              <p><strong>Nome:</strong> {currentProduct.title}</p>
              <p><strong>Valor:</strong> {currentProduct.value}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={modalType === 'remover' ? 'danger' : 'primary'}
            onClick={() => {
              if (modalType === 'cadastrar') handleCadastrar()
              if (modalType === 'editar') handleEditar()
              if (modalType === 'remover') handleRemover()
            }}
          >
            {modalType === 'cadastrar' && 'Cadastrar'}
            {modalType === 'editar' && 'Salvar Alterações'}
            {modalType === 'remover' && 'Confirmar Remoção'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}