import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import styled from "styled-components";
const FormInput = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

const UpdateTaskModal = ({ task, visible, onClose, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //   const [dueDate, setDueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onUpdate(task._id, values);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update Task"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} initialValues={task}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="desc">
          <Input.TextArea name="desc" rows={4} />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate">
          <FormInput
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaskModal;
