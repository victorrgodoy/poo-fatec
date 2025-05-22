import { useState, useEffect } from 'react';
import {
  Button, Card, Tab, Tabs, Table, Modal, Form, Row, Col, Alert
} from 'react-bootstrap';
import axios from 'axios';

type FormData = {
  cpf: string;
  itemType: 'product' | 'service';
  petName: string;
  itemName: string;
};

type AlertType = {
  variant: string;
  message: string;
} | null;

const api = axios.create({
  baseURL: 'http://localhost:3000/api/stats',
});

function Consumos() {
  const [top10ClientConsumed, setTop10ClientConsumed] = useState<any[]>([]);
  const [top5ClientAmount, setTop5ClientAmount] = useState<any[]>([]);
  const [topItemsByPet, setTopItemsByPet] = useState<any[]>([]);
  const [topItemsConsumed, setTopItemsConsumed] = useState<any[]>([]);
  const [historic, setHistoric] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('registrar');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cpf: '',
    petName: '',
    itemType: 'product',
    itemName: '',
  });
  const [alert, setAlert] = useState<AlertType>(null);

  useEffect(() => {
    if (activeTab === 'topClientes' || activeTab === 'itensConsumidos') {
      handleTop10ClientConsumed();
      handleTop5ClientAmount();
      handleTopItemsByPet();
      handleTopItemsConsumed();
    }
    if (activeTab === 'historico') {
      handleHistoric();
    }
  }, [activeTab]);

  const handleTop10ClientConsumed = async () => {
    try {
      const response = await api.get('/top10');
      setTop10ClientConsumed(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTop5ClientAmount = async () => {
    try {
      const response = await api.get('/top-by-amount');
      setTop5ClientAmount(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTopItemsByPet = async () => {
    try {
      const response = await api.get('/items-by-pet');
      setTopItemsByPet(response.data.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleTopItemsConsumed = async () => {
    try {
      const response = await api.get('/top-items');
      setTopItemsConsumed(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHistoric = async () => {
    try {
      const response = await api.get('/historic');
      setHistoric(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterConsume = async () => {
    const { cpf, itemType, itemName, petName } = formData;

    if (!cpf || !petName || !itemName) {
      setAlert({ variant: 'warning', message: 'Por favor, preencha todos os campos.' });
      return;
    }

    try {
      await api.post('/register', {
        cpf,
        itemType,
        itemName,
        petName
      });
      setAlert({ variant: 'success', message: 'Consumo registrado com sucesso!' });
      setShowModal(false);
      setFormData({ cpf: '', petName: '', itemType: 'product', itemName: '' });
    } catch (error) {
      console.error(error);
      setAlert({ variant: 'danger', message: 'Erro ao registrar consumo.' });
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1 className="mb-4">Gerenciamento de Consumos</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'registrar')} className="mb-4">
        <Tab eventKey="historico" title="Histórico por Cliente">
          <Card className="mt-3">
            <Card.Header>Histórico de Consumos</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Produtos</th>
                    <th>Serviços</th>
                  </tr>
                </thead>
                <tbody>
                  {historic.map((client, index) => (
                    <tr key={index}>
                      <td>{client.name}</td>
                      <td>{client.products.join(', ') || 'Nenhum'}</td>
                      <td>{client.services.join(', ') || 'Nenhum'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="topClientes" title="Top Clientes">
          <Row className="mt-3">
            <Col md={6}>
              <Card>
                <Card.Header>Top 10 Clientes (Quantidade)</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top10ClientConsumed.map((client, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{client.name}</td>
                          <td>{client.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Top 5 Clientes (Valor)</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Total R$</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top5ClientAmount.map((client, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{client.name}</td>
                          <td>{client.totalSpent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="itensConsumidos" title="Itens Mais Consumidos">
          <Row className="mt-3">
            <Col md={6}>
              <Card>
                <Card.Header>Itens Mais Consumidos</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topItemsConsumed.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>
                            {item.type === 'product' ? 'Produto' : 'Serviço'}
                          </td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Itens por Tipo/Raça de Pet</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Raça</th>
                        <th>Item</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody> 
                      {topItemsByPet.map((item, index) => (
                        <tr key={index}>
                          <td>{item.species}</td>
                          <td>{item.breed}</td>
                          <td>{item.items[0].name}</td>
                          <td>{item.items[0].quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <div className="mt-4 mb-5">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Registrar Novo Consumo
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Novo Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CPF do Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleFormChange('cpf', e.target.value)}
                    placeholder="Digite o CPF"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
              
                <Form.Group>
                  <Form.Label>Nome do Pet</Form.Label>
                  <Form.Control
                  
                    value={formData.petName}
                    onChange={(e) => handleFormChange('petName', e.target.value)}
                    placeholder="Digite o nome do pet"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tipo do Item</Form.Label>
                  <Form.Select
                    value={formData.itemType}
                    onChange={(e) => handleFormChange('itemType', e.target.value as 'product' | 'service')}
                  >
                    <option value="product">Produto</option>
                    <option value="service">Serviço</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nome do Item</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => handleFormChange('itemName', e.target.value)}
                    placeholder={`Digite o nome do ${formData.itemType}`}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleRegisterConsume}>
            Registrar Consumo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Consumos;