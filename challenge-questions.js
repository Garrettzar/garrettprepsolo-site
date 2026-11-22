"use strict";

// Transcribed from the GarrettPrep print master. Answer indexes run from 0 (A) to 3 (D).
window.GARRETTPREP_QUESTIONS = [
  {
    id: "math-001", subject: "Math", topic: "Algebra",
    prompt: "A bike rental costs $18 upfront plus $7 per hour. In the model C(h) = 18 + 7h, what does 7 represent?",
    choices: ["The upfront fee", "The total cost after 7 hours", "The number of hours included", "The cost per additional hour"],
    answer: 3,
    explanation: "The coefficient of h is 7. Since h represents hours, the total cost rises by $7 for each additional hour.",
    clue: "In a linear model, the coefficient of the input variable represents the rate of change."
  },
  {
    id: "math-002", subject: "Math", topic: "Problem-Solving & Data Analysis",
    prompt: "A jacket's original price is p dollars. After a 20% increase, which expression gives its new price?",
    choices: ["0.20p", "1.20p", "0.80p", "p + 20"],
    answer: 1,
    explanation: "The new price is 100% + 20% = 120% of the original, or 1.20p.",
    clue: "For a percent increase, multiply the original amount by 1 plus the rate in decimal form."
  },
  {
    id: "math-003", subject: "Math", topic: "Geometry & Trigonometry",
    prompt: "A circle has a diameter of 10 centimeters. What is its area, in square centimeters?",
    choices: ["10π", "20π", "25π", "100π"],
    answer: 2,
    explanation: "The radius is half the diameter, so r = 5. Area = πr² = 25π.",
    clue: "Circle area uses the radius, not the diameter."
  },
  {
    id: "math-004", subject: "Math", topic: "Algebra",
    prompt: "If 2x + 3y = 17 and 3x − y = 8, what is the value of 5x + 2y?",
    choices: ["9", "17", "25", "34"],
    answer: 2,
    explanation: "Add the two given equations. The left sides combine to 5x + 2y, and the right sides add to 25. There's no need to solve for x and y.",
    clue: "Before solving a system, check whether adding or subtracting equations gives the exact expression requested."
  },
  {
    id: "math-005", subject: "Math", topic: "Algebra",
    prompt: "For what value of k does the equation 2(3x − 5) = kx + 8 have no solution?",
    choices: ["3", "6", "8", "10"],
    answer: 1,
    explanation: "Expanding gives 6x − 10 = kx + 8. When k = 6, the x terms cancel, leaving −10 = 8, which is impossible.",
    clue: "For no solution, the variable terms cancel but the constant terms disagree."
  },
  {
    id: "math-007", subject: "Math", topic: "Advanced Math",
    prompt: "Which expression is equivalent to (3x − 2)² − 25?",
    choices: ["(3x − 5)(3x + 5)", "(3x − 7)(3x + 3)", "(3x − 3)(3x + 7)", "(3x − 7)(3x − 3)"],
    answer: 1,
    explanation: "Let a = 3x − 2. Then the expression is a² − 5² = (a − 5)(a + 5), giving (3x − 7)(3x + 3).",
    clue: "Recognize a² − b² = (a − b)(a + b), even when a is an entire expression."
  },
  {
    id: "rw-001", subject: "Reading & Writing", topic: "Punctuation",
    prompt: "The photography club had four members, each with a camera. The _____ cameras were stored in a cabinet.",
    choices: ["members", "member's", "members'", "members's"],
    answer: 2,
    explanation: "The cameras belong to multiple members. Since “members” is already plural and ends in s, add an apostrophe after the s.",
    clue: "For a regular plural ending in s, put the possessive apostrophe after the s."
  },
  {
    id: "rw-002", subject: "Reading & Writing", topic: "Punctuation",
    prompt: "The contest's three finalists _____ Priya, Tomas, and Lena.",
    choices: ["were:", "were;", "were,", "were"],
    answer: 3,
    explanation: "The verb “were” connects the finalists to their names. No punctuation belongs between the linking verb and its complement.",
    clue: "Don't insert a colon or other punctuation between a linking verb and what follows it."
  },
  {
    id: "rw-003", subject: "Reading & Writing", topic: "Punctuation",
    prompt: "After three rounds of increasingly difficult _____ the judges announced the winner.",
    choices: ["questions;", "questions.", "questions,", "questions:"],
    answer: 2,
    explanation: "The introductory phrase ends after “questions.” A comma separates it from the main clause.",
    clue: "Find where the introduction ends and the main sentence begins."
  },
  {
    id: "rw-004", subject: "Reading & Writing", topic: "Punctuation",
    prompt: "The robotics team introduced one major _____ a battery that could recharge in ten minutes.",
    choices: ["upgrade;", "upgrade:", "upgrade.", "upgrade?"],
    answer: 1,
    explanation: "The first part is a complete sentence, and the words after the colon identify the upgrade.",
    clue: "A colon can introduce a specific example after a complete sentence."
  },
  {
    id: "rw-006", subject: "Reading & Writing", topic: "Punctuation",
    prompt: "The experiment was expected to _____ every sample survived.",
    choices: ["fail, however,", "fail; however;", "fail; however,", "fail however,"],
    answer: 2,
    explanation: "Two complete sentences are connected by “however.” The semicolon separates the sentences, and the comma follows the transition.",
    clue: "Full sentence; however, full sentence."
  }
];
