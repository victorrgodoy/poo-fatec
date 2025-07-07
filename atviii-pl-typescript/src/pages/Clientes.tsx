import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  Modal,
  Tab,
  Tabs,
  Table,
  Alert,
  Row,
  Col
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface RG {
  numero: string
  dataEmissao: string
}

interface Cliente {
  cpf: string
  nome: string
  nomeSocial: string
  rgs: RG[]
  pets?: string[]
}

interface AlertInfo {
  variant: string
  message: string
}

export default function Clientes() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('listar')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'cadastrar' | 'editar' | 'remover' | 'pets'>('cadastrar')
  const [currentClient, setCurrentClient] = useState<Cliente>({
    cpf: '',
    nome: '',
    nomeSocial: '',
    rgs: []
  })
  const [newRg, setNewRg] = useState<RG>({ numero: '', dataEmissao: '' })
  const [alert, setAlert] = useState<AlertInfo | null>(null)

  const clientes: Cliente[] = [
    {
      cpf: '111.111.111-00',
      nome: 'Teste',
      nomeSocial: 'TT',
      rgs: [{ numero: '1234567', dataEmissao: '10/10/2010' }],
      pets: ['Rex', 'Luna']
    }
  ]

  const handleCadastrar = () => {
    setAlert({ variant: 'success', message: 'Cliente cadastrado com sucesso!' })
    setShowModal(false)
  }

  const handleEditar = () => {
    setAlert({ variant: 'success', message: 'Cliente atualizado com sucesso!' })
    setShowModal(false)
  }

  const handleRemover = () => {
    setAlert({ variant: 'success', message: 'Cliente removido com sucesso!' })
    setShowModal(false)
  }

  const handleAddRg = () => {
    setCurrentClient((prev) => ({
      ...prev,
      rgs: [...prev.rgs, newRg]
    }))
    setNewRg({ numero: '', dataEmissao: '' })
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">Gerenciamento de Clientes</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'listar')} className="mb-4">
        <Tab eventKey="listar" title="Listar Clientes">
          <Card className="mt-3">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Lista de Clientes</span>
              <Button
                variant="primary"
                onClick={() => {
                  setModalType('cadastrar')
                  setShowModal(true)
                  setCurrentClient({ cpf: '', nome: '', nomeSocial: '', rgs: [] })
                }}
              >
                Cadastrar Novo
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Nome Social</th>
                    <th>RGs</th>
                    <th>Pets</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.cpf}>
                      <td>{cliente.cpf}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.nomeSocial}</td>
                      <td>
                        {cliente.rgs.map((rg, i) => (
                          <div key={i}>
                            {rg.numero} ({rg.dataEmissao})
                          </div>
                        ))}
                      </td>
                      <td>{cliente.pets?.join(', ')}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setModalType('editar')
                            setShowModal(true)
                            setCurrentClient({
                              cpf: cliente.cpf,
                              nome: cliente.nome,
                              nomeSocial: cliente.nomeSocial,
                              rgs: cliente.rgs
                            })
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setModalType('remover')
                            setShowModal(true)
                            setCurrentClient({
                              cpf: cliente.cpf,
                              nome: cliente.nome,
                              nomeSocial: cliente.nomeSocial,
                              rgs: cliente.rgs
                            })
                          }}
                        >
                          Remover
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => navigate(`/clientes/${cliente.cpf}/pets`)}
                        >
                          Pets
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'cadastrar' && 'Cadastrar Novo Cliente'}
            {modalType === 'editar' && 'Editar Cliente'}
            {modalType === 'remover' && 'Remover Cliente'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType !== 'remover' ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  value={currentClient.cpf}
                  onChange={(e) =>
                    setCurrentClient({ ...currentClient, cpf: e.target.value })
                  }
                  disabled={modalType === 'editar'}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={currentClient.nome}
                  onChange={(e) =>
                    setCurrentClient({ ...currentClient, nome: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nome Social</Form.Label>
                <Form.Control
                  type="text"
                  value={currentClient.nomeSocial}
                  onChange={(e) =>
                    setCurrentClient({ ...currentClient, nomeSocial: e.target.value })
                  }
                />
              </Form.Group>

              {modalType === 'editar' && (
                <Card className="mb-3">
                  <Card.Header>Adicionar RG</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Número do RG</Form.Label>
                          <Form.Control
                            type="text"
                            value={newRg.numero}
                            onChange={(e) =>
                              setNewRg({ ...newRg, numero: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Data de Emissão</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="dd/mm/yyyy"
                            value={newRg.dataEmissao}
                            onChange={(e) =>
                              setNewRg({ ...newRg, dataEmissao: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="secondary" onClick={handleAddRg}>
                      Adicionar RG
                    </Button>
                  </Card.Body>
                </Card>
              )}

              <div className="mt-4">
                <h5>RGs Cadastrados</h5>
                {currentClient.rgs.length > 0 ? (
                  <ul>
                    {currentClient.rgs.map((rg, i) => (
                      <li key={i}>
                        {rg.numero} - {rg.dataEmissao}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum RG cadastrado</p>
                )}
              </div>
            </Form>
          ) : (
            <div>
              <p>Tem certeza que deseja remover o cliente:</p>
              <p><strong>Nome:</strong> {currentClient.nome}</p>
              <p><strong>CPF:</strong> {currentClient.cpf}</p>
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