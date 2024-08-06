// taskConfigV2.js

const tasksConfigV2 = {
    tasks: [
      {
        id: "sandbox_task_1_esp",
        name: "Sandbox Task 1 (Español)",
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
        id: "SV_er3uBhbIgrGyQ1E_esp",
        name: "Tarea Uno (Español) - WWF",
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
      {
        id: "SV_by0FLSWM0gVjYuW_esp",
        name: "Tarea Dos (Español) - LiveStrong",
        missionStatement: "En la Fundación Livestrong, nuestra misión es mejorar la vida de las personas afectadas por el cáncer ahora. Empoderamos a los pacientes y sobrevivientes para que tomen el control de su camino contra el cáncer y proporcionamos servicios de apoyo que abordan los desafíos financieros, emocionales y físicos del cáncer. El año pasado, ayudamos a miles de personas con servicios de navegación personalizados, otorgamos becas para soluciones innovadoras de atención del cáncer y abogamos por políticas para mejorar los estándares de atención del cáncer. Nuestra visión es inspirar y empoderar a todos los afectados por el cáncer, y nos esforzamos por ser una fuente de fortaleza y resistencia para la comunidad del cáncer.",
        instructions: "Por favor, resuma la importancia de la investigación del cáncer y los servicios de apoyo al paciente.",
        tutorial: "La investigación del cáncer y los servicios de apoyo requieren un financiamiento significativo para mejorar los resultados y la calidad de vida de los pacientes.",
        questionSet: [
          {
            question: "¿Cuál es un enfoque principal de la Fundación Livestrong?",
            options: ["Mejorar la eficiencia energética", "Apoyar a pacientes y sobrevivientes de cáncer", "Aumentar el uso de combustibles fósiles"],
            correctAnswer: "Apoyar a pacientes y sobrevivientes de cáncer",
          },
          {
            question: "¿Cuál de los siguientes describe mejor el objetivo de la Fundación Livestrong?",
            options: ["Aumentar el número de hospitales", "Empoderar y apoyar a las personas afectadas por el cáncer", "Promover los viajes globales"],
            correctAnswer: "Empoderar y apoyar a las personas afectadas por el cáncer",
          },
        ],
      },
    ],
    order: [
      "sandbox_task_1_esp",
      "SV_er3uBhbIgrGyQ1E_esp", // Spanish main task for WWF
      "sandbox_task_2_esp",
      "SV_by0FLSWM0gVjYuW_esp", // Spanish main task for LiveStrong
    ],
  };
  
  export default tasksConfigV2;
  