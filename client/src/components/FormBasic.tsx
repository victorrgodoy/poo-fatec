import React from "react";
import { Form, FormInstance } from "antd";

interface FormBasicProps {
  children: React.ReactNode;
  onFinish: () => void;
  form: FormInstance;
}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const FormBasic: React.FC<FormBasicProps> = ({ children, onFinish, form }) => (
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
