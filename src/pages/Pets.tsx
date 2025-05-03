import { useState } from 'react';
import { Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap';

type Pet = {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
};

function Pets() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'cadastrar' | 'editar' | 'remover'>('cadastrar');
  const [currentPet, setCurrentPet] = useState<Pet>({ nome: '', tipo: '', raca: '', genero: '' });
  const [alert, setAlert] = useState<{ variant: string; message: string } | null>(null);

  const pets: Pet[] = [
    { nome: 'Rex', tipo: 'Cachorro', raca: 'Labrador', genero: 'Macho' },
    { nome: 'Luna', tipo: 'Gato', raca: 'Siamês', genero: 'Fêmea' }
  ];

  const setCurrentPetField = (field: keyof Pet, value: string) => {
    setCurrentPet((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setAlert({
      variant: 'success',
      message: `Pet ${
        modalType === 'cadastrar' ? 'cadastrado' : modalType === 'editar' ? 'atualizado' : 'removido'
      } com sucesso!`
    });
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Gerenciamento de Pets</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Lista de Pets</span>
          <Button
            variant="primary"
            onClick={() => {
              setModalType('cadastrar');
              setCurrentPet({ nome: '', tipo: '', raca: '', genero: '' });
              setShowModal(true);
            }}
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
              {pets.map((pet, index) => (
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
                      onClick={() => {
                        setModalType('editar');
                        setCurrentPet(pet);
                        setShowModal(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setModalType('remover');
                        setCurrentPet(pet);
                        setShowModal(true);
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
              {(['nome', 'tipo', 'raca', 'genero'] as (keyof Pet)[]).map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentPet[field]}
                    onChange={(e) => setCurrentPetField(field, e.target.value)}
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant={modalType === 'remover' ? 'danger' : 'primary'} onClick={handleSubmit}>
            {modalType === 'cadastrar' ? 'Cadastrar' : modalType === 'editar' ? 'Salvar' : 'Remover'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pets;