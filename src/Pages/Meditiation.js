import React from "react";
import styled from "styled-components";

const MeditationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const MeditationContent = styled.div`
  max-width: 600px;
`;

const MeditationTitle = styled.h2`
  font-size: 1.8rem;
  color: #333333;
  margin-bottom: 1rem;
`;

const MeditationGuide = styled.p`
  font-size: 1.1rem;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const MeditationBenefits = styled.ul`
  list-style: disc;
  text-align: left;
  padding-left: 1rem;
  margin-bottom: 2rem;

  li {
    font-size: 1.1rem;
    color: #555555;
    margin-bottom: 1rem;
  }
`;

const MeditationImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Meditation = () => {
  return (
    <MeditationContainer>
      <MeditationContent>
        <MeditationTitle>Meditation Guide</MeditationTitle>
        <MeditationImage
          src="data:image/jpeg;base64,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"
          alt="Meditation"
        />

        <MeditationGuide>
          Meditation is a practice where an individual uses a technique such as
          mindfulness, focusing the mind on a particular object, thought, or
          activity to train attention and awareness, and achieve a mentally
          clear and emotionally calm and stable state.
        </MeditationGuide>
        <MeditationBenefits>
          <li>Reduced stress and anxiety</li>
          <li>Improved focus and concentration</li>
          <li>Enhanced self-awareness</li>
          <li>Increased emotional well-being</li>
          <li>Better sleep quality</li>
        </MeditationBenefits>
      </MeditationContent>
    </MeditationContainer>
  );
};

export default Meditation;
