"use client";

import { Form, Input, Button, Checkbox } from "antd";

import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import Link from "next/link";
const LoginForm = () => {
  const [form] = Form.useForm();
  const onFinish = async () => {
    // try {
    //   const { success, token, data: loginData } = await login(data).unwrap();
    //   if (success && token && !loginData?.is_2fa_on) {
    //     navigate(from, { replace: true });
    //     dispatch(setAuth({ token: token, success }));
    //   } else if (loginData?.is_2fa_on && loginData?.email) {
    //     navigate(`/auth/match-otp?email=${loginData.email}&type=verify_admin`);
    //   }
    // } catch (error) {
    //   const { status, data } = error as AuthError;
    //   if (status === 'FETCH_ERROR') {
    //     dispatch(
    //       setMessage(
    //         'Our servers are temporarily unavailable. Please try again later.'
    //       )
    //     );
    //   } else {
    //     dispatch(setMessage(data.message));
    //   }
    // }
  };
  return (
    <Form
      form={form}
      name="admin-login"
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="login_id"
        label="UserId"
        rules={[
          {
            required: true,
            message: "Please input your email or userId!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Email or Username"
          className="custom-input"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="custom-input"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox name="remember">Remember me</Checkbox>
        <Link className="forgot-link" href="/auth/send-otp">
          Forgot password?
        </Link>
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        // loading={isLoading}
      >
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
