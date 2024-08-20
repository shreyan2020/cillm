const surveyConfig = {
  '66c516b1d61c7b572205f713': {
    language: 'English',
    headers: {
      usefulness: `
        <p className="mb-3">
          <strong>1.</strong> Respond to the following questions honestly and to the best of your ability. There are no right answers, and we are interested in understanding your perception. Note that the usefulness of features can be reported on a scale of 1-100.
        </p>
        <p className="mb-3">
          <strong>2.</strong> If a feature does not apply to you, select <em>"Not Applicable"</em>.
        </p>
        <p>
          <strong>3.</strong> To rate a feature 0, drag it right then drag it back to 0. Rating a feature with 0 will be interpreted as not applicable. 
        </p>`,
      ownership: 'Ownership',
      collaboration: 'Collaboration',
      aiCapabilities: 'AI Writing Assistant Capabilities',
    },
    questions: {
      usefulness: [
        'Variation - Gain Framing with Anecdotal Information',
        'Variation - Loss Framing with Anecdotal Information',
        'Variation - Gain Framing with Statistics',
        'Variation - Loss Framing with Statistics',
        'Variation - Short-term Temporal Framing',
        'Variation - Long-term Temporal Framing',
        '@ai to Generate New Texts',
        'Create Continuation'
      ],
      ownership: [
        'I feel that I have contributed to the content',
        'I would be willing to publicly share the content I wrote, including my name',
        'I would fully claim ownership of the content I wrote'
      ],
      collaboration: [
        'Do you think the suggestions you received contributed to the fluency of the resultant text?',
        'Did the suggestions help you come up with new ideas?',
        'Do you feel that you would have written a better text if you wrote it alone?'
      ],
      aiCapabilities: [
        'Do you think the system was competent in writing?',
        'Do you think the system was capable of writing creative texts?',
        'Do you think the system was capable of writing persuasive texts?',
        'Do you think the system understood what you were trying to write?'
      ]
    },
    likertScale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
  },
  '66aca69be884d495377c3f30': {
    language: 'Spanish',
    headers: {
      usefulness: `
        <p className="mb-3">
          <strong>1.</strong> Responda las siguientes preguntas con honestidad y según su mejor capacidad. No hay respuestas correctas y nos interesa entender su percepción. Tenga en cuenta que la utilidad de las funciones se puede reportar en una escala de 1-100.
        </p>
        <p className="mb-3">
          <strong>2.</strong> Si una función no le aplica, seleccione <em>"No aplicable"</em>.
        </p>
        <p>
          <strong>3.</strong> Para calificar una función con 0, deslícela hacia la derecha y luego deslícela de nuevo a 0. Calificar una función con 0 se interpretará como no aplicable.
        </p>`,
      ownership: 'Propiedad',
      collaboration: 'Colaboración',
      aiCapabilities: 'Capacidades del Asistente de Escritura con IA',
    },
    questions: {
      usefulness: [
        'Variación - Enmarcado de Ganancia con Información Anecdótica',
        'Variación - Enmarcado de Pérdida con Información Anecdótica',
        'Variación - Enmarcado de Ganancia con Estadísticas',
        'Variación - Enmarcado de Pérdida con Estadísticas',
        'Variación - Enmarcado Temporal a Corto Plazo',
        'Variación - Enmarcado Temporal a Largo Plazo',
        '@ai para Generar Nuevos Textos',
        'Crear Continuación'
      ],
      ownership: [
        'Siento que he contribuido al contenido',
        'Estaría dispuesto a compartir públicamente el contenido que escribí, incluyendo mi nombre',
        'Reclamaría completamente la propiedad del contenido que escribí'
      ],
      collaboration: [
        '¿Cree que las sugerencias que recibió contribuyeron a la fluidez del texto resultante?',
        '¿Las sugerencias le ayudaron a generar nuevas ideas?',
        '¿Cree que habría escrito un mejor texto si lo hubiera escrito solo?'
      ],
      aiCapabilities: [
        '¿Cree que el sistema fue competente en la escritura?',
        '¿Cree que el sistema fue capaz de escribir textos creativos?',
        '¿Cree que el sistema fue capaz de escribir textos persuasivos?',
        '¿Cree que el sistema entendió lo que estaba tratando de escribir?'
      ]
    },
    likertScale: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
  },
  default: {
    language: 'English',
    headers: {
      usefulness: `
        <p className="mb-3">
          <strong>1.</strong> Respond to the following questions honestly and to the best of your ability. There are no right answers, and we are interested in understanding your perception. Note that the usefulness of features can be reported on a scale of 1-100.
        </p>
        <p className="mb-3">
          <strong>2.</strong> If a feature does not apply to you, select <em>"Not Applicable"</em>.
        </p>
        <p>
          <strong>3.</strong> To rate a feature 0, drag it right then drag it back to 0. Rating a feature with 0 will be interpreted as not applicable. 
        </p>`,
      ownership: 'Ownership',
      collaboration: 'Collaboration',
      aiCapabilities: 'AI Writing Assistant Capabilities',
    },
    questions: {
      usefulness: [
        'Variation - Gain Framing with Anecdotal Information',
        'Variation - Loss Framing with Anecdotal Information',
        'Variation - Gain Framing with Statistics',
        'Variation - Loss Framing with Statistics',
        'Variation - Short-term Temporal Framing',
        'Variation - Long-term Temporal Framing',
        '@ai to Generate New Texts',
        'Create Continuation'
      ],
      ownership: [
        'I feel that I have contributed to the content',
        'I would be willing to publicly share the content I wrote, including my name',
        'I would fully claim ownership of the content I wrote'
      ],
      collaboration: [
        'Do you think the suggestions you received contributed to the fluency of the resultant text?',
        'Did the suggestions help you come up with new ideas?',
        'Do you feel that you would have written a better text if you wrote it alone?'
      ],
      aiCapabilities: [
        'Do you think the system was competent in writing?',
        'Do you think the system was capable of writing creative texts?',
        'Do you think the system was capable of writing persuasive texts?',
        'Do you think the system understood what you were trying to write?'
      ]
    },
    likertScale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
  }
};

export default surveyConfig;
