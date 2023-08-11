import React from "react";
import styled from "styled-components";

const GuidedExerciseContainer = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ExerciseTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const ExerciseDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 1rem;
`;

const BenefitsList = styled.ul`
  list-style: disc;
  text-align: left;
  font-size: 1.1rem;
  color: #555;
  margin-top: 1rem;
`;

const BenefitItem = styled.li`
  margin-bottom: 0.5rem;
`;

const GuidedExercise = ({ title, description, benefits }) => {
  return (
    <GuidedExerciseContainer>
      <ExerciseTitle>{title}</ExerciseTitle>
      <ExerciseDescription>{description}</ExerciseDescription>
      <BenefitsList>
        {benefits.map((benefit, index) => (
          <BenefitItem key={index}>{benefit}</BenefitItem>
        ))}
      </BenefitsList>
    </GuidedExerciseContainer>
  );
};

export default GuidedExercise;
