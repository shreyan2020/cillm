const charityTaskConfigES = {
  config: {
    redirectCode: "C127DB3G",
    consentText: `
      <p>
        Somos un grupo de investigadores de la Universidad Técnica de Delft en los Países Bajos y la Universidad de Göttingen. En este proyecto de investigación, nuestro objetivo es investigar la persuasión de un texto a través del comportamiento de donación. Por ello, te invitamos a participar en nuestro estudio de investigación.
      </p>
      <p>
        La siguiente tarea forma parte del proyecto de investigación descrito anteriormente. Al acceder a la aplicación web, se te presentará un anuncio de una organización benéfica y, posteriormente, se te pedirá que dones una cantidad y respondas algunas preguntas.
      </p>
      <p>
        La realización de estas tareas no requiere ningún equipo específico. Tu participación en esta tarea es completamente voluntaria, y puedes retirarte en cualquier momento.
      </p>
      <p>
        Recogeremos tu uso y tu experiencia con la herramienta. Esto incluye:
      </p>
      <ul>
        <li>Información personal: edad y género</li>
        <li>Competencia lingüística</li>
        <li>Cantidad donada</li>
        <li>Respuestas de los cuestionarios</li>
      </ul>
      <p>
        No recopilamos ningún dato más allá de la información descrita, y mantendremos tu información confidencial. Todos los datos se almacenan en un formato electrónico protegido con contraseña. Ten en cuenta que los datos que recojamos con esta tarea podrían publicarse más adelante de forma anónima. Dicho conjunto de datos anonimizados incluiría las respuestas que proporciones en esta tarea, pero no información personal (por ejemplo, tu ID de Prolific), de modo que las respuestas no podrán rastrearse hasta ti.
      </p>    
      <p>
        Al hacer clic en “Acepto” en la parte inferior de esta página, confirmas que has leído, entendido y aceptas la información anterior.
      </p>
      <p>
        Nota: Puedes salir de la tarea en cualquier momento. Esto implicará revocar tu consentimiento, y posteriormente, todos tus datos serán eliminados de nuestras bases de datos. Si deseas contactar con los investigadores después de esta tarea, puedes enviar un correo electrónico a s.biswas@tudelft.nl.
      </p>
    `,
    time: '15 minutos',
    language: 'ESP',
    likertScale: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
    labels: {
      instruction: "Por favor, lee el siguiente texto y decide tu donación: Ten en cuenta que se te proporciona un máximo de 1.5 euros para donar; lo que decidas no donar se añadirá a tu compensación (1 euro).",
      submit: "Enviar",
    },
    questions: {
      donation: "¿Cuánto te gustaría donar a la organización benéfica?",
      emotionalAppeal: {
        header: "Atractivo Emocional",
        options: {
        EA1: "El anuncio me hizo sentir emocionalmente conectado con la causa.",
        EA2: "Sentí una fuerte sensación de empatía por la causa presentada en el anuncio.",
        EA3: "El anuncio evocó sentimientos de compasión y un deseo de ayudar."
        }
      },
      informationAwareness: {
        header: "Información y Conciencia",
        options: {
        IA1: "El anuncio proporcionó información útil sobre la organización.",
        IA2: "Me siento más informado sobre el trabajo de la organización después de ver el anuncio.",
        IA3: "El anuncio aumentó mi comprensión del impacto que tiene la organización."
        }
      },
      behavioralIntentions: {
        header: "Intenciones de Comportamiento",
        options: {
        BI2: "¿Qué tan probable es que compartas este anuncio o hables sobre la causa con otros?",
        BI3: "¿Qué tan probable es que busques más información sobre la organización?"
        }
      },
      feedbackPositive: "¿Qué aspecto te gustó del anuncio de la organización benéfica? (Si nada, escribe NA)",
      feedbackNegative: "¿Qué aspecto NO te gustó del anuncio de la organización benéfica? (Si nada, escribe NA)",
      adSource: "¿Quién crees que escribió el anuncio?",
      recipeUsed: "¿Qué te llamó más la atención en el anuncio?",
      validattionMessage: "Esta pregunta es obligatoria.",
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
        "Cómo las donaciones pueden hacer una diferencia inmediata.",
        "Cómo las donaciones ayudarán a largo plazo.",
        "Ninguna de las anteriores",
      ],
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
        <p>Después de hacer clic en "Siguiente", verás un anuncio de una organización benéfica. Por favor, toma un momento para leer atentamente el texto del anuncio. Se te darán 1.5 euros, los cuales puedes elegir quedarte para ti, o donar una parte o la totalidad del monto como mejor te parezca.</p>
        <!-- Detalles restantes de la tarea -->
      `,
      eligibilityCriteria: `
        <li>Debes tener 18 años o más.</li>
        <li>Debes tener fluidez en inglés.</li>
      `,
      compensation: `
        <p>El pago base de la tarea es de 1 euro. Además, recibirás una compensación basada en la cantidad que decidas quedarte después de hacer tu donación.</p>
      `,
      bonusTable: [
        { level: "Finalización de la Tarea", amount: "€1.0" },
        { level: "Dotación Restante", amount: "Varía según la cantidad donada" },
      ],
      estimatedTime: `
        <p>Se espera que la tarea tome aproximadamente 5 minutos para completarse.</p>
      `,
    },
  },
};

export default charityTaskConfigES;