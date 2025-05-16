import React from "react";
import { Form } from "antd";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const FormBasic = ({ children, onFinish, form }) => (
  <Form
    form={form}
    name="basic"
    layout="vertical"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {children}
  </Form>
);
export default FormBasic;
