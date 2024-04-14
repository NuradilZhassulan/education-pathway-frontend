import React, { useState, useEffect } from "react";
import { fetchSubtopicsByTopicId } from "../../../../../api/subtopicsService";

const Subtopics = ({ topicId }) => {
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    fetchSubtopicsByTopicId(topicId)
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
