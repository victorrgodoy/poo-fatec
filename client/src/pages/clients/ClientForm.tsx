// import React from "react";
// import { CREATE_CLIENT, UPDATE_CLIENT } from "../../api";
// import FormBasic from "../../components/FormBasic";
// import { Button, Form, Input, message, Row, Col, DatePicker, Space } from "antd";
// import moment from "moment";
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// const ClientForm = ({ client, onSuccess, onCancel }) => {
//   const [loading, setLoading] = React.useState(false);
//   const [form] = Form.useForm();

//   React.useEffect(() => {
//     if (client) {
//       // Preenche campos com dados do cliente para editar
//       form.setFieldsValue({
//         name: client.name,
//         socialName: client.socialName,
//         cpfNumber: client.cpf?.number,
//         cpfIssueDate: client.cpf?.issueDate ? moment(client.cpf.issueDate) : null,
//         rgs: client.rgs?.map(rg => ({
//           number: rg.number,
//           issueDate: rg.issueDate ? moment(rg.issueDate) : null,
//         })) || [],
//         phones: client.phones?.map(phone => ({
//           ddd: phone.ddd,
//           number: phone.number,
//         })) || [],
//       });
//     } else {
//       form.resetFields();
//     }
//   }, [client, form]);

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       // Monta o corpo para enviar conforme seu JSON de exemplo
//       const body = {
//         name: values.name,
//         socialName: values.socialName,
//         cpf: {
//           number: values.cpfNumber,
//           issueDate: values.cpfIssueDate?.format("YYYY-MM-DD"),
//         },
//         rgs: values.rgs?.map(rg => ({
//           number: rg.number,
//           issueDate: rg.issueDate?.format("YYYY-MM-DD"),
//         })) || [],
//         phones: values.phones || [],
//       };

//       const { url, options } = client
//         ? CLIENT_UPDATE_PUT(body)
//         : CLIENT_SAVE_POST(body);
//       const response = await fetch(url, options);

//       if (!response.ok) {
//         throw new Error("Erro ao salvar cliente");
//       }

//       message.success(
//         client
//           ? "Cliente atualizado com sucesso!"
//           : "Cliente salvo com sucesso!",
//       );
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       message.error(err.message || "Erro ao salvar cliente");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <FormBasic form={form} onFinish={handleSubmit} layout="vertical">
//         {/* Nome */}
//         <Form.Item
//           label="Nome Completo"
//           name="name"
//           rules={[{ required: true, message: "Por favor, insira o nome completo!" }]}
//         >
//           <Input />
//         </Form.Item>

//         {/* Nome Social */}
//         <Form.Item
//           label="Nome Social"
//           name="socialName"
//           rules={[{ required: true, message: "Por favor, insira o nome social!" }]}
//         >
//           <Input />
//         </Form.Item>

//         {/* CPF */}
//         <Row gutter={16}>
//           <Col span={16}>
//             <Form.Item
//               label="CPF Número"
//               name="cpfNumber"
//               rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               label="Data de Emissão do CPF"
//               name="cpfIssueDate"
//               rules={[{ required: true, message: "Por favor, insira a data de emissão do CPF!" }]}
//             >
//               <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//             </Form.Item>
//           </Col>
//         </Row>

//         {/* RGs dinâmicos */}
//         <Form.List name="rgs">
//           {(fields, { add, remove }) => (
//             <>
//               <label>RG(s)</label>
//               {fields.map(({ key, name, ...restField }) => (
//                 <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
//                   <Form.Item
//                     {...restField}
//                     name={[name, "number"]}
//                     rules={[{ required: true, message: "Número do RG obrigatório" }]}
//                   >
//                     <Input placeholder="Número do RG" />
//                   </Form.Item>
//                   <Form.Item
//                     {...restField}
//                     name={[name, "issueDate"]}
//                     rules={[{ required: true, message: "Data de emissão obrigatória" }]}
//                   >
//                     <DatePicker format="YYYY-MM-DD" />
//                   </Form.Item>
//                   <MinusCircleOutlined onClick={() => remove(name)} />
//                 </Space>
//               ))}
//               <Form.Item>
//                 <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                   Adicionar RG
//                 </Button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>

//         {/* Telefones dinâmicos */}
//         <Form.List name="phones" initialValue={[{ ddd: "", number: "" }]}>
//           {(fields, { add, remove }) => (
//             <>
//               <label>Telefones</label>
//               {fields.map(({ key, name, ...restField }) => (
//                 <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
//                   <Form.Item
//                     {...restField}
//                     name={[name, "ddd"]}
//                     rules={[{ required: true, message: "DDD obrigatório" }]}
//                   >
//                     <Input placeholder="DDD" style={{ width: 80 }} />
//                   </Form.Item>
//                   <Form.Item
//                     {...restField}
//                     name={[name, "number"]}
//                     rules={[{ required: true, message: "Número do telefone obrigatório" }]}
//                   >
//                     <Input placeholder="Número" />
//                   </Form.Item>
//                   <MinusCircleOutlined onClick={() => remove(name)} />
//                 </Space>
//               ))}
//               <Form.Item>
//                 <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                   Adicionar Telefone
//                 </Button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>

//         <Form.Item>
//           <Space>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Salvar
//             </Button>
//             <Button onClick={onCancel}>Cancelar</Button>
//           </Space>
//         </Form.Item>
//       </FormBasic>
//     </>
//   );
// };

// export default ClientForm;