// taskConfigV3.js

const tasksConfigV3 = {
  tasks: [
    {
      id: "sandbox_task_1_eng",
      name: "Tutorial",
      missionStatement: "This is a tutorial where you can play around with the features of the tool before starting your main task. We encourage you to get familiar with the tool to ensure your writing can utilize full capabilities of the tool.",
      instructions: "Feel free to play around with the features before you begin your new task.",
      tutorial: `
        <p>Feel free to play around with the features before you begin your new task.</p>
        <p>Here are some steps you may want to go through:</p>
        <h3>Below this type @ai followed by some text to ask AI to write a piece of text</h3>
        <h3>Select the paragraph, right-click, and select <b>Create variation</b>.</h3>
        <h3>Select the paragraph, right-click, and select <b>Create continuation</b>.</h3>
        <h3>Select all the recipes.</h3>
        <p><b>Note:</b> Instructions can be found in the top left corner.</p>
        <p><b>Note:</b> Click save and continue once you have explored the tool's features.</p>`,
      questionSet: [],
    },
    {
      id: "sandbox_task_2_eng",
      name: "Sandbox Task 2 (English)",
      missionStatement: "This is a sandbox task where you can play around with the features before starting your main task.",
      instructions: "Feel free to play around with the features before you begin your new task.",
      tutorial: `
        <p>Feel free to play around with the features before you begin your new task.</p>
        <p>Here are some steps you may want to go through:</p>
        <h3>Below this type @ai followed by some text to ask AI to write a piece of text</h3>
         <h3>Select the paragraph, right-click, and select <b>Create variation</b>.</h3>
        <h3>Select the paragraph, right-click, and select <b>Create continuation</b>.</h3>
        <h3>Select all the recipes.</h3>
        <p><b>Note:</b> Instructions can be found in the top left corner.</p>
        <p><b>Note:</b> Click save and continue once you have explored the tool's features.</p>`,
      questionSet: [],
    },
    {
      id: "main_task_1",
      questionnaire_id: "SV_6sAAZH7qj0jogRw",
      name: "Task One (English) - WWF: This is the main task. Read the mission statement of the charity carefully and then utilize the Abscribe tool to write your advertisement",
      missionStatement: "The mission of the World Wildlife Fund (WWF) is to conserve nature and reduce the most pressing threats to the diversity of life on Earth. Our vision is to build a future in which people live in harmony with nature. We aim to save a planet rich with biodiversity by reconciling the needs of human beings with the needs of other species. We strive to practice humane conservation, instilling a reverence for nature and balancing it with a belief in human potential. From local communities to global organizations, we inspire and support those advancing the cause of conservation. As a voice for the voiceless creatures of our world, we dedicate our talents, knowledge, and passion to enriching life, spirit, and the wonder of nature.",
      instructions: "Please write an essay on the importance of biodiversity and wildlife conservation.",
      tutorial: "Supporting wildlife conservation helps maintain the balance of our ecosystems.",
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
    {
      id: "main_task_2",
      questionnaire_id: "SV_6sAAZH7qj0jogRw",
      name: "Task Two (English) - LiveStrong",
      missionStatement: "At the Livestrong Foundation, our mission is to improve the lives of people affected by cancer now. We empower patients and survivors to take control of their cancer journey and provide support services that address the financial, emotional, and physical challenges of cancer. Last year, we assisted thousands of individuals with personalized navigation services, provided grants for innovative cancer care solutions, and advocated for policies to improve cancer care standards. Our vision is to inspire and empower everyone affected by cancer, and we strive to be a source of strength and resilience for the cancer community.",
      instructions: "Please summarize the importance of cancer research and patient support services.",
      tutorial: "Cancer research and support services require significant funding to improve patient outcomes and quality of life.",
      questionSet: [
        {
          question: "What is a primary focus of the Livestrong Foundation?",
          options: ["Improving energy efficiency", "Supporting cancer patients and survivors", "Increasing fossil fuel use"],
          correctAnswer: "Supporting cancer patients and survivors",
        },
        {
          question: "Which of the following best describes the goal of the Livestrong Foundation?",
          options: [
            "To increase the number of hospitals",
            "To empower and support people affected by cancer",
            "To promote global travel"
          ],
          correctAnswer: "To empower and support people affected by cancer",
        },
      ],
    },
  ],
  order: [
    "sandbox_task_1_eng",
    "main_task_1", // English main task for WWF
    "sandbox_task_2_eng",
    "main_task_2", // English main task for LiveStrong
  ],
};

export default tasksConfigV3;
