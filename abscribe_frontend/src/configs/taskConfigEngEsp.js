// taskConfigV1.js

const tasksConfigV1 = {
    tasks: [
      {
        id: "sandbox_task_1_eng",
        name: "Sandbox Task 1 (English)",
        missionStatement: "This is a sandbox task where you can play around with the features before starting your main task.",
        instructions: "Feel free to play around with the features before you begin your new task.",
        tutorial: `
          <p>Feel free to play around with the features before you begin your new task.</p>
          <p>Here are some steps you may want to go through:</p>
          <h3>Below this type @ai followed by some text to ask AI to write a piece of text</h3>
          <h3>Select the paragraph, right-click, and select <b>Generate variation</b>.</h3>
          <h3>Select the paragraph, right-click, and select <b>Generate continuation</b>.</h3>
          <h3>Select all the recipes.</h3>
          <p><b>Note:</b> Instructions can be found in the top right corner.</p>
          <p><b>Note:</b> Click save and close once you complete the tasks. If you do complete the steps, the main task cannot begin.</p>`,
        questionSet: [],
      },
      {
        id: "sandbox_task_2_esp",
        name: "Sandbox Task 2 (Español)",
        missionStatement: "Esta es una tarea de prueba donde puede jugar con las funciones antes de comenzar su tarea principal.",
        instructions: "Siéntase libre de jugar con las funciones antes de comenzar su nueva tarea.",
        tutorial: `
          <p>Siéntase libre de jugar con las funciones antes de comenzar su nueva tarea.</p>
          <p>Aquí hay algunos pasos que puede seguir:</p>
          <h3>Debajo de esto escriba @ai seguido de un texto para pedirle a la IA que escriba un texto</h3>
          <h3>Seleccione el párrafo, haga clic con el botón derecho y seleccione <b>Generar variación</b>.</h3>
          <h3>Seleccione el párrafo, haga clic con el botón derecho y seleccione <b>Generar continuación</b>.</h3>
          <h3>Seleccione todas las recetas.</h3>
          <p><b>Nota:</b> Las instrucciones se pueden encontrar en la esquina superior derecha.</p>
          <p><b>Nota:</b> Haga clic en guardar y cerrar una vez que complete las tareas. Si no completa los pasos, la tarea principal no puede comenzar.</p>`,
        questionSet: [],
      },
      {
        id: "SV_er3uBhbIgrGyQ1E",
        name: "Task One (English)",
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
        name: "Task One (Español)",
        missionStatement: "En el Fondo Mundial para la Naturaleza (WWF), nuestra misión es conservar la naturaleza y reducir las amenazas más apremiantes a la diversidad de la vida en la Tierra. Con el apoyo de más de cinco millones de miembros en todo el mundo, trabajamos en más de 100 países para proteger especies y sus hábitats, abogar por políticas sostenibles y educar a las comunidades sobre la importancia de la biodiversidad. Nuestros esfuerzos del año pasado ayudaron a proteger hábitats críticos para especies en peligro, como tigres y rinocerontes, y reducir el impacto humano en el medio ambiente. Juntos, podemos construir un futuro donde las personas vivan en armonía con la naturaleza.",
        instructions: "Por favor, escriba un ensayo sobre la importancia de la biodiversidad y la conservación de la vida silvestre.",
        tutorial: "Apoyar la conservación de la vida silvestre ayuda a mantener el equilibrio de nuestros ecosistemas.",
        questionSet: [
          {
            question: "¿Cuál es un objetivo principal de WWF?",
            options: ["Entretenimiento", "Crecimiento económico", "Conservación de la biodiversidad"],
            correctAnswer: "Conservación de la biodiversidad",
          },
          {
            question: "¿Cuál de las siguientes es una iniciativa de WWF?",
            options: ["Caza de vida silvestre", "Defensa de políticas sostenibles", "Espectáculos de entretenimiento animal"],
            correctAnswer: "Defensa de políticas sostenibles",
          },
        ],
      },
    ],
    order: [
      "sandbox_task_1_eng",
      "SV_er3uBhbIgrGyQ1E", // English main task
      "sandbox_task_2_esp",
      "SV_by0FLSWM0gVjYuW", // Spanish main task
    ],
  };
  
  export default tasksConfigV1;
  