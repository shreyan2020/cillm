const sandboxTaskTemplate = {
  id: "sandbox_task", // Each sandbox task will have a unique ID
  name: "Sandbox Task",
  missionStatement: "This is a sandbox task where you can play around with the features before starting your main task.",
  instructions: "Feel free to play around with the features before you begin your new task.",
  tutorial: `<p>Feel free to play around with the features before you begin your new task.</p>
    <p>Here are some steps you may want to go through:</p>
    <h3>Below this type @ai followed by some text to ask AI to write piece of text</h3>
    <h3>Select the paragraph, right-click, and select <b>Generate variation</b>.</h3>
    <h3>Select the paragraph, right-click, and select <b>Generate continuation</b>.</h3>
    <h3>Select all the recipes.</h3>
     
    <p><b>Note:</b> Instructions can be found in the top right corner.</p>
    <p><b>Note:</b> Click save and close once you complete the tasks. If you do complete the steps main task cannot begin.</p>`,
  questionSet: [],
};

const tasksConfig = {
  tasks: [
    {
      id: "SV_er3uBhbIgrGyQ1E",
      name: "Task One",
      missionStatement: "At World Wildlife Fund (WWF), our mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth. With the support of more than five million members worldwide, we work in more than 100 countries to protect species and their habitats, advocate for sustainable policies, and educate communities about the importance of biodiversity. Our efforts last year helped protect critical habitats for endangered species, like tigers and rhinos, and reduced human impact on the environment. Together, we can build a future where people live in harmony with nature.",
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
      id: "SV_by0FLSWM0gVjYuW",
      name: "Task Two",
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
    "sandbox_task_1", "SV_er3uBhbIgrGyQ1E", // Sandbox task before Task One
    "sandbox_task_2", "SV_by0FLSWM0gVjYuW"  // Sandbox task before Task Two
  ],
};

// Generate sandbox tasks with unique IDs
const sandboxTasks = tasksConfig.order.filter(id => id.startsWith("sandbox_task")).map((id, index) => ({
  ...sandboxTaskTemplate,
  id: `sandbox_task_${index + 1}`,
  name: `Sandbox Task ${index + 1}`,
}));

// Merge sandbox tasks with main tasks
tasksConfig.tasks = [...sandboxTasks, ...tasksConfig.tasks];

export default tasksConfig;
