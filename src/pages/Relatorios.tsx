import React from 'react'
import { Card, Table, Row, Col } from 'react-bootstrap'

type ClienteQuantidade = { nome: string; quantidade: number }
type ClienteValor = { nome: string; valor: number }
type Produto = { produto: string; quantidade: number }

type State = {
  topClientesQuantidade: ClienteQuantidade[]
  topClientesValor: ClienteValor[]
  produtosMaisConsumidos: Produto[]
}

export default class Relatorios extends React.Component<unknown, State> {
  state: State = {
    topClientesQuantidade: [
      { nome: 'João Silva', quantidade: 42 },
      { nome: 'Maria Souza', quantidade: 38 }
    ],
    topClientesValor: [
      { nome: 'Carlos Oliveira', valor: 1250.5 },
      { nome: 'Ana Santos', valor: 980.75 }
    ],
    produtosMaisConsumidos: [
      { produto: 'Ração Premium', quantidade: 120 },
      { produto: 'Brinquedo para Gato', quantidade: 85 }
    ]
  }

  render() {
    const { topClientesQuantidade, topClientesValor, produtosMaisConsumidos } = this.state

    return (
      <div>
        <h2 className="mb-4">Relatórios</h2>

        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Header>Top 10 Clientes (Quantidade)</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClientesQuantidade.map((cliente, index) => (
                      <tr key={index}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.quantidade}</td>
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
                      <th>Cliente</th>
                      <th>Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClientesValor.map((cliente, index) => (
                      <tr key={index}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.valor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>Produtos/Serviços Mais Consumidos</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Produto/Serviço</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosMaisConsumidos.map((item, index) => (
                      <tr key={index}>
                        <td>{item.produto}</td>
                        <td>{item.quantidade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
