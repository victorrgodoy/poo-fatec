import  { useState } from 'react';
import { Card, Button, Row, Col, Tab, Tabs } from 'react-bootstrap';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('estatisticas');

  const handleTabChange = (key: string | null) => {
    setActiveTab(key || 'estatisticas');
  };

  return (
    <div className="ps-4 pe-4">
      <h1 className="mb-4">Registros Pet Lovers</h1>

      <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-4">
        <Tab eventKey="estatisticas" title="Estatísticas">
          <Row className="mt-3">
            {/* Top 10 Clientes (Quantidade) */}
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header className="bg-secondary text-white">
                  <Card.Title className="mb-0">Top 10 Clientes (Quantidade)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Cliente</th>
                          <th>Itens Consumidos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Dados serão injetados aqui */}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Top 5 Clientes (Valor) */}
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header className="bg-secondary text-white">
                  <Card.Title className="mb-0">Top 5 Clientes (Valor)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Cliente</th>
                          <th>Valor Gasto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Dados serão injetados aqui */}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Itens Mais Consumidos */}
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header className="bg-secondary text-white">
                  <Card.Title className="mb-0">Itens Mais Consumidos</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Tipo</th>
                          <th>Quantidade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Dados serão injetados aqui */}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Itens por Tipo/Raça de Pet */}
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header className="bg-secondary text-white">
                  <Card.Title className="mb-0">Itens por Tipo/Raça de Pet</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Tipo Pet</th>
                          <th>Raça</th>
                          <th>Item</th>
                          <th>Quantidade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Dados serão injetados aqui */}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="registro" title="Registrar Consumo">
          <Card className="mt-3">
            <Card.Header className="bg-secondary text-white">
              <Card.Title className="mb-0">Registrar Novo Consumo</Card.Title>
            </Card.Header>
            <Card.Body>
              <form>
                <Row className="mb-3">
                  <Col md={6}>
                    <label className="form-label">CPF do Cliente</label>
                    <input type="text" className="form-control" />
                  </Col>
                  <Col md={6}>
                    <label className="form-label">Nome do Pet</label>
                    <input type="text" className="form-control" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <label className="form-label">Tipo (Produto/Serviço)</label>
                    <select className="form-select">
                      <option>Selecione...</option>
                      <option>Produto</option>
                      <option>Serviço</option>
                    </select>
                  </Col>
                  <Col md={6}>
                    <label className="form-label">Nome do Item</label>
                    <input type="text" className="form-control" />
                  </Col>
                </Row>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    Registrar Consumo
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Dashboard;