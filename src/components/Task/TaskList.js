import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect, useId } from "react";
import styled from "styled-components";
import { getTokenCookie } from "../../context/cookie";
import Loader from "../Loader/Loading";
import UpdateTaskModal from "./UpdatePopup";

const UpdateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  cursor: pointer;
`;

const CompleteButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  cursor: pointer;
`;

const TaskListContainer = styled.div`
  min-height: 80vh;
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

const TaskItem = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  flex: 1;
`;

const TaskStatus = styled.span`
  font-size: 1rem;
  color: ${({ completed }) => (completed ? "#28a745" : "#dc3545")};
`;

const TaskDueDate = styled.span`
  font-size: 1rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const TaskDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const TaskList = () => {
  const user = getTokenCookie();
  let userId = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userId = tokenPayload.userId;
  }
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`task/get-tasks/${userId}`);
        if (res.data.success) {
          const getTasks = res.data.tasks;
          setTasks(getTasks);
          return;
        } else {
          message.error(res.data.message);
          return;
        }
      } catch (error) {
        message.error(error.message);
        return;
      } finally {
        setLoading(false);
        return;
      }
    };

    fetchTasks();
  }, []);

  const handleUpdate = async (taskId, updatedValues) => {
    setUpdateModalVisible(false);
    try {
      const res = await axios.put(`/task/update-task/${taskId}`, updatedValues);
      if (res.data.success) {
        message.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return;
      }
      message.error(res.data.message);
      return;
    } catch (error) {
      message.error(error);
      return;
    }
  };

  const handleDelete = async (taskId) => {
    alert(`Delete The Task permanently ?`);
    try {
      const res = await axios.delete(`task/delete-task/${taskId}`);
      if (res.data.success) {
        message.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        return;
      }
      message.error(res.data.message);
      return;
    } catch (error) {
      message.error(error.message);
      return;
    }
  };

  const handleComplete = async (taskId) => {
    try {
      const res = await axios.put(`/task/completed/${taskId}`);
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
        return;
      }
      message.error(res.data.message);
      return;
    } catch (error) {
      message.error(error);
      return;
    }
  };

  return (
    <TaskListContainer>
      <h2>Task List</h2>
      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <p className="no-task">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task._id}>
            <TaskDetails>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskStatus completed={task.completed}>
                {task.completed}
              </TaskStatus>
            </TaskDetails>
            <TaskDescription>{task.desc}</TaskDescription> {/* Add this line */}
            <TaskDueDate>Due Date: {task.dueDate}</TaskDueDate>
            <ButtonGroup>
              <UpdateButton
                onClick={() => {
                  setSelectedTask(task);
                  setUpdateModalVisible(true);
                }}
              >
                Update
              </UpdateButton>
              <DeleteButton onClick={() => handleDelete(task._id)}>
                Delete
              </DeleteButton>
              {task.completed === "pending" && (
                <CompleteButton onClick={() => handleComplete(task._id)}>
                  Complete
                </CompleteButton>
              )}
            </ButtonGroup>
          </TaskItem>
        ))
      )}
      {/* Update Task Modal */}
      <UpdateTaskModal
        task={selectedTask}
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        onUpdate={handleUpdate}
      />
    </TaskListContainer>
  );
};

export default TaskList;
