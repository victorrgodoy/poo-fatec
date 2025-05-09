import { Form, type FormInstance, type FormProps } from "antd";
import React from "react";

interface FormBasicProps<FormValues> {
  children: React.ReactNode;
  onFinish: (values: FormValues) => Promise<void> | void; // Allow async functions
  form: FormInstance<FormValues>;
}

const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const FormBasic = <FormValues extends object>({
  children,
  onFinish,
  form
}: FormBasicProps<FormValues>) => (
  <Form<FormValues>
    form={form}
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {children}
  </Form>
);

export default FormBasic;