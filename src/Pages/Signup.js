import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import Loader from "../components/Loader/Loading";
import { useNavigate } from "react-router-dom";

const StyledForm = styled(Form)`
  max-width: 300px;
  margin: 0 auto;
  min-height: 72vh;
`;
const LoginContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const SignupForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("/user/sign_up", {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (res.data.success) {
        setIsSubmitting(false);
        message.success(res.data.message);
        navigate("/login");
        window.location.reload();
        return;
      } else {
        setIsSubmitting(false);
        message.error(res.data.message);
        return;
      }
    } catch (error) {
      setIsSubmitting(false);
      message.error(error.message);
      return;
    }
  };

  return (
    <LoginContainer>
      <StyledForm form={form} onFinish={handleSubmit}>
        <h2>Sign Up</h2>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        {isSubmitting ? (
          <Loader />
        ) : (
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Sign Up
          </Button>
        )}
      </StyledForm>
    </LoginContainer>
  );
};

export default SignupForm;
