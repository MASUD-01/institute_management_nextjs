"use client";

import { Form, Button, Checkbox } from "antd";
import Link from "next/link";
import { FormItemInput, FormItemPassword } from "@/common/Form/FormItems";

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
  );
};

export default LoginForm;
