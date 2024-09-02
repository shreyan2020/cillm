const charityTaskConfigES = {
  config: {
    consentText: `
      <p>
        Somos un grupo de investigadores de la Universidad Técnica de Delft en los Países Bajos y la Universidad de Goettingen. En este proyecto de investigación, nuestro objetivo es investigar la capacidad persuasiva de un texto a través del comportamiento de donación. Por lo tanto, estás invitado a participar en nuestro estudio de investigación.
      </p>
      <p>
        La siguiente tarea es parte del proyecto de investigación descrito anteriormente. Al acceder a la aplicación web, se te presentará un anuncio de caridad y, posteriormente, se te pedirá que dones una cantidad y respondas algunas preguntas.
      </p>
      <p>
        La realización de estas tareas no requiere ningún equipo específico. Tu participación en esta tarea es completamente voluntaria, y puedes retirarte en cualquier momento.
      </p>
      <p>
        Recogeremos tu uso y tu experiencia con la herramienta. Esto incluye:
      </p>
      <ul>
        <li>Información personal: edad y género</li>
        <li>Dominio del idioma</li>
        <li>Cantidad de la donación</li>
        <li>Respuestas a los cuestionarios</li>
      </ul>
      <p>
        No recopilamos ningún dato aparte de la información descrita, y mantendremos tu información confidencial. Todos los datos se almacenan en un formato electrónico protegido por contraseña. Ten en cuenta que los datos que recojamos con esta tarea podrían publicarse en forma anonimizada más tarde. Un conjunto de datos anonimizado incluiría las respuestas que proporciones en esta tarea, pero no información personal (por ejemplo, tu ID de Prolific), por lo que las respuestas no se podrán rastrear hasta ti.
      </p>    
      <p>
        Al hacer clic en "Consiento" al final de esta página, confirmas que has leído, entendido y aceptas la información anterior.
      </p>
      <p>
        Nota: Puedes abandonar la tarea en cualquier momento. Esto implicará la revocación de tu consentimiento, y, posteriormente, todos tus datos se eliminarán de nuestras bases de datos. Si deseas contactar a los investigadores después de esta tarea, puedes enviar un correo electrónico a s.biswas@tudelft.nl.
      </p>
    `,
    time: '15 minutos',
    language: 'ESP',
    likertScale: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
    labels: {
      instruction: "Por favor, lee el siguiente texto y decide tu donación: Ten en cuenta que se te proporciona un máximo de 1,5 euros para la donación; lo que decidas no donar se sumará a tu compensación (1 euro).",
      submit: "Enviar",
    },
    questions: {
      donation: "¿Cuánto te gustaría donar a la caridad?",
      emotionalAppeal: {
        header: "Atractivo Emocional",
        options: {
        EA1: "El anuncio me hizo sentir emocionalmente conectado con la causa.",
        EA2: "Sentí una fuerte empatía por la causa que se presenta en el anuncio.",
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
        header: "Intenciones Conductuales",
        options: {
        BI2: "¿Qué tan probable es que compartas este anuncio o hables de la causa con otros?",
        BI3: "¿Qué tan probable es que busques más información sobre la organización?"
        }
      },
      feedbackPositive: "¿Qué aspecto te gustó del anuncio de caridad? (Si ninguno, escribe NA)",
      feedbackNegative: "¿Qué aspecto NO te gustó del anuncio de caridad? (Si ninguno, escribe NA)",
      adSource: "¿Quién crees que escribió el anuncio?",
      recipeUsed: "¿Qué fue lo que más te llamó la atención en el anuncio?",
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
        "Cifras que muestran el impacto positivo de las donaciones.",
        "Cifras que destacan las consecuencias negativas de no donar.",
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
        bonusAmount: "Monto del Bono",
        estimatedTime: "Tiempo Estimado",
      },
      taskDetails: `
        <p>Después de hacer clic en "Siguiente", verás un anuncio de caridad. Por favor, tómate un momento para leer atentamente el texto del anuncio. Se te dará 1,5 €, que puedes elegir conservar para ti o contribuir con cualquier porción del monto según lo consideres adecuado.</p>
        <!-- Detalles restantes de la tarea -->
      `,
      eligibilityCriteria: `
        <li>Debe tener 18 años o más.</li>
        <li>Debe ser fluido en español.</li>
      `,
      compensation: `
        <p>El pago base por la tarea es de 1 €. Además, recibirás una compensación basada en la cantidad que decidas conservar para ti después de hacer tu donación.</p>
      `,
      bonusTable: [
        { level: "Finalización de la Tarea", amount: "1,0 €" },
        { level: "Fondos Restantes", amount: "Varía según la cantidad donada" },
      ],
      estimatedTime: `
        <p>Se espera que la tarea tome aproximadamente 5 minutos para completarse.</p>
      `,
    },
  },
};

export default charityTaskConfigES;
