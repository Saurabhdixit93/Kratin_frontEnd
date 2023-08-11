import React from "react";
import styled from "styled-components";
import Meditation from "./Meditiation";
import HeartbeatTracker from "./Hearbeat";
import GuidedExercise from "./Exercise";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const Section = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: calc(50% - 1rem);
  }

  @media (min-width: 1024px) {
    width: calc(33.33% - 1.5rem);
  }
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <SectionsContainer>
        <Section>
          <Meditation />
        </Section>
        <Section>
          <HeartbeatTracker />
        </Section>
        <Section>
          <>
            <GuidedExercise
              title="Gentle Stretching"
              description="Engage in gentle stretching exercises to improve flexibility and mobility."
              benefits={[
                "Reduced muscle tension and stiffness",
                "Improved joint range of motion",
                "Enhanced blood circulation",
                "Promoted relaxation and stress relief",
              ]}
            />
            <GuidedExercise
              title="Chair Yoga"
              description="Practice chair yoga to enhance balance and flexibility while seated."
              benefits={[
                "Increased flexibility and mobility",
                "Strengthened muscles",
                "Improved posture",
                "Relief from tension and fatigue",
              ]}
            />
            <GuidedExercise
              title="Breathing Exercises"
              description="Explore deep breathing techniques to promote relaxation and mindfulness."
              benefits={[
                "Reduced stress and anxiety",
                "Enhanced lung capacity",
                "Improved focus and mental clarity",
                "Promoted sense of calm",
              ]}
            />
          </>
        </Section>
      </SectionsContainer>
    </HomePageContainer>
  );
};

export default HomePage;
