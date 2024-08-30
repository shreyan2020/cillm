

const NoLLMEN = {
    redirectCode: "CYK6DNUT",
      tasks: [
        {
          id: "main_task_1",
          questionnaire_id: "SV_6sAAZH7qj0jogRw", 
          hoverText: "Mission Statement:",
          name: "Task One: This is the main task. Read the mission statement of the charity (WWF) carefully and then utilize the AI powered Abscribe tool to write your advertisement",
          missionStatement: "The mission of the World Wildlife Fund (WWF) is to conserve nature and reduce the most pressing threats to the diversity of life on Earth. Our vision is to build a future in which people live in harmony with nature. We aim to save a planet rich with biodiversity by reconciling the needs of human beings with the needs of other species. We strive to practice humane conservation, instilling a reverence for nature and balancing it with a belief in human potential. From local communities to global organizations, we inspire and support those advancing the cause of conservation. As a voice for the voiceless creatures of our world, we dedicate our talents, knowledge, and passion to enriching life, spirit, and the wonder of nature.",
          instructions: "Please write an essay on the importance of biodiversity and wildlife conservation.",
          tutorial: "Now write your charity advertisement here (you can remove this text)",
          questionSet: [
            {
              question: "What is a primary goal of WWF?",
              options: ["Entertainment", "Economic growth", "Biodiversity conservation"],
              correctAnswer: "Biodiversity conservation",
            },
            {
              question: "Which of the following is an initiative of WWF?",
              options: ["Wildlife hunting", "Sustainable policies advocacy", "Animal entertainment shows"],
              correctAnswer: "Sustainable policies advocacy",
            },
          ],
        },    
      ],
      order: [
        // "sandbox_task_1_eng",
        "main_task_1", // English main task for WWF
      //   "sandbox_task_2_eng",
      //   "main_task_2", // English main task for LiveStrong
      ],
    };
    
    export default NoLLMEN;
    