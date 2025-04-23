import React from 'react'
import { Button, Card, Form, Modal, Tab, Tabs, Table, Alert, Row, Col } from 'react-bootstrap'
import { NavigateFunction, useNavigate } from 'react-router-dom'

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

interface ClientesProps {
  navigate: NavigateFunction
}

interface ClientesState {
  activeTab: string
  showModal: boolean
  modalType: 'cadastrar' | 'editar' | 'remover' | 'pets'
  currentClient: Cliente
  newRg: RG
  alert: AlertInfo | null
}

 class Clientes extends React.Component<ClientesProps, ClientesState> {
  constructor(props: ClientesProps) {
    super(props)
    this.state = {
      activeTab: 'listar',
      showModal: false,
      modalType: 'cadastrar',
      currentClient: {
        cpf: '',
        nome: '',
        nomeSocial: '',
        rgs: []
      },
      newRg: { numero: '', dataEmissao: '' },
      alert: null
    }
  }

  handleCadastrar = () => {
    this.setState({
      alert: { variant: 'success', message: 'Cliente cadastrado com sucesso!' },
      showModal: false
    })
  }

  handleEditar = () => {
    this.setState({
      alert: { variant: 'success', message: 'Cliente atualizado com sucesso!' },
      showModal: false
    })
  }

  handleRemover = () => {
    this.setState({
      alert: { variant: 'success', message: 'Cliente removido com sucesso!' },
      showModal: false
    })
  }

  handleAddRg = () => {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        rgs: [...prevState.currentClient.rgs, prevState.newRg]
      },
      newRg: { numero: '', dataEmissao: '' }
    }))
  }

  render() {
    const { navigate } = this.props
    const {
      activeTab,
      showModal,
      modalType,
      currentClient,
      newRg,
      alert
    } = this.state

    const clientes: Cliente[] = [
      {
        cpf: '111.111.111-00',
        nome: 'Teste',
        nomeSocial: 'TT',
        rgs: [{ numero: '1234567', dataEmissao: '10/10/2010' }],
        pets: ['Rex', 'Luna']
      }
    ]

    return (
      <div className="p-4">
        <h1 className="mb-4">Gerenciamento de Clientes</h1>

        {alert && (
          <Alert variant={alert.variant} onClose={() => this.setState({ alert: null })} dismissible>
            {alert.message}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => this.setState({ activeTab: k || 'listar' })}
          className="mb-4"
        >
          <Tab eventKey="listar" title="Listar Clientes">
            <Card className="mt-3">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Lista de Clientes</span>
                <Button
                  variant="primary"
                  onClick={() =>
                    this.setState({
                      modalType: 'cadastrar',
                      showModal: true,
                      currentClient: { cpf: '', nome: '', nomeSocial: '', rgs: [] }
                    })
                  }
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
                            <div key={i}>{rg.numero} ({rg.dataEmissao})</div>
                          ))}
                        </td>
                        <td>{cliente.pets?.join(', ')}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                              this.setState({
                                modalType: 'editar',
                                showModal: true,
                                currentClient: {
                                  cpf: cliente.cpf,
                                  nome: cliente.nome,
                                  nomeSocial: cliente.nomeSocial,
                                  rgs: cliente.rgs
                                }
                              })
                            }
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                              this.setState({
                                modalType: 'remover',
                                showModal: true,
                                currentClient: {
                                  cpf: cliente.cpf,
                                  nome: cliente.nome,
                                  nomeSocial: cliente.nomeSocial,
                                  rgs: cliente.rgs
                                }
                              })
                            }
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

        <Modal show={showModal} onHide={() => this.setState({ showModal: false })} size="lg">
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
                      this.setState({
                        currentClient: { ...currentClient, cpf: e.target.value }
                      })
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
                      this.setState({
                        currentClient: { ...currentClient, nome: e.target.value }
                      })
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
                      this.setState({
                        currentClient: { ...currentClient, nomeSocial: e.target.value }
                      })
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
                                this.setState({ newRg: { ...newRg, numero: e.target.value } })
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Data de Emissão (dd/mm/yyyy)</Form.Label>
                            <Form.Control
                              type="text"
                              value={newRg.dataEmissao}
                              onChange={(e) =>
                                this.setState({ newRg: { ...newRg, dataEmissao: e.target.value } })
                              }
                              placeholder="dd/mm/yyyy"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="secondary" onClick={this.handleAddRg}>
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
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
              Cancelar
            </Button>
            <Button
              variant={modalType === 'remover' ? 'danger' : 'primary'}
              onClick={() => {
                if (modalType === 'cadastrar') this.handleCadastrar()
                if (modalType === 'editar') this.handleEditar()
                if (modalType === 'remover') this.handleRemover()
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
}


function ClientesComNavigate() {
  const navigate = useNavigate()
  return <Clientes navigate={navigate} />
}

export default ClientesComNavigate