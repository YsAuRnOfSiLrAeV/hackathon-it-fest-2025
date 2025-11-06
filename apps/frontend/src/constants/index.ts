export { cards, interviewQuestions };

const cards = [
    {
      name: "CV Builder",
      description: "Validated form with live preview in two templates and PDF export.",
      skills: ["Sections: education, experience, skills", "Live preview", "Export to PDF"],
    },
    {
      name: "Interview Simulator",
      description: "Timed Q&A with a summary report and self-assessment.",
      skills: ["5-8 questions", "Timer & score", "Progress saved"],
    },
    {
      name: "Import & Export",
      description: "Download your profile/results as JSON or PDF, import back later.",
      skills: ["Profile JSON", "Interview report PDF", "One-click export"],
    },
    {
      name: "Privacy by Default",
      description: "We only collect the data needed for the MVP. You can erase your data anytime.",
      skills: ["Opt-in analytics", "Erase account", "No passwords stored"],
    },
];


const interviewQuestions = [
    {
        id: "js-closure",
        text: "What does a JavaScript closure allow you to do?",
        choices: [
            "Bind 'this' to a function permanently",
            "Access outer function scope after it returns",
            "Create private classes",
            "Defer execution until repaint",
        ],
        correct: 1,
    },
    {
        id: "http-status",
        text: "Which HTTP status code means 'Unauthorized (no credentials)'?",
        choices: ["401", "403", "404", "500"],
        correct: 0,
    },
    {
        id: "db-index",
        text: "Database indexes primarily improve which operation?",
        choices: ["Writes", "Reads", "Backups", "Migrations"],
        correct: 1,
    },
    {
        id: "react-keys",
        text: "In React lists, why are keys important?",
        choices: [
            "They style items",
            "They help identify elements across renders",
            "They memoize props",
            "They enable suspense",
        ],
        correct: 1,
    },
    {
        id: "oauth-flow",
        text: "In OAuth2 Authorization Code flow, the 'code' is exchanged for?",
        choices: ["Password", "Client secret", "Access token (and maybe ID token)", "Refresh cookie"],
        correct: 2,
    },
    {
        id: "css-specificity",
        text: "Which has higher CSS specificity?",
        choices: ["Class selector", "ID selector", "Type selector", "Universal selector"],
        correct: 1,
    },
];