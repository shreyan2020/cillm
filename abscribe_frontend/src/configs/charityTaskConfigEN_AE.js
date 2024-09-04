const charityTaskConfigEN = {
  config: {
    consentText: `
      <p>
        We are a group of researchers at the Technical University of Delft in The Netherlands and Goettingen University. In this research project, we aim to investigate the persuasiveness of a text through donation behavior. As such, you are invited to participate in our research study.
      </p>
      <p>
        The following task is part of the research project described above. Upon accessing the web application, you make a donation and answer some questions.
      </p>
      <p>
        Completion of these tasks does not require any specific equipment. Your participation in this task is entirely voluntary, and you can withdraw at any time.
      </p>
      <p>
        We will collect the following information
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
        Note: You can exit the task at any time. This will imply revoking your consent, and subsequently, all your data will be discarded from our databases. If you want to contact the researchers beyond this task you can email at s.biswas@tudelft.nl
      </p>
    `,
    time: '15 minutes',
    language: 'ENG',
    likertScale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    labels: {
      instruction: "Click the`Proceed to Donation` button to see read about WWF and decide your donation. Note that you are provided a maximum of 1.5 GBP for donation. Whatever you decide to donate, any balance will be added to your base payment of 1 GBP and sent to you.",
      submit: "Submit",
      validationmessage: "This question is required.",
    },
    questions: {
      donation: "How much would you like to donate (max £1.5)?",
      emotionalAppeal: {
        header: "Emotional Appeal",
        options: {
        EA1: "The advertisement made me feel emotionally connected to the cause.",
        EA2: "I felt a strong sense of empathy for the cause featured in the advertisement.",
        EA3: "The ad evoked feelings of compassion and a desire to help."
        }
      },
      // perceptionMission: {
      //   header: "Perception of the Organization’s Mission",
      //   options: {
      //   PM1: "The advertisement clearly communicated the mission of the organization.",
      //   PM2: "I believe the organization’s mission is important.",
      //   PM3: "The ad made me more aware of the challenges the organization is addressing."
      //   }
      // },
      informationAwareness: {
        header: "Information and Awareness",
        options: {
        IA1: "The advertisement provided useful information about the organization.",
        IA2: "I feel more informed about the organization's work after seeing the ad.",
        IA3: "The ad increased my understanding of the impact the organization has."
        }
      },
      // perceivedImpact: {
      //   header: "Perceived Social Impact",
      //   options: {
      //   PSI1: "The advertisement convinced me that donating to this organization would have a significant positive impact.",
      //   PSI2: "I believe that my contribution could make a difference because of this organization.",
      //   PSI3: "The ad made me feel that this organization is effective in achieving its goals."
      //   }
      // },
      // personalIdentity: {
      //   header: "Personal Identity and Values",
      //   options: {
      //   PI1: "The advertisement made me feel that donating is an expression of my personal values.",
      //   PI2: "I believe that donating to this organization reflects positively on my character.",
      //   PI3: "The ad made me think that being a good person involves supporting causes like this one."
      //   }
      // },
      behavioralIntentions: {
        header: "Behavioral Intentions",
        options: {
        // BI1: "How likely are you to donate to the organization after seeing this advertisement?",
        BI1: "How likely are you to share this advertisement or talk about the cause with others?",
        BI2: "How likely are you to seek more information about the organization?"
        }
      },
      charity: {
        header: "Which charity have you donated to in this task?",
        options: ["WWF", "Red Cross", "UNICEF", "Doctors Without Borders"],
      },
      feedbackPositive: "What aspect  or aspects did you like about the charity ad and why? (If nothing, write NA)",
      feedbackNegative: "What aspect or aspects did you NOT like about the charity ad and why? (If nothing, write NA)",
      adSource: {
        header: "Who do you think wrote the ad?",
        headerReason: "Why did you select",
        options: {
            AS1: "AI",
            AS2: "Human",
          },
      },
      recipeUsed: {
        header: "What caught your attention the most in the ad? Check all that apply.",
        options: {
        RU1: "A positive story about how donations have helped others.",
        RU2: "A warning story about what can happen without donations.",
        RU3: "Numbers showing the positive impact of donations.",
        RU4: "Numbers highlighting the negative consequences of not donating.",
        RU5: "How donations can make a difference right away.",
        RU6: "How donations will help in the long run.",
        RU7: "None of the Above",
        }
      }
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
        <p>In this survey, you will receive an endowment of £1.5. You will be asked to split the £1.5 between yourself, and the World Wildlife Fund (WWF) charity. </p>
        <p> You are free to donate as much or as little as you want.</p>
        <p>Before making your donation decision, you will read a text informing you about the WWF. Please read the text carefully before deciding how to split your £1.5.</p>
      `,
      eligibilityCriteria: `
        <li>Must be 18 years or older.</li>
        <li>Must be fluent in English.</li>
      `,
      compensation: `
        <p>our total compensation is based on the base payment of this task, and your bonus payment. The base payment is £1. The bonus payment depends on your donation decision, and can be anything between £0 and £1.5</p>
      `,
      bonusTable: [
        { level: "Task Completion", amount: "€1.0" },
        { level: "Leftover Endowment", amount: "Varies based on donation amount" },
      ],
      estimatedTime: `
        <p>Click on the button below to proceed to the donation decision.</p>
      `,
    },
  },
};

export default charityTaskConfigEN;