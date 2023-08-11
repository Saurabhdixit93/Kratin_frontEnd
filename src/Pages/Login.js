import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
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

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/user/login", {
        email: values.email,
        password: values.password,
      });

      if (res.data.success) {
        setIsSubmitting(false);
        const token = res.data.token;
        Cookies.set("token", token, { expires: 7 });
        message.success(res.data.message);
        navigate("/");
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
        <h2>Login</h2>
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
        {isSubmitting ? (
          <Loader />
        ) : (
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Login
          </Button>
        )}
      </StyledForm>
    </LoginContainer>
  );
};

export default LoginForm;
