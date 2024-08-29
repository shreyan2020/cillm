const charityTaskConfigEN = {
  config: {
    consentText: `
      <p>
        We are a group of researchers at the Technical University of Delft in The Netherlands. In this research project, we aim to investigate the persuasiveness of a text through donation behavior. As such, you are invited to participate in our research study.
      </p>
      <p>
        The following task is part of the research project described above. Upon accessing the web application, you will be presented with a charity advertisement and subsequently asked to donate some amount and answer some questions.
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
        <li>Donation amount</li>
        <li>Responses from the questionnaires</li>
      </ul>
      <p>
        We do not collect any data aside from the information described, and we will keep your information confidential. All data is stored in a password-protected electronic format. Be aware that the data we gather with this task might be published in anonymized form later. Such an anonymized data set would include the answers you provide in this task but no personal information (e.g., your Prolific ID) so that the answers will not be traceable back to you.
      </p>    
      <p>
        By clicking “I consent” at the bottom of this page, you confirm that you have read, understood, and consent to the above information.
      </p>
      <p>
        Note: You can exit the task at any time. This will imply revoking your consent, and subsequently, all your data will be discarded from our databases.
      </p>
    `,
    time: '15 minutes',
    language: 'ENG',
    questions: {
      donation: "How much would you like to donate to the charity?",
      feedback: "What aspect did you like about the charity ad?",
      adSource: "Who do you think wrote the ad?",
      recipeUsed: "What caught your attention in the ad?",
    },
    options: {
      adSource: {
        ai: "AI",
        human: "Human",
      },
      recipeUsed: [
        "A positive story about how donations have helped others.",
        "A warning story about what can happen without donations.",
        "Numbers showing the positive impact of donations.",
        "Numbers highlighting the negative consequences of not donating.",
        "How donations can make a difference right away.",
        "How donations will help in the long run.",
      ],
    },
    labels: {
      donationAmount: "Donation Amount",
      submit: "Submit",
      instruction: "Please read the following text and decide your donation:",
      errorMessage: "There was an error submitting your survey responses. Please try again.",
    },
    jobDescription: {
      headers: {
        taskDetails: "Task Details",
        eligibilityCriteria: "Eligibility Criteria",
        compensation: "Compensation",
        qualityLevel: "Quality Level",
        bonusAmount: "Bonus Amount",
        estimatedTime: "Estimated Time",
      },
      taskDetails: `
        <p>First, read the text carefully. You are provided an amount of €1.5 to donate to the charity. You can either keep it for yourself or donate to the charity fully or in any amount you deem fit.</p>
        <p>For example, if you choose to donate €1.5, then you will only get €1 for completing the task. If you donate €1, then you will get €1 + (€1.5 - €1) = €1.5, and so on.</p>
        <p>After donating, you will be asked to answer a few questions regarding the text.</p>
      `,
      eligibilityCriteria: `
        <li>Must be 18 years or older.</li>
        <li>Must be fluent in English.</li>
      `,
      compensation: `
        <p>You will be compensated based on the amount you choose to keep after your donation. The base payment for the task is €1.</p>
      `,
      bonusTable: [
        { level: "Task Completion", amount: "€1.0" },
        { level: "Leftover Endowment", amount: "Varies based on donation amount" },
      ],
      estimatedTime: `
        <p>The task is expected to take approximately 5 minutes to complete.</p>
      `,
    },
  },
};

export default charityTaskConfigEN;
