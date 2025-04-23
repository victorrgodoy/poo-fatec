import React from 'react'
import { Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap'

type Pet = {
  nome: string
  tipo: string
  raca: string
  genero: string
}

type State = {
  showModal: boolean
  modalType: 'cadastrar' | 'editar' | 'remover'
  currentPet: Pet
  alert: { variant: string; message: string } | null
}

export default class Pets extends React.Component<unknown, State> {
  state: State = {
    showModal: false,
    modalType: 'cadastrar',
    currentPet: {
      nome: '',
      tipo: '',
      raca: '',
      genero: ''
    },
    alert: null
  }

  pets: Pet[] = [
    { nome: 'Rex', tipo: 'Cachorro', raca: 'Labrador', genero: 'Macho' },
    { nome: 'Luna', tipo: 'Gato', raca: 'Siamês', genero: 'Fêmea' }
  ]

  setCurrentPetField = (field: keyof Pet, value: string) => {
    this.setState((prevState) => ({
      currentPet: { ...prevState.currentPet, [field]: value }
    }))
  }

  handleSubmit = () => {
    const { modalType } = this.state
    this.setState({
      alert: {
        variant: 'success',
        message: `Pet ${
          modalType === 'cadastrar' ? 'cadastrado' : modalType === 'editar' ? 'atualizado' : 'removido'
        } com sucesso!`
      },
      showModal: false
    })
  }

  render() {
    const { showModal, modalType, currentPet, alert } = this.state

    return (
      <div className="p-4">
        <h1 className="mb-4">Gerenciamento de Pets</h1>

        {alert && (
          <Alert variant={alert.variant} onClose={() => this.setState({ alert: null })} dismissible>
            {alert.message}
          </Alert>
        )}

        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Lista de Pets</span>
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  modalType: 'cadastrar',
                  currentPet: { nome: '', tipo: '', raca: '', genero: '' },
                  showModal: true
                })
              }
            >
              Cadastrar Novo Pet
            </Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Raça</th>
                  <th>Gênero</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.pets.map((pet, index) => (
                  <tr key={index}>
                    <td>{pet.nome}</td>
                    <td>{pet.tipo}</td>
                    <td>{pet.raca}</td>
                    <td>{pet.genero}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => this.setState({ modalType: 'editar', currentPet: pet, showModal: true })}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.setState({ modalType: 'remover', currentPet: pet, showModal: true })}
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

        <Modal show={showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === 'cadastrar' && 'Cadastrar Novo Pet'}
              {modalType === 'editar' && 'Editar Pet'}
              {modalType === 'remover' && 'Remover Pet'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalType !== 'remover' ? (
              <Form>
                {['nome', 'tipo', 'raca', 'genero'].map((field) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentPet[field as keyof Pet]}
                      onChange={(e) => this.setCurrentPetField(field as keyof Pet, e.target.value)}
                      required
                    />
                  </Form.Group>
                ))}
              </Form>
            ) : (
              <p>
                Tem certeza que deseja remover o pet <strong>{currentPet.nome}</strong>?
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
              Cancelar
            </Button>
            <Button variant={modalType === 'remover' ? 'danger' : 'primary'} onClick={this.handleSubmit}>
              {modalType === 'cadastrar' ? 'Cadastrar' : modalType === 'editar' ? 'Salvar' : 'Remover'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

