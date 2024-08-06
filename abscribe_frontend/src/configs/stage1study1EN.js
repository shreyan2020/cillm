// taskConfigV3.js

const stage1study1EN = {
  redirectCode: "C1CYRPR7",
    tasks: [
      {
        id: "sandbox_task_1_eng",
        name: "Tutorial",
        hoverText: "Hover over the cards below to see how the Abscribe tool can assist you with your writing.",
        noteText: "Now click the button below to begin your hands-on experience. Note that this instruction will be available during your task at the top left hand corner.",
        missionStatement: "This is a tutorial where you can play around with the features of the tool before starting your main task. We encourage you to get familiar with the tool to ensure your writing can utilize full capabilities of the tool.",
        instructions: "Feel free to play around with the features before you begin your new task.",
        tutorial: `
          <p>Feel free to play around with the features before you begin your new task.</p>
          <p>Here are some steps you may want to go through:</p>
          <h3>Below this type @ai followed by some text to ask AI to write a piece of text</h3>
          <h3>Once AI generated the paragraph select the paragraph, right-click, and select <b>Create variation</b>.</h3>
          <h3>Click different modification one by one and observe how your original text is modified</h3>
          <h3>Finally type an incomplete sentence and right-click, and select <b>Create continuation</b>. See how AI will complete your sentence</h3>
          
          <p><b>Note:</b> Instructions can be found in the top left corner.</p>
          <p><b>Note:</b> Click save and continue once you have explored the tool's features.</p>`,
        questionSet: [],
      },
      {
        id: "main_task_1",
        questionnaire_id: "SV_6sAAZH7qj0jogRw", 
        hoverText: "Mission Statement:",
        name: "Task One: This is the main task. Read the mission statement of the charity (WWF) carefully and then utilize the Abscribe tool to write your advertisement",
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
      "sandbox_task_1_eng",
      "main_task_1", // English main task for WWF
    //   "sandbox_task_2_eng",
    //   "main_task_2", // English main task for LiveStrong
    ],
  };
  
  export default stage1study1EN;
  