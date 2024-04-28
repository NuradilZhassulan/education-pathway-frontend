const prepareChartData = (subtopics, topics, sections, chartType) => {
  // Считаем количество микротем в каждом разделе
  const sectionSubtopicCounts = sections.map((section) => {
    // Находим все темы в этом разделе
    const topicsInSection = topics.filter(
      (topic) => topic.section_id === section.id
    );
    // Находим все микротемы в этих темах
    const subtopicsInSection = subtopics.filter((subtopic) =>
      topicsInSection.some((topic) => topic.id === subtopic.topic_id)
    );
    // Считаем количество известных микротем
    const knownSubtopics = subtopicsInSection.filter(
      (subtopic) => subtopic.known
    ).length;
    return {
      sectionId: section.id,
      sectionName: section.name,
      total: subtopicsInSection.length,
      known: knownSubtopics,
    };
  });

  // Создаем данные для графика
  const labels = sectionSubtopicCounts.map((item) => item.sectionName);
  const data = sectionSubtopicCounts.map((item) => {
    if (chartType === "radar") {
      // Для радарной диаграммы будем использовать процент знания микротем
      return item.total > 0 ? (item.known / item.total) * 100 : 0;
    } else {
      // Для полярной диаграммы количество известных микротем
      return item.known;
    }
  });

  // Цвета для графика
  const backgroundColor = sectionSubtopicCounts.map(
    () => "rgba(75,192,192,0.5)"
  );

  return {
    labels,
    datasets: [
      {
        label: "Знание микротем",
        data,
        backgroundColor,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
};

export default prepareChartData;
