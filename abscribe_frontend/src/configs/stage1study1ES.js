// taskConfigV3.js

const stage1study1ES = {
  tasks: [
    {
      id: "sandbox_task_1_esp",
      name: "Tutorial",
      hoverText: "Pasa el cursor sobre las tarjetas a continuación para ver cómo la herramienta Abscribe puede ayudarte con tu escritura.",
      noteText: "Ahora haz clic en el botón de abajo para comenzar tu experiencia práctica. Ten en cuenta que esta instrucción estará disponible durante tu tarea en la esquina superior izquierda.",
      missionStatement: "Este es un tutorial donde puedes experimentar con las características de la herramienta antes de comenzar tu tarea principal. Te animamos a familiarizarte con la herramienta para asegurarte de que tu escritura pueda aprovechar todas sus capacidades.",
      instructions: "Siéntete libre de experimentar con las funciones antes de comenzar tu nueva tarea.",
      tutorial: `
        <p>Siéntete libre de experimentar con las funciones antes de comenzar tu nueva tarea.</p>
        <p>Aquí hay algunos pasos que puedes seguir:</p>
        <h3>Debajo de esto escribe @ai seguido de algún texto para pedirle a la IA que escriba un fragmento de texto</h3>
        <h3>Una vez que la IA haya generado el párrafo, selecciona el párrafo, haz clic derecho y selecciona <b>Crear variación</b>.</h3>
        <h3>Haz clic en diferentes modificaciones una por una y observa cómo se modifica tu texto original</h3>
        <h3>Finalmente, escribe una oración incompleta, haz clic derecho y selecciona <b>Crear continuación</b>. Ve cómo la IA completará tu oración</h3>
        
        <p><b>Nota:</b> Las instrucciones se encuentran en la esquina superior izquierda.</p>
        <p><b>Nota:</b> Haz clic en guardar y continuar una vez que hayas explorado las características de la herramienta.</p>`,
      questionSet: [],
    },
    {
      id: "main_task_1",
      questionnaire_id: "SV_6ybTt5FPNtfsYKy", 
      hoverText: "Declaración de Misión:",
      name: "Tarea Uno: Esta es la tarea principal. Lee atentamente la declaración de misión de la organización benéfica (WWF) y luego utiliza la herramienta Abscribe para escribir tu anuncio.",
      missionStatement: "La misión del Fondo Mundial para la Naturaleza (WWF) es conservar la naturaleza y reducir las amenazas más apremiantes a la diversidad de la vida en la Tierra. Nuestra visión es construir un futuro en el que las personas vivan en armonía con la naturaleza. Nuestro objetivo es salvar un planeta rico en biodiversidad reconciliando las necesidades de los seres humanos con las de otras especies. Nos esforzamos por practicar una conservación humana, inculcando una reverencia por la naturaleza y equilibrándola con una creencia en el potencial humano. Desde las comunidades locales hasta las organizaciones globales, inspiramos y apoyamos a aquellos que promueven la causa de la conservación. Como voz para las criaturas sin voz de nuestro mundo, dedicamos nuestros talentos, conocimientos y pasión a enriquecer la vida, el espíritu y el asombro de la naturaleza.",
      instructions: "Por favor, escribe un ensayo sobre la importancia de la biodiversidad y la conservación de la vida silvestre.",
      tutorial: "Ahora escribe tu anuncio de caridad aquí (puedes eliminar este texto)",
      questionSet: [
        {
          question: "¿Cuál es un objetivo principal del WWF?",
          options: ["Entretenimiento", "Crecimiento económico", "Conservación de la biodiversidad"],
          correctAnswer: "Conservación de la biodiversidad",
        },
        {
          question: "¿Cuál de las siguientes es una iniciativa del WWF?",
          options: ["Caza de vida silvestre", "Promoción de políticas sostenibles", "Espectáculos de entretenimiento con animales"],
          correctAnswer: "Promoción de políticas sostenibles",
        },
      ],
    },    
  ],
  order: [
    "sandbox_task_1_esp",
    "main_task_1", // Tarea principal en español para WWF
  //   "sandbox_task_2_esp",
  //   "main_task_2", // Tarea principal en español para LiveStrong
  ],
};

export default stage1study1ES;
