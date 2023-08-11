import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StepTrackingContainer = styled.div`
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

const StepCountDisplay = styled.div`
  font-size: 3rem;
  color: #007bff;
`;

const StepTracking = () => {
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    // Simulate dynamic step count update (replace with actual logic)
    const interval = setInterval(() => {
      const newStepCount = Math.floor(Math.random() * 10000); // Generate random steps
      setStepCount(newStepCount);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StepTrackingContainer>
      <div>
        <h2>Step Tracking</h2>
        <StepCountDisplay>{stepCount}</StepCountDisplay>
        <p>Steps Today</p>
        {/* Add additional step tracking content here */}
      </div>
    </StepTrackingContainer>
  );
};

export default StepTracking;
