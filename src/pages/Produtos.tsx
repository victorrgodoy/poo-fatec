import React, { ChangeEvent } from 'react'
import { Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap'

type Produto = {
  nome: string
  valor: string
}

type ModalType = 'cadastrar' | 'editar' | 'remover'

type State = {
  showModal: boolean
  modalType: ModalType
  currentProduto: Produto
  alert: { variant: string; message: string } | null
}

export default class Produtos extends React.Component<unknown, State> {
  state: State = {
    showModal: false,
    modalType: 'cadastrar',
    currentProduto: { nome: '', valor: '' },
    alert: null
  }

  produtos: Produto[] = [
    { nome: 'Ração Premium', valor: '120.00' },
    { nome: 'Brinquedo para Gato', valor: '35.00' }
  ]

  setModal = (tipo: ModalType, produto?: Produto) => {
    this.setState({
      modalType: tipo,
      currentProduto: produto || { nome: '', valor: '' },
      showModal: true
    })
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({
      currentProduto: {
        ...prevState.currentProduto,
        [name]: value
      }
    }))
  }

  handleSubmit = () => {
    const { modalType } = this.state
    this.setState({
      alert: {
        variant: 'success',
        message: `Produto ${modalType === 'cadastrar' ? 'cadastrado' : modalType === 'editar' ? 'atualizado' : 'removido'} com sucesso!`
      },
      showModal: false
    })
  }

  render() {
    const { showModal, modalType, currentProduto, alert } = this.state

    return (
      <div className="p-4">
        <h1 className="mb-4">Gerenciamento de Produtos</h1>

        {alert && (
          <Alert variant={alert.variant} onClose={() => this.setState({ alert: null })} dismissible>
            {alert.message}
          </Alert>
        )}

        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Lista de Produtos</span>
            <Button variant="primary" onClick={() => this.setModal('cadastrar')}>
              Cadastrar Novo Produto
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
                {this.produtos.map((produto, index) => (
                  <tr key={index}>
                    <td>{produto.nome}</td>
                    <td>{produto.valor}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => this.setModal('editar', produto)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.setModal('remover', produto)}
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
              {modalType === 'cadastrar' && 'Cadastrar Novo Produto'}
              {modalType === 'editar' && 'Editar Produto'}
              {modalType === 'remover' && 'Remover Produto'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalType !== 'remover' ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    name="nome"
                    type="text"
                    value={currentProduto.nome}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Valor (R$)</Form.Label>
                  <Form.Control
                    name="valor"
                    type="text"
                    value={currentProduto.valor}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>
              </Form>
            ) : (
              <p>Tem certeza que deseja remover o produto <strong>{currentProduto.nome}</strong>?</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
              Cancelar
            </Button>
            <Button variant={modalType === 'remover' ? 'danger' : 'primary'} onClick={this.handleSubmit}>
              {modalType === 'cadastrar' ? 'Cadastrar' :
               modalType === 'editar' ? 'Salvar' : 'Remover'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

