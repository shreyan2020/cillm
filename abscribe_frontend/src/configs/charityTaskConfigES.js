const charityTaskConfigES = {
  config: {
    consentText: `
      <p>
        Somos un grupo de investigadores de la Universidad Técnica de Delft en los Países Bajos. En este proyecto de investigación, nuestro objetivo es investigar la persuasión de un texto a través del comportamiento de donación. Por lo tanto, te invitamos a participar en nuestro estudio de investigación.
      </p>
      <p>
        La siguiente tarea es parte del proyecto de investigación descrito anteriormente. Al acceder a la aplicación web, se te presentará un anuncio de caridad y, posteriormente, se te pedirá que dones una cantidad y respondas algunas preguntas.
      </p>
      <p>
        La realización de estas tareas no requiere ningún equipo específico. Tu participación en esta tarea es completamente voluntaria y puedes retirarte en cualquier momento.
      </p>
      <p>
        Recopilaremos tu uso y tu experiencia con la herramienta. Esto incluye:
      </p>
      <ul>
        <li>Información personal: edad y género</li>
        <li>Dominio del idioma</li>
        <li>Cantidad donada</li>
        <li>Respuestas a los cuestionarios</li>
      </ul>
      <p>
        No recopilamos ningún dato aparte de la información descrita y mantendremos tu información confidencial. Todos los datos se almacenan en un formato electrónico protegido por contraseña. Ten en cuenta que los datos que recopilamos con esta tarea podrían publicarse en forma anonimizada más adelante. Un conjunto de datos anonimizado incluiría las respuestas que proporcionas en esta tarea, pero no información personal (por ejemplo, tu ID de Prolific), por lo que las respuestas no serán rastreables hasta ti.
      </p>    
      <p>
        Al hacer clic en “Consiento” en la parte inferior de esta página, confirmas que has leído, comprendido y das tu consentimiento para la información anterior.
      </p>
      <p>
        Nota: Puedes salir de la tarea en cualquier momento. Esto implicará la revocación de tu consentimiento y, posteriormente, todos tus datos serán eliminados de nuestras bases de datos.
      </p>
    `,
    time: '15 minutos',
    language: 'ESP',
    questions: {
      donation: "¿Cuánto te gustaría donar a la caridad?",
      feedback: "¿Qué aspecto te gustó del anuncio de la caridad?",
      adSource: "¿Quién crees que escribió el anuncio?",
      recipeUsed: "¿Qué llamó tu atención en el anuncio?",
    },
    options: {
      adSource: {
        ai: "IA",
        human: "Humano",
      },
      recipeUsed: [
        "Una historia positiva sobre cómo las donaciones han ayudado a otros.",
        "Una historia de advertencia sobre lo que puede suceder sin donaciones.",
        "Números que muestran el impacto positivo de las donaciones.",
        "Números que destacan las consecuencias negativas de no donar.",
        "Cómo las donaciones pueden marcar la diferencia de inmediato.",
        "Cómo las donaciones ayudarán a largo plazo.",
      ],
    },
    labels: {
      donationAmount: "Cantidad de Donación",
      submit: "Enviar",
      instruction: "Por favor, lee el siguiente texto y decide tu donación:",
      errorMessage: "Hubo un error al enviar tus respuestas de la encuesta. Por favor, inténtalo de nuevo.",
    },
    jobDescription: {
      headers: {
        taskDetails: "Detalles de la Tarea",
        eligibilityCriteria: "Criterios de Elegibilidad",
        compensation: "Compensación",
        qualityLevel: "Nivel de Calidad",
        bonusAmount: "Cantidad de Bonificación",
        estimatedTime: "Tiempo Estimado",
      },
      taskDetails: `
        <p>Después de hacer clic en siguiente, se te presentará un anuncio de caridad. Primero, lee el texto del anuncio cuidadosamente. Se te proporciona una cantidad de €1.5 para donar a la caridad. Puedes quedártelo para ti o donarlo completamente o en cualquier cantidad que consideres adecuada.</p>
        <p>Por ejemplo, si eliges donar €1.5, entonces solo recibirás €1 por completar la tarea. Si donas €1, entonces recibirás €1 + (€1.5 - €1) = €1.5, y así sucesivamente.</p>
        <p>Después de donar, se te pedirá que respondas algunas preguntas sobre el texto.</p>
      `,
      eligibilityCriteria: `
        <li>Debes tener 18 años o más.</li>
        <li>Debes ser fluido en español.</li>
      `,
      compensation: `
        <p>Se te compensará según la cantidad que elijas quedarte después de tu donación. El pago base por la tarea es de €1.</p>
      `,
      bonusTable: [
        { level: "Finalización de la Tarea", amount: "€1.0" },
        { level: "Donación Restante", amount: "Varía según la cantidad donada" },
      ],
      estimatedTime: `
        <p>Se espera que la tarea tome aproximadamente 5 minutos para completarse.</p>
      `,
    },
  },
};

export default charityTaskConfigES;
