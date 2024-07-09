const tasksConfig = {
    tasks: [
      {
        id: "SV_er3uBhbIgrGyQ1E",
        name: "Task One",
        missionStatement: "At Helping Hands Food Bank, our mission is to ensure that every individual and family in the Netherlands has access to nutritious food, free from the fear of hunger and the challenges of food insecurity. In the pursuit of this mission, we are proud to have redistributed over 5 million meals last year alone, thanks to the generosity of our donors and the dedication of our volunteers. We strive to mobilize the power of our community to end hunger through food distribution, education, and advocacy. Our efforts focus on sustainability, with a commitment to reducing food waste by rescuing surplus food equivalent to 2,000 tons of produce that would otherwise go to landfills. By providing support that upholds dignity, we nurture hope and foster self-sufficiency among all members of our society.",
        instructions: "Please write an essay on climate change.",
        tutorial: "In this climate we need to donate money",
        questionSet: [
          {
            question: "What is the primary cause of climate change?",
            options: ["Greenhouse gases", "Deforestation", "Industrialization"],
            correctAnswer: "Greenhouse gases",
          },
          {
            question: "Which of the following is an effect of climate change?",
            options: ["Rising sea levels", "Increased forest growth", "Reduced solar radiation"],
            correctAnswer: "Rising sea levels",
          },
        ],
      },
      {
        id: "SV_by0FLSWM0gVjYuW",
        name: "Task Two",
        missionStatement: "Complete the second task.",
        instructions: "Please summarize the importance of renewable energy.",
        tutorial: "In this climate we need to donate money",
        questionSet: [
          {
            question: "Which is a renewable energy source?",
            options: ["Coal", "Wind", "Natural Gas"],
            correctAnswer: "Wind",
          },
          {
            question: "Which of the following best describes renewable energy?",
            options: [
              "Energy that can be replenished naturally",
              "Energy that is unlimited",
              "Energy from fossil fuels"
            ],
            correctAnswer: "Energy that can be replenished naturally",
          },
        ],
      },
    ],
    order: ["SV_er3uBhbIgrGyQ1E", "SV_by0FLSWM0gVjYuW"], // Task order
  };
  // https://tudelft.fra1.qualtrics.com/jfe/form/SV_er3uBhbIgrGyQ1E
  // https://tudelft.fra1.qualtrics.com/jfe/form/SV_by0FLSWM0gVjYuW
  export default tasksConfig;
  