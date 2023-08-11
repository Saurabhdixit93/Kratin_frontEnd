import React, { useState } from "react";
import styled from "styled-components";
import { RiTaskLine } from "react-icons/ri";
import { MdDescription, MdDateRange } from "react-icons/md";
import { message } from "antd";
import axios from "axios";
import { getTokenCookie } from "../../context/cookie";
import Loader from "../Loader/Loading";
import { useNavigate } from "react-router-dom";

const TaskFormContainer = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 768px) {
    width: 50%;
    margin: 0 auto;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 1.2rem;
  color: #555;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 0.5rem;
`;

const FormInput = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

const FormButton = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  cursor: pointer;
`;

const TaskForm = () => {
  const user = getTokenCookie();
  let userId = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userId = tokenPayload.userId;
  }
  const [title, setTitle] = useState("");
  const [desc, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await axios.post(`/task/new-task/${userId}`, {
        title: title,
        desc: desc,
        dueDate: dueDate,
      });
      if (res.data.success) {
        setIsSubmitting(false);
        message.success(res.data.message);
        navigate("/task-list");
        window.location.reload();
        return;
      } else {
        message.error(res.data.message);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      message.error(error.message);
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <TaskFormContainer>
      <h2>Create New Task</h2>
      <Form onSubmit={handleSubmit}>
        <FormLabel>
          <Icon>
            <RiTaskLine />
          </Icon>
          Title
        </FormLabel>
        <FormInput
          type="text"
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormLabel>
          <Icon>
            <MdDescription />
          </Icon>
          Description
        </FormLabel>
        <FormInput
          type="text"
          value={desc}
          placeholder="Enter task Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FormLabel>
          <Icon>
            <MdDateRange />
          </Icon>
          Due Date
        </FormLabel>
        <FormInput
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        {isSubmitting ? (
          <Loader />
        ) : (
          <FormButton type="submit">Create Task</FormButton>
        )}
      </Form>
    </TaskFormContainer>
  );
};

export default TaskForm;
