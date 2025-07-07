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

interface Servico {
  id?:number
  title: string
  value: string
}

interface AlertInfo {
  variant: string
  message: string
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'cadastrar' | 'editar' | 'remover'>('cadastrar')
  const [currentServico, setCurrentServico] = useState<Servico>({ title: '', value: '' })
  const [alert, setAlert] = useState<AlertInfo | null>(null)

  const loadServicos = () => {
    axios.get('http://localhost:3000/api/services/')
      .then((res) => setServicos(res.data.data))
      .catch((err) => {
        console.error('Erro ao buscar serviços:', err)
        setAlert({ variant: 'danger', message: 'Erro ao buscar serviços' })
      })
  }

  useEffect(() => {
    loadServicos()
  }, [])

  const handleCadastrar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/services/', {
        title: currentServico.title,
        value: currentServico.value
      })
      setAlert({ variant: 'success', message: response.data.message })
      setShowModal(false)
      loadServicos()
    } catch {
      setAlert({ variant: 'danger', message: 'Erro ao cadastrar serviço' })
    }
  }

  const handleEditar = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/services/${currentServico.id}`, {
        title: currentServico.title,
        value: currentServico.value
      })
      setAlert({ variant: 'success', message: response.data.message })
      setShowModal(false)
      loadServicos()
    } catch{
      setAlert({ variant: 'danger', message: 'Erro ao editar serviço' })
    }
  }

  const handleRemover = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/services/${currentServico.id}`)
      setAlert({ variant: 'success', message: response.data.message })
      setShowModal(false)
      loadServicos()
    } catch{
      setAlert({ variant: 'danger', message: 'Erro ao remover serviço' })
    }
  }

  return (
    <div>
      <h1 className="mb-4">Gerenciamento de Serviços</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Lista de Serviços</span>
          <Button
            onClick={() => {
              setModalType('cadastrar')
              setCurrentServico({ title: '', value: '' })
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
              {servicos.map((servico, index) => (
                <tr key={index}>
                  <td>{servico.title}</td>
                  <td>{servico.value}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setModalType('editar')
                        setCurrentServico(servico)
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
                        setCurrentServico(servico)
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
            {modalType === 'cadastrar' && 'Cadastrar Novo Serviço'}
            {modalType === 'editar' && 'Editar Serviço'}
            {modalType === 'remover' && 'Remover Serviço'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType !== 'remover' ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={currentServico.title}
                  onChange={(e) =>
                    setCurrentServico({ ...currentServico, title: e.target.value })
                  }
 
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="text"
                  value={currentServico.value}
                  onChange={(e) =>
                    setCurrentServico({ ...currentServico, value: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>Tem certeza que deseja remover o serviço:</p>
              <p><strong>Nome:</strong> {currentServico.title}</p>
              <p><strong>Valor:</strong> {currentServico.value}</p>
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