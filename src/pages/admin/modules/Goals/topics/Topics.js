import React, { useState, useEffect } from "react";
import { fetchTopicsBySectionId } from "../../../../../api/topicsService";
import Subtopics from "../subtopics/Subtopics";

const Topics = ({ sectionId }) => {
  const [topics, setTopics] = useState([]);
  const [expandedTopicIds, setExpandedTopicIds] = useState([]);

  useEffect(() => {
    fetchTopicsBySectionId(sectionId)
      .then((response) => setTopics(response.data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, [sectionId]);

  const toggleTopic = (id) => {
    const newExpandedTopics = expandedTopicIds.includes(id)
      ? expandedTopicIds.filter((topicId) => topicId !== id)
      : [...expandedTopicIds, id];
    setExpandedTopicIds(newExpandedTopics);
  };

  return (
    <ul style={{ marginLeft: "40px" }}>
      {topics.map((topic) => (
        <li key={topic.id}>
          <div onClick={() => toggleTopic(topic.id)}>
            {expandedTopicIds.includes(topic.id) ? "[-]" : "[+]"} {topic.name}
          </div>
          {expandedTopicIds.includes(topic.id) && (
            <Subtopics topicId={topic.id} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Topics;
