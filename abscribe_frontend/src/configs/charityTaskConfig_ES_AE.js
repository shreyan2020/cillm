const charityTaskConfigES = {
    config: {
      redirectCode: "C1MGNTBM",
      consentText: `
        <p>
          Somos un grupo de investigadores de la Universidad Técnica de Delft en los Países Bajos y la Universidad de Göttingen. En este proyecto de investigación, nuestro objetivo es investigar la persuasión de un texto a través del comportamiento de donación. Por ello, te invitamos a participar en nuestro estudio de investigación.
        </p>
        <p>
          La siguiente tarea forma parte del proyecto de investigación descrito anteriormente. Al acceder a la aplicación web, realizarás una donación y responderás algunas preguntas.
        </p>
        <p>
          La realización de estas tareas no requiere ningún equipo específico. Tu participación en esta tarea es completamente voluntaria, y puedes retirarte en cualquier momento.
        </p>
        <p>
          Recogeremos la siguiente información:
        </p>
        <ul>
          <li>Información personal: edad y género</li>
          <li>Competencia lingüística</li>
          <li>Cantidad donada</li>
          <li>Respuestas de los cuestionarios</li>
        </ul>
        <p>
          No recopilamos ningún dato más allá de la información descrita, y mantendremos tu información confidencial. Todos los datos se almacenan en un formato electrónico protegido con contraseña. Ten en cuenta que los datos que recojamos con esta tarea podrían publicarse de forma anónima más adelante. Dicho conjunto de datos anonimizados incluiría las respuestas que proporciones en esta tarea, pero no información personal (por ejemplo, tu ID de Prolific), de modo que las respuestas no podrán rastrearse hasta ti.
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
        instruction: "Haz clic en el botón `Proceder a la Donación` para ver el texto del anuncio y decidir tu donación: Ten en cuenta que se te proporciona un máximo de 1.5 libras para donar, lo que decidas no donar se añadirá a tu compensación (1 libra).",
        submit: "Enviar",
        validationmessage: "Esta pregunta es obligatoria.",
      },
      questions: {
        donation: "¿Cuánto te gustaría donar (máximo £1.5)?",
        emotionalAppeal: {
          header: "Atractivo Emocional",
          options: {
          EA1: "El anuncio me hizo sentir conectado emocionalmente con la causa.",
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
          BI1: "¿Qué tan probable es que compartas este anuncio o hables sobre la causa con otros?",
          BI2: "¿Qué tan probable es que busques más información sobre la organización?"
          }
        },
        attentionCheck: {
          header: "¿A qué organización benéfica has donado en esta tarea?",
          options: ["WWF", "Cruz Roja", "UNICEF", "Médicos Sin Fronteras"],
        },
        feedbackPositive: "¿Qué aspecto te gustó del anuncio de la organización benéfica? (Si nada, escribe NA)",
        feedbackNegative: "¿Qué aspecto NO te gustó del anuncio de la organización benéfica? (Si nada, escribe NA)",
        adSource: {
          header: "¿Quién crees que escribió el anuncio?",
          options: {
              AS1: "IA",
              AS2: "Humano",
            },
        },
        recipeUsed: {
          header: "¿Qué llamó más tu atención en el anuncio?",
          options: {
          RU1: "Una historia positiva sobre cómo las donaciones han ayudado a otros.",
          RU2: "Una historia de advertencia sobre lo que puede suceder sin donaciones.",
          RU3: "Números que muestran el impacto positivo de las donaciones.",
          RU4: "Números que destacan las consecuencias negativas de no donar.",
          RU5: "Cómo las donaciones pueden hacer una diferencia inmediata.",
          RU6: "Cómo las donaciones ayudarán a largo plazo.",
          RU7: "Ninguna de las anteriores",
          }
        }
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
          <p>En esta encuesta, recibirás una dotación de £1.5. Se te pedirá que dividas estas £1.5 entre ti y la organización benéfica World Wildlife Fund (WWF).</p>
          <p>Eres libre de donar tanto o tan poco como desees. Por ejemplo, puedes decidir quedarte con las £1.5 todas para ti, o también puedes decidir donar las £1.5 por completo.</p>
          <p>Antes de tomar tu decisión de donación, leerás un texto que te informará sobre la WWF. Por favor, lee el texto detenidamente antes de decidir cómo dividir tus £1.5.</p>
        `,
        eligibilityCriteria: `
          <li>Debes tener 18 años o más.</li>
          <li>Debes tener fluidez en inglés.</li>
        `,
        compensation: `
          <p>Tu compensación total se basa en el pago base de esta tarea y el pago de bonificación. El pago base es £1. El pago de bonificación depende de tu decisión de donación, y puede ser entre £0 y £1.5.</p>
        `,
        bonusTable: [
          { level: "Finalización de la Tarea", amount: "€1.0" },
          { level: "Dotación Restante", amount: "Varía según la cantidad donada" },
        ],
        estimatedTime: `
          <p>Haz clic en el botón a continuación para proceder a la decisión de donación.</p>
        `,
      },
    },
  };
  
  export default charityTaskConfigES;
  