// consentTextConfig.js

const consentTextConfig = {
    '66aca63c781c99be382101f6': {
      language: 'English',
      consentText: `
        <p>
          We are a group of researchers at the Technical University of Delft in The Netherlands. In this research project, we aim to investigate human behavior in LLM-augmented co-writing. As such, you are invited to participate in our research study.
        </p>
        <p>
          The following task is part of the research project described above. Upon accessing the web application, you will be presented with the task of writing a persuasive message for WWF using an AI-powered text editor. 
          After the task, you will be asked to fill in a small questionnaire that relates to your experience with the editor.
        </p>
        <p>
          Completion of these tasks does not require any specific equipment. Your participation in this task is entirely voluntary, and you can withdraw at any time.
        </p>
        <p>
          We will collect your usage and your experience with the tool. This includes:
        </p>
        <ul>
          <li>Personal information: age and gender</li>
          <li>Language proficiency</li>
          <li>Usage data: keystrokes, interactions with the editor, and your final write-up (which may be used in future scientific tasks)</li>
          <li>Responses from the questionnaires</li>
        </ul>
        <p>
          We do not collect any data aside from the information described, and we will keep your information confidential to the best of our ability. All data is stored in a password-protected electronic format. Be aware that the data we gather with this task might be published in anonymized form later. Such an anonymized data set would include the answers you provide in this task but no personal information (e.g., your worker ID) so that the answers will not be traceable back to you.
        </p>    
        <p>
          By clicking “I consent” at the bottom of this page, you confirm that you have read, understood, and consent to the above information.
        </p>
        <p>
          Note: You can exit the task at any time. This will imply revoking your consent, and subsequently, all your data will be discarded from our databases.
        </p>
      `,
      time: '15 minutes',
      jobDescription: {
        headers: {
            taskDetails: 'Task Details',
            eligibilityCriteria: 'Eligibility Criteria',
            compensation: 'Compensation',
            estimatedTime: 'Estimated Time',
          },
        taskDetails: `
          <p>Thank you for considering this opportunity.</p>
          <p>We are seeking individuals to write one short advertisement for one charity. The written advertisement should have 70-150 words.</p>
          <p><b>You are not allowed to leave the task and consult external resources. If you leave the environment your response will be not considered for the final evaluation and also the compensatioon will be withdrawn.</b></p>
        `,
        eligibilityCriteria: `
          <li>You are proficient in English.</li>
          <li>Your profile indicates that you work in a writing-related profession.</li>
        `,
        compensation: `
          <p>You will be compensated at a flat rate of £3.00 for completing this task. Additionally, you can earn a bonus of up to £10.00. The bonus compensation structure is given below and the top %s texts will be determined by other crowd 
          workers based on two criteria - 1) Persuasiveness and 2) Quality (grammar, spelling mistakes etc.) of the text.</p>
        `,
        bonusTable: [
          { level: "Top 20%", amount: "£4.00" },
          { level: "Top 10%", amount: "£6.00" },
          { level: "Top 1%", amount: "£10.00" },
        ],
        estimatedTime: `
        <p>This task is estimated to take approximately 15 minutes. If you are ready to complete the job without interruptions during this time, please click "Proceed" to start.</p>
        <p>Thank you for your interest!</p>`,
      },
    },
    '66aca69be884d495377c3f30': {
      language: 'Spanish',
      consentText: `
        <p>
          Somos un grupo de investigadores de la Universidad Técnica de Delft en los Países Bajos. En este proyecto de investigación, nuestro objetivo es investigar el comportamiento humano en la co-escritura aumentada por LLM. Por lo tanto, está invitado a participar en nuestro estudio de investigación.
        </p>
        <p>
          La siguiente tarea es parte del proyecto de investigación descrito anteriormente. Al acceder a la aplicación web, se le presentará la tarea de escribir un mensaje persuasivo para WWF utilizando un editor de texto con tecnología de IA. 
          Después de la tarea, se le pedirá que complete un pequeño cuestionario relacionado con su experiencia con el editor.
        </p>
        <p>
          La realización de estas tareas no requiere ningún equipo específico. Su participación en esta tarea es completamente voluntaria y puede retirarse en cualquier momento.
        </p>
        <p>
          Recopilaremos su uso y su experiencia con la herramienta. Esto incluye:
        </p>
        <ul>
          <li>Información personal: edad y género</li>
          <li>Dominio del idioma</li>
          <li>Datos de uso: pulsaciones de teclas, interacciones con el editor y su redacción final (que se puede utilizar en futuras tareas científicas)</li>
          <li>Respuestas de los cuestionarios</li>
        </ul>
        <p>
          No recopilamos ningún dato aparte de la información descrita y mantendremos su información confidencial en la mayor medida posible. Todos los datos se almacenan en formato electrónico protegido por contraseña. Tenga en cuenta que los datos que recopilamos con esta tarea podrían publicarse posteriormente en forma anónima. Dicho conjunto de datos anónimos incluiría las respuestas que proporcione en esta tarea, pero no incluiría información personal (por ejemplo, su ID de trabajador) para que las respuestas no se puedan rastrear hasta usted.
        </p>
        <p>
          Al hacer clic en “Doy mi consentimiento” al final de esta página, confirma que ha leído, comprendido y consiente la información anterior.
        </p>
        <p>
          Nota: Puede salir de la tarea en cualquier momento. Esto implicará la revocación de su consentimiento y, posteriormente, todos sus datos se eliminarán de nuestras bases de datos.
        </p>
      `,
      time: '15 minutes',
      jobDescription: {
        headers: {
            taskDetails: 'Detalles de la Tarea',
            eligibilityCriteria: 'Criterios de Elegibilidad',
            compensation: 'Compensación',
            estimatedTime: 'Tiempo Estimado',
          },
        taskDetails: `
          <p>Gracias por considerar esta oportunidad.</p>
          <p>Estamos buscando personas para escribir un anuncio corto para una organización benéfica. El anuncio escrito debe tener entre 70 y 150 palabras.</p>
          <p><b>No se le permite abandonar la tarea ni consultar recursos externos. Si abandona el entorno, su respuesta no será considerada para la evaluación final y también se retirará la compensación.</b></p>
        `,
        eligibilityCriteria: `
          <li>Es competente en español.</li>
          <li>Su perfil indica que trabaja en una profesión relacionada con la escritura.</li>
        `,
        compensation: `
          <p>Recibirá una compensación de £3.00 por completar esta tarea. Además, puede ganar un bono de hasta £10.00. La estructura de compensación de bonificación se detalla a continuación y los textos principales se determinarán por otros trabajadores en función de dos criterios: 1) Persuasividad y 2) Calidad (gramática, errores ortográficos, etc.) del texto.</p>
        `,
        bonusTable: [
          { level: "Top 20%", amount: "£4.00" },
          { level: "Top 10%", amount: "£6.00" },
          { level: "Top 1%", amount: "£10.00" },
        ],
        estimatedTime: `
        <p>Se estima que esta tarea tomará aproximadamente 15 minutos. Si está listo para completar el trabajo sin interrupciones durante este tiempo, haga clic en "Proceder" para comenzar.</p>
        <p>¡Gracias por su interés!</p>`,
      },
    }
  };
  
  export default consentTextConfig;
  