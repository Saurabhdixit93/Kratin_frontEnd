import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeartbeat } from "react-icons/fa";
import StepTracking from "./StepTracking";
import { Link } from "react-router-dom";

const HeartbeatTrackerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    height: 400px;
  }
`;

const HeartRateDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeartRateValue = styled.span`
  font-size: 3rem;
  color: #007bff;
`;

const HeartRateLabel = styled.span`
  font-size: 1.2rem;
  color: #555555;
`;

const HeartIcon = styled(FaHeartbeat)`
  font-size: 3rem;
  color: #ff1744; /* Red color */
  margin-bottom: 1rem;
`;

const TaskManagementContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TaskLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }
`;
const HeartbeatTracker = () => {
  const [heartRate, setHeartRate] = useState(70);

  useEffect(() => {
    // Simulate dynamic heart rate update (replace with actual logic)
    const interval = setInterval(() => {
      const newHeartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      setHeartRate(newHeartRate);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <HeartbeatTrackerContainer>
        <HeartRateDisplayContainer>
          <HeartIcon />
          <HeartRateValue>{heartRate}</HeartRateValue>
          <HeartRateLabel>bpm</HeartRateLabel>
        </HeartRateDisplayContainer>
      </HeartbeatTrackerContainer>
      <br />
      <StepTracking />
      <br />
      <TaskManagementContainer>
        <h2>Task Management</h2>
        <TaskLinks>
          <Link to="/task-list">Task List</Link>
          <Link to="/create-task">Create New Task</Link>
        </TaskLinks>
      </TaskManagementContainer>
    </>
  );
};

export default HeartbeatTracker;
