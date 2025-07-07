import ClientApi from "../api/clientApi";
import RgApi from "../api/rgApi";
import PhoneApi from "../api/phoneApi";
import type { Client, AlertInfo } from "../types/general";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Modal,
  Table,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

export default function Clients() {
  const [showModalClient, setShowModalClient] = useState(false);
  const [showModalRg, setShowModalRg] = useState(false);
  const [showModalPhone, setShowModalPhone] = useState(false);
  const [modalType, setModalType] = useState<
    "cadastrar" | "editar" | "remover"
  >("cadastrar");
  const [currentClient, setCurrentClient] = useState<Client>({
    name: "",
    socialName: "",
    cpf: { number: "", issueDate: "" },
    rgs: [],
    phones: [],
  });
  const [currentRg, setCurrtentRg] = useState({ number: "", issueDate: "" });
  const [currentPhone, setCurrentPhone] = useState({ ddd: "", number: "" });
  const [alert, setAlert] = useState<AlertInfo | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const resetForm = () => {
    setCurrentClient({
      name: "",
      socialName: "",
      cpf: { number: "", issueDate: "" },
      rgs: [],
      phones: [],
    });
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clients = await ClientApi.getAllClients();
        setClients(clients);
      } catch {
        setAlert({ variant: "danger", message: "Erro ao carregar clientes" });
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    if (showModalClient && currentClient.id) {
      const fetchClientData = async () => {
        try {
          const updatedClient = await ClientApi.getClientById(
            currentClient.id!
          );
          setCurrentClient(updatedClient);
        } catch (error) {
          console.error("Erro ao carregar dados do cliente:", error);
        }
      };
      fetchClientData();
    }
  }, [currentClient.id, showModalClient]);

  const handleCreateClient = async () => {
    try {
      const newClient = await ClientApi.createClient(currentClient);
      setClients([...clients, newClient]);
      setAlert({
        variant: "success",
        message: "Cliente cadastrado com sucesso!",
      });
      resetForm();
      setShowModalClient(false);
    } catch {
      setAlert({ variant: "danger", message: "Erro ao cadastrar cliente" });
    }
  };

  const handleUpdateClient = async (id: number) => {
    try {
      const updatedClient = await ClientApi.updateClient(id, currentClient);
      setClients(
        clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
      setAlert({
        variant: "success",
        message: "Cliente atualizado com sucesso!",
      });
      setShowModalClient(false);
    } catch {
      setAlert({ variant: "danger", message: "Erro ao atualizar cliente" });
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await ClientApi.deleteClient(id);
      setClients(clients.filter((client) => client.id !== id));
      setAlert({
        variant: "success",
        message: "Cliente removido com sucesso!",
      });
      setShowModalClient(false);
    } catch {
      setAlert({ variant: "danger", message: "Erro ao remover cliente" });
    }
  };

  const handleAddRg = async () => {
    try {
      if (!currentClient.id) return;
      const rgToCreate = {
        clientId: currentClient.id,
        number: currentRg.number,
        issueDate: currentRg.issueDate,
      };
      const createdRg = await RgApi.createRg(rgToCreate);
      setClients(
        clients.map((client) =>
          client.id === currentClient.id
            ? {
                ...client,
                rgs: [...client.rgs, createdRg],
              }
            : client
        )
      );
      setAlert({ variant: "success", message: "RG cadastrado com sucesso!" });
      setCurrtentRg({ number: "", issueDate: "" });
      setShowModalRg(false);
      setShowModalClient(true);
    } catch {
      setAlert({ variant: "danger", message: "Erro ao cadastrar RG" });
    }
  };

  const handleAddPhone = async () => {
    try {
      if (!currentClient.id) return;
      const phoneToCreate = {
        clientId: currentClient.id,
        ddd: currentPhone.ddd,
        number: currentPhone.number,
      };
      const createdPhone = await PhoneApi.createPhone(phoneToCreate);
      setClients(
        clients.map((client) =>
          client.id === currentClient.id
            ? {
                ...client,
                phones: [...client.phones, createdPhone],
              }
            : client
        )
      );
      setAlert({
        variant: "success",
        message: "Telefone cadastrado com sucesso!",
      });
      setCurrentPhone({ ddd: "", number: "" });
      setShowModalPhone(false);
      setShowModalClient(true);
    } catch {
      setAlert({ variant: "danger", message: "Erro ao cadastrar telefone" });
    }
  };
  const handleRemoveRg = async (rgId: number) => {
    try {
      await RgApi.deleteRg(rgId);

      setCurrentClient((prev) => ({
        ...prev,
        rgs: prev.rgs.filter((rg) => rg.id !== rgId),
      }));

      setClients(
        clients.map((client) =>
          client.id === currentClient.id
            ? { ...client, rgs: client.rgs.filter((rg) => rg.id !== rgId) }
            : client
        )
      );
    } catch {
      setAlert({ variant: "danger", message: "Erro ao remover RG" });
    }
  };

  const handleRemovePhone = async (phoneId: number) => {
    try {
      await PhoneApi.deletePhone(phoneId);

      setCurrentClient((prev) => ({
        ...prev,
        phones: prev.phones.filter((phone) => phone.id !== phoneId),
      }));

      setClients(
        clients.map((client) =>
          client.id === currentClient.id
            ? {
                ...client,
                phones: client.phones.filter((phone) => phone.id !== phoneId),
              }
            : client
        )
      );
    } catch {
      setAlert({ variant: "danger", message: "Erro ao remover telefone" });
    }
  };

  return (
    <div>
      <h1 className="mb-4">Gerenciamento de Clientes</h1>
      {alert && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert(null)}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Lista de Clientes</span>

          <Button
            onClick={() => {
              setModalType("cadastrar");
              setCurrentClient({
                cpf: { number: "", issueDate: "" },
                name: "",
                socialName: "",
                rgs: [],
                phones: [],
              });
              setShowModalClient(true);
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
                <th>Emissão CPF</th>
                <th>Nome</th>
                <th>Nome Social</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.cpf.number}</td>
                  <td>
                    {new Date(client.cpf.issueDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td>{client.name}</td>
                  <td>{client.socialName}</td>
                  <td>
                    <Link to={`/pets/${client.id}`}>
                      <Button variant="info" size="sm" className="me-2">
                        Pets
                      </Button>
                    </Link>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setModalType("editar");
                        setCurrentClient(client);
                        setShowModalClient(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setModalType("remover");
                        setCurrentClient(client);
                        setShowModalClient(true);
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

      {/* Modal para Cadastrar / Editar / Remover Cliente */}
      <Modal
        show={showModalClient}
        onHide={() => setShowModalClient(false)}
        size="xl"
        contentClassName="p-1"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "cadastrar" && "Cadastrar Novo Cliente"}
            {modalType === "editar" && "Editar Cliente"}
            {modalType === "remover" && "Remover Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType !== "remover" ? (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={currentClient.cpf.number}
                      onChange={(e) =>
                        setCurrentClient({
                          ...currentClient,
                          cpf: { ...currentClient.cpf, number: e.target.value },
                        })
                      }
                      disabled={modalType === "editar"}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Data de Emissão do CPF</Form.Label>
                    <Form.Control
                      size="sm"
                      type="date"
                      value={currentClient.cpf.issueDate}
                      onChange={(e) =>
                        setCurrentClient({
                          ...currentClient,
                          cpf: {
                            ...currentClient.cpf,
                            issueDate: e.target.value,
                          },
                        })
                      }
                      disabled={modalType === "editar"}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={currentClient.name}
                      onChange={(e) =>
                        setCurrentClient({
                          ...currentClient,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome Social</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={currentClient.socialName}
                      onChange={(e) =>
                        setCurrentClient({
                          ...currentClient,
                          socialName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              {Array.from({
                length: Math.max(
                  currentClient.rgs.length,
                  currentClient.phones.length
                ),
              }).map((_, index) => (
                <Row key={index} className="align-items-center mb-2">
                  {/* Coluna esquerda: RG */}
                  <Col md={6}>
                    {currentClient.rgs[index] && (
                      <Row className="align-items-center">
                        <Col md={1}>RG:</Col>
                        <Col md={4}>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={currentClient.rgs[index].number}
                            onChange={(e) => {
                              const newRgs = [...currentClient.rgs];
                              newRgs[index].number = e.target.value;
                              setCurrentClient({
                                ...currentClient,
                                rgs: newRgs,
                              });
                            }}
                          />
                        </Col>
                        <Col md={2}>Emissão:</Col>
                        <Col md={3}>
                          <Form.Control
                            size="sm"
                            type="date"
                            value={
                              currentClient.rgs[index].issueDate?.slice(
                                0,
                                10
                              ) || ""
                            }
                            onChange={(e) => {
                              const newRgs = [...currentClient.rgs];
                              newRgs[index].issueDate = e.target.value;
                              setCurrentClient({
                                ...currentClient,
                                rgs: newRgs,
                              });
                            }}
                          />
                        </Col>
                        <Col md={1}>
                          <Button
                            variant="btn btn-link"
                            size="sm"
                            onClick={() => {
                              handleRemoveRg(currentClient.rgs[index].id!);
                            }}
                          >
                            Remover
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Col>

                  {/* Coluna direita: Telefone */}
                  <Col md={6}>
                    {currentClient.phones[index] && (
                      <Row className="align-items-center">
                        <Col md={1}>DDD:</Col>
                        <Col md={2}>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={currentClient.phones[index].ddd}
                            onChange={(e) => {
                              const newPhones = [...currentClient.phones];
                              newPhones[index].ddd = e.target.value;
                              setCurrentClient({
                                ...currentClient,
                                phones: newPhones,
                              });
                            }}
                          />
                        </Col>
                        <Col md={2}>Número:</Col>
                        <Col md={5}>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={currentClient.phones[index].number}
                            onChange={(e) => {
                              const newPhones = [...currentClient.phones];
                              newPhones[index].number = e.target.value;
                              setCurrentClient({
                                ...currentClient,
                                phones: newPhones,
                              });
                            }}
                          />
                        </Col>
                        <Col md={1}>
                          <Button
                            variant="btn btn-link"
                            size="sm"
                            onClick={() => {
                              handleRemovePhone(
                                currentClient.phones[index].id!
                              );
                            }}
                          >
                            Remover
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              ))}
            </Form>
          ) : (
            <p>
              Tem certeza que deseja remover o cliente{" "}
              <strong>{currentClient.name}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between gap-2">
          {modalType !== "remover" &&  modalType != "cadastrar" &&(
          <div className="d-flex gap-3">
            <Button
              variant="btn btn-outline-primary"
              onClick={() => {
                setShowModalRg(true);
                setShowModalClient(false);
              }}
            >
              Adicionar RG
            </Button>
            <Button
              variant="btn btn-outline-primary"
              onClick={() => {
                setShowModalPhone(true);
                setShowModalClient(false);
              }}
            >
              Adicionar Telefone
            </Button>
          </div>
          )}
          <div className="d-flex gap-3">
            <Button variant="danger" onClick={() => setShowModalClient(false)}>
              Fechar
            </Button>
            {modalType === "cadastrar" && (
              <Button variant="primary" onClick={handleCreateClient}>
                Cadastrar
              </Button>
            )}

            {modalType === "editar" && (
              <Button
                variant="primary"
                onClick={() => handleUpdateClient(currentClient.id!)}
                disabled={currentClient.name.length === 0}
              >
                Salvar Alterações
              </Button>
            )}
            {modalType === "remover" && (
              <Button
                variant="danger"
                onClick={() => handleDeleteClient(currentClient.id!)}
              >
                Remover
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalRg}
        onHide={() => setShowModalClient(true)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo RG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Número do RG</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentRg.number}
                    onChange={(e) =>
                      setCurrtentRg({ ...currentRg, number: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data de Emissão do RG</Form.Label>
                  <Form.Control
                    type="date"
                    value={currentRg.issueDate}
                    onChange={(e) =>
                      setCurrtentRg({ ...currentRg, issueDate: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalRg(false)}>
            Fechar
          </Button>

          <Button variant="primary" onClick={handleAddRg}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalPhone}
        onHide={() => setShowModalClient(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo Telefone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>DDD</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentPhone.ddd}
                    onChange={(e) =>
                      setCurrentPhone({ ...currentPhone, ddd: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Número do Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentPhone.number}
                    onChange={(e) =>
                      setCurrentPhone({
                        ...currentPhone,
                        number: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalPhone(false)}>
            Fechar
          </Button>

          <Button variant="primary" onClick={handleAddPhone}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
