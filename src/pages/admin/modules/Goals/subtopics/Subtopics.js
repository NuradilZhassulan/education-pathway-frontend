import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchSubtopicsByTopicIdAndGoalId } from "../../../../../api/subtopicsService";

const Subtopics = ({ topicId }) => {
  const { goalId } = useParams();
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    fetchSubtopicsByTopicIdAndGoalId(topicId, goalId)
      .then((response) => setSubtopics(response.data))
      .catch((error) => console.error("Error fetching subtopics:", error));
  }, [topicId]);

  return (
    <ul style={{ marginLeft: "60px" }}>
      {subtopics.map((subtopic) => (
        <li key={subtopic.id}>{subtopic.name}</li>
      ))}
    </ul>
  );
};

export default Subtopics;
