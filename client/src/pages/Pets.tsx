import type { Pet, AlertInfo } from "../types/general";
import PetApi from "../api/petApi";
import { useState, useEffect } from 'react'
import { Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function Pets() {
  const { clientId } = useParams<{ clientId: string }>(); 
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'cadastrar' | 'editar' | 'remover'>('cadastrar')
  const [currentPet, setCurrentPet] = useState<Pet>({ name: '', species: '', breed: ''})
  const [alert, setAlert] = useState<AlertInfo | null>(null);
  const [pets, setPets] = useState<Pet[]>([])

  const resetForm = () => {
    setCurrentPet({
      name: "",
      species: "",
      breed: "",
    });
  };

  // Corrigido: converter clientId para número e adicionar como dependência
  useEffect(() => {
    const loadPets = async (id: number) => {
      try {
        const pets = await PetApi.getAllPets(id);
        setPets(pets);
      } catch {
        setAlert({ variant: 'danger', message: 'Erro ao carregar pets' });
      }
    };
    
    if (clientId) {
      loadPets(parseInt(clientId));
    }
  }, [clientId]); 

  const handleCreate = async () => {
  try {
    if (!clientId) return;
    
    const petData = {
      name: currentPet.name,
      species: currentPet.species,
      breed: currentPet.breed,
      clientId: parseInt(clientId) 
    };

    const newPet = await PetApi.createPet(petData);
    setPets([...pets, newPet]);
    resetForm();
    setShowModal(false);
    setAlert({ variant: "success", message: "Pet cadastrado com sucesso!" });
  } catch {
    setAlert({ variant: "danger", message: "Erro ao cadastrar pet" });
  }
};

  const handleEditar = async () => {
    try {
      if (!currentPet.id) return;
      
      const updatedPet = await PetApi.updatePet(currentPet.id, currentPet);
      setPets(pets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
      setShowModal(false);
      setAlert({ variant: "success", message: "Pet atualizado com sucesso!" });
    } catch {
      setAlert({ variant: "danger", message: "Erro ao atualizar pet" });
    }
  };

  const handleRemover = async () => {
    try {
      if (!currentPet.id) return;
      
      await PetApi.deletePet(currentPet.id);
      setPets(pets.filter(pet => pet.id !== currentPet.id));
      setShowModal(false);
      setAlert({ variant: "success", message: "Pet removido com sucesso!" });
    } catch {
      setAlert({ variant: "danger", message: "Erro ao remover pet" });
    }
  };
  const handleChange = (field: keyof Pet, value: string) => {
    setCurrentPet(prev => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <div>
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
              setModalType('cadastrar')
              setCurrentPet({ name: '', breed: '', species: '' })
              setShowModal(true)
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet, index) => (
                <tr key={index}>
                  <td>{pet.name}</td>
                  <td>{pet.species}</td>
                  <td>{pet.breed}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setModalType('editar')
                        setCurrentPet({ ...pet })
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
                        setCurrentPet(pet)
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

     <Modal show={showModal} onHide={() => setShowModal(false)}>
        {/* ... (cabeçalho do modal permanece igual) ... */}
        <Modal.Body>
          {modalType !== 'remover' ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={currentPet.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  value={currentPet.species}
                  onChange={(e) => handleChange('species', e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Raça</Form.Label>
                <Form.Control
                  type="text"
                  value={currentPet.breed}
                  onChange={(e) => handleChange('breed', e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <p>Tem certeza que deseja remover o pet <strong>{currentPet.name}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={modalType === 'remover' ? 'danger' : 'primary'}
            onClick={() => {
              if (modalType === 'cadastrar') handleCreate();
              if (modalType === 'editar') handleEditar();
              if (modalType === 'remover') handleRemover();
            }}
          >
            {modalType === 'cadastrar' ? 'Cadastrar' : 
             modalType === 'editar' ? 'Salvar' : 'Remover'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}