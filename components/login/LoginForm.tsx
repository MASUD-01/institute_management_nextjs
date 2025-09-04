"use client";

import { Form, Button, Checkbox } from "antd";
import Link from "next/link";
import { FormItemInput, FormItemPassword } from "@/common/Form/FormItems";
// import { signIn } from "@/auth/auth";  //this for server component
import { signIn } from "next-auth/react"; // this for client component

import { login } from "@/app/actions";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (event: any) => {
    try {
      const formData = new FormData(event.currentTarget);
      const response: any = await login(formData);

      if (!!response?.error) {
        setError(response?.error.message);
      }
    } catch (err) {
      router.push("/");
    }
  };
  const [error, setError] = useState("");
  const handleAuth = () => {
    signIn("google", { callbackUrl: "http://localhost:30001" });
  };
  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form
        form={form}
        name="admin-login"
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <FormItemInput
          name="login_id"
          placeholder="Email or Username"
          formItemProps={{
            name: "login_id",
            label: "UserId",
            rules: [
              { required: true, message: "Please input your email or userId!" },
            ],
          }}
        />
        <FormItemPassword
          placeholder="Password"
          formItemProps={{
            name: "password",
            label: "Password",
            rules: [{ required: true, message: "Please input your password!" }],
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

      <Button onClick={handleAuth}>Google</Button>
    </>
  );
};

export default LoginForm;
