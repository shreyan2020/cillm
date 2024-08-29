const jobDescriptionConfigES = {
  config: {
    jobDescription: {
      headers: {
        taskDetails: "Detalles de la Tarea",
        eligibilityCriteria: "Criterios de Elegibilidad",
        compensation: "Compensación",
        estimatedTime: "Tiempo Estimado",
      },
      taskDetails: `
        <p>Primero, lea el texto cuidadosamente. Se le proporciona una cantidad de €1.5 para donar a la caridad. Puede quedárselo para usted o donarlo a la caridad por completo o en cualquier cantidad que considere adecuada.</p>
        <p>Por ejemplo, si elige donar €1.5, entonces solo recibirá €1 por completar la tarea. Si dona €1, entonces recibirá €1 + (€1.5 - €1) = €1.5, y así sucesivamente.</p>
        <p>Después de donar, se le pedirá que responda algunas preguntas sobre el texto.</p>
      `,
      eligibilityCriteria: `
        <li>Debe tener 18 años o más.</li>
        <li>Debe tener un ID de Prolific.</li>
        <li>Debe ser fluido en Español.</li>
      `,
      compensation: `
        <p>Se le compensará según la cantidad que elija quedarse después de su donación. El pago base por la tarea es de €1.</p>
      `,
      bonusTable: [
        { level: "Donación Completa", amount: "€1.0" },
        { level: "Donación Parcial", amount: "Varía según la cantidad donada" },
      ],
      estimatedTime: `
        <p>Se espera que la tarea tome aproximadamente 15 minutos para completarse.</p>
      `,
    },
    language: 'Español',
  },
};

export default jobDescriptionConfigES;
