import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchSectionsByGoalId } from "../../../../../api/sectionsService";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Topics from "../topics/Topics";

const SectionForGoals = () => {
  
  const { goalId } = useParams();

  const [sections, setSections] = useState([]);
  const [expandedSectionIds, setExpandedSectionIds] = useState([]);

  useEffect(() => {
    try {
      fetchSectionsByGoalId(goalId)
        .then((response) => setSections(response.data))
        .catch((error) => console.error("Error fetching sections:", error));
    } catch (error) {
      console.error("ERROR  fetching sections", error);
    }
  }, [goalId]);

  const toggleSection = (id) => {
    const newExpandedSections = expandedSectionIds.includes(id)
      ? expandedSectionIds.filter((sectionId) => sectionId !== id)
      : [...expandedSectionIds, id];
    setExpandedSectionIds(newExpandedSections);
  };

  const breadcrumbPaths = [
    { name: 'Главная', link: '/admin' },
    { name: 'Цели', link: '/admin/goals' },
    { name: 'Раздел', link: `/admin/goals/sections/${goalId}` }
  ];

  return (
    <div>
      <div><Breadcrumb paths={breadcrumbPaths} />
      </div>
      <div className="w-full text-left mt-4">
        {sections.map((section) => (
          <div key={section.id} style={{ marginLeft: "20px" }}>
            <div onClick={() => toggleSection(section.id)}>
              {expandedSectionIds.includes(section.id) ? "[-]" : "[+]"}{" "}
              {section.name}
            </div>
            {expandedSectionIds.includes(section.id) && (
              <Topics sectionId={section.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionForGoals;
