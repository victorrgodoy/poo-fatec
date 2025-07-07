import { useState, ChangeEvent } from 'react'
import { Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap'

type Servico = {
  nome: string
  valor: string
}

type ModalType = 'cadastrar' | 'editar' | 'remover'

type AlertType = {
  variant: string
  message: string
} | null

const Servicos = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('cadastrar')
  const [currentServico, setCurrentServico] = useState<Servico>({ nome: '', valor: '' })
  const [alert, setAlert] = useState<AlertType>(null)

  const servicos: Servico[] = [
    { nome: 'Banho', valor: '50.00' },
    { nome: 'Tosa', valor: '40.00' }
  ]

  const handleShowModal = (tipo: ModalType, servico: Servico = { nome: '', valor: '' }) => {
    setModalType(tipo)
    setCurrentServico(servico)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentServico((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    setAlert({
      variant: 'success',
      message: `Serviço ${
        modalType === 'cadastrar'
          ? 'cadastrado'
          : modalType === 'editar'
          ? 'atualizado'
          : 'removido'
      } com sucesso!`
    })
    setShowModal(false)
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">Gerenciamento de Serviços</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Lista de Serviços</span>
          <Button variant="primary" onClick={() => handleShowModal('cadastrar')}>
            Cadastrar Novo Serviço
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor (R$)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico, index) => (
                <tr key={index}>
                  <td>{servico.nome}</td>
                  <td>{servico.valor}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal('editar', servico)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleShowModal('remover', servico)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
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
                  name="nome"
                  value={currentServico.nome}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control
                  type="text"
                  name="valor"
                  value={currentServico.valor}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <p>
              Tem certeza que deseja remover o serviço <strong>{currentServico.nome}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant={modalType === 'remover' ? 'danger' : 'primary'} onClick={handleSubmit}>
            {modalType === 'cadastrar' ? 'Cadastrar' : modalType === 'editar' ? 'Salvar' : 'Remover'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Servicos