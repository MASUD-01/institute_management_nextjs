"use client";
import React from "react";
import { Row, Col, Card, Button, Form, Checkbox } from "antd";
import "./Login.css";
import image1 from "@/public/asset/image1.jpg";
import image2 from "@/public/asset/image2.jpg";
import image3 from "@/public/asset/image3.jpg";
import Image from "next/image";
import { socialLogin } from "../actions/socialLogin";
import { ServerLoginAuth } from "../api/auth/serverLoginAuth";
import { FormItemInput, FormItemPassword } from "@/common/Form/FormItems";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import { logo } from "@/constant/logo";
// import Title from "antd/es/typography/Title";
// import { logo } from "@/constant/logo";
// import LoginForm from "@/components/login/LoginForm";
// import { FormItemInput, FormItemPassword } from "@/common/Form/FormItems";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ServerLoginAuth } from "../api/auth/serverLoginAuth";
// import { socialLogin } from "../actions/socialLogin";

const images = [image1, image2, image3];

const ServerLogin: React.FC = () => {
  const onFinish = async (event: any) => {};
  return (
    <>
      <div className="login-wrapper">
        <Row className="login-row" justify="center">
          {/* Left side - form */}
          <Col xs={24} md={12} className="login-left">
            <Card variant="borderless" size="small" className="login-card">
              <div
                className="login-logo-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src={logo} alt="Logo" className="login-logo-img" />
                <Title level={3} className="logo-title">
                  Institute Management
                </Title>
              </div>

              <>
                <Form
                  // action={ServerLoginAuth}
                  name="admin-login"
                  onFinish={async (values) => {
                    await ServerLoginAuth(values);
                    // handle success / error
                  }}
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

                {/* ---------------------------social login----------------- */}
                <div className="flex items-center justify-center  bg-gray-100">
                  <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <form className="space-y-4" action={socialLogin}>
                      <div className="flex items-center gap-2">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-gray-500 text-sm">or</span>
                        <hr className="flex-1 border-gray-300" />
                      </div>
                      <div className="flex flex-col gap-3">
                        <button
                          name="socialAction"
                          value="google"
                          className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                          <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            className="w-5 h-5"
                            alt="Google"
                          />
                          <span className="font-medium text-gray-700">
                            Continue with Google
                          </span>
                        </button>

                        <button
                          name="socialAction"
                          value="github"
                          className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                        >
                          <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            className="w-5 h-5 invert"
                            alt="GitHub"
                          />
                          <span className="font-medium">
                            Continue with GitHub
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            </Card>
          </Col>

          {/* Right side - image slider */}
          <Col xs={24} md={12} className="login-right">
            <div className="image-slider">
              {images?.map((img, index) => (
                <div className="slide" key={index}>
                  <Image src={img} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ServerLogin;
