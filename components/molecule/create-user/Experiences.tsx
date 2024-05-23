import React from "react";

type Experience = {
  id: number;
  title: string;
  company: string;
  duration: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "ABC Company",
    duration: "Jan 2020 - Present",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "XYZ Inc.",
    duration: "Mar 2018 - Dec 2019",
  },
  // Add more experiences here...
];

const Experiences: React.FC = () => {
  return (
    <div>
      <h2>Experiences</h2>
      {experiences.map((experience) => (
        <div key={experience.id}>
          <h3>{experience.title}</h3>
          <p>{experience.company}</p>
          <p>{experience.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
