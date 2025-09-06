"use client";

import { Form, Button, Checkbox } from "antd";
import Link from "next/link";
import { FormItemInput, FormItemPassword } from "@/common/Form/FormItems";
import { doCredentialLogin } from "@/app/actions/socialLogin";
import { ILogin } from "@/app/login/page";

const LoginForm = () => {
  const [form] = Form.useForm();
  async function onSubmit(event: ILogin) {
    const res = await doCredentialLogin(event);
  }
  return (
    <>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <Form
        onFinish={async (values) => {
          await onSubmit(values);
          // handle success / error
        }}
        layout="vertical"
        size="large"
      >
        <FormItemInput
          name="email"
          placeholder="Email or Username"
          formItemProps={{
            name: "email",
            label: "Email",
            rules: [
              {
                required: true,
                message: "Please input your email or userId!",
              },
            ],
          }}
        />
        <FormItemPassword
          placeholder="Password"
          formItemProps={{
            name: "password",
            label: "Password",
            rules: [
              {
                required: true,
                message: "Please input your password!",
              },
            ],
          }}
        />

        <Form.Item>
          <Checkbox name="remember">Remember me</Checkbox>
          <Link className="forgot-link" href="/auth/send-otp">
            Forgot password?
          </Link>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign In
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
