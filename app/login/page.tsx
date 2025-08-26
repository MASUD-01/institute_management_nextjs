import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "./Login.css";
import image1 from "@/public/asset/image1.jpg";
import image2 from "@/public/asset/image2.jpg";
import image3 from "@/public/asset/image3.jpg";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import { logo } from "@/constant/logo";

const images = [image1, image2, image3];

const Login: React.FC = () => {
  return (
    <div className="login-wrapper">
      <Row className="login-row" justify="center">
        {/* Left side - form */}
        <Col xs={24} md={12} className="login-left">
          <Card size="small" className="login-card" bordered={false}>
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

            <LoginForm />
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
  );
};

export default Login;
