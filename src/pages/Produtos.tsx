import { useState, ChangeEvent } from 'react';
import { Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap';

type Produto = {
  nome: string;
  valor: string;
};

type ModalType = 'cadastrar' | 'editar' | 'remover';

function Produtos() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('cadastrar');
  const [currentProduto, setCurrentProduto] = useState<Produto>({ nome: '', valor: '' });
  const [alert, setAlert] = useState<{ variant: string; message: string } | null>(null);

  const produtos: Produto[] = [
    { nome: 'Ração Premium', valor: '120.00' },
    { nome: 'Brinquedo para Gato', valor: '35.00' }
  ];

  const openModal = (tipo: ModalType, produto?: Produto) => {
    setModalType(tipo);
    setCurrentProduto(produto || { nome: '', valor: '' });
    setShowModal(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduto((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setAlert({
      variant: 'success',
      message: `Produto ${
        modalType === 'cadastrar' ? 'cadastrado' : modalType === 'editar' ? 'atualizado' : 'removido'
      } com sucesso!`
    });
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Gerenciamento de Produtos</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Lista de Produtos</span>
          <Button variant="primary" onClick={() => openModal('cadastrar')}>
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
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{produto.valor}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openModal('editar', produto)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => openModal('remover', produto)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control
                  name="valor"
                  type="text"
                  value={currentProduto.valor}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <p>
              Tem certeza que deseja remover o produto <strong>{currentProduto.nome}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant={modalType === 'remover' ? 'danger' : 'primary'} onClick={handleSubmit}>
            {modalType === 'cadastrar' ? 'Cadastrar' :
             modalType === 'editar' ? 'Salvar' : 'Remover'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Produtos;