"use strict";

// Original questions and Math 008–011 reflect the GarrettPrep print-master/review proofs.
// Reading & Writing 013–017 are new online-preview drafts pending owner editorial approval.
// Answer indexes run from 0 (A) to 3 (D).
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
  },
  // Additional approved Math proofs (008–011) and preview-only Reading & Writing drafts (013–017).
  {
    id: "math-008", subject: "Math", topic: "Advanced Math",
    prompt: "A quantity starts at 200 and decreases by 15% each hour. Which expression gives the amount remaining after t hours?",
    choices: ["200(0.15)^t","200(1.15)^t","200(0.85t)","200(0.85)^t"],
    answer: 3,
    explanation: "A 15% decrease leaves 85% each hour. Multiply by 0.85 once for each elapsed hour, giving 200(0.85)^t.",
    clue: "Repeated percent change is exponential. For decay, the base is 1 minus the percent rate."
  },
  {
    id: "math-009", subject: "Math", topic: "Problem-Solving & Data Analysis",
    prompt: "The values 2, 4, 4, 6, and 9 are each increased by 3. Which statistic stays the same?",
    choices: ["Mean","Median","Range","Maximum"],
    answer: 2,
    explanation: "Adding 3 shifts both the highest and lowest values by 3, so their difference (the range) stays unchanged. Mean, median, and maximum all increase by 3.",
    clue: "Adding the same constant changes a data set's location, not its spread."
  },
  {
    id: "math-010", subject: "Math", topic: "Geometry & Trigonometry",
    prompt: "A circle has radius 6. A central angle measures 120°. What is the length of its intercepted arc?",
    choices: ["2π","4π","6π","12π"],
    answer: 1,
    explanation: "The angle is 120/360 = 1/3 of a full circle. The circumference is 2π(6) = 12π, so the arc length is 4π.",
    clue: "Arc length = central-angle fraction × circumference."
  },
  {
    id: "math-011", subject: "Math", topic: "Advanced Math",
    prompt: "A quadratic f(x) = x² + bx + c satisfies f(2) = f(8) and has a minimum value of 4. What is c?",
    choices: ["21","25","29","33"],
    answer: 2,
    explanation: "Since f(2) = f(8), the vertex lies halfway between 2 and 8, at x = 5. The minimum is 4, so f(x) = (x − 5)² + 4. Therefore, c = f(0) = 25 + 4 = 29.",
    clue: "Equal quadratic outputs locate the axis of symmetry halfway between their inputs. Use the minimum to write vertex form."
  },
  {
    id: "rw-013", subject: "Reading & Writing", topic: "Grammar",
    prompt: "Each of the three research teams _____ responsible for submitting a final report.",
    choices: ["are","is","were","have been"],
    answer: 1,
    explanation: "The subject is “Each,” which is singular. The phrase “of the three research teams” does not change the verb to plural.",
    clue: "Find the true subject before choosing a verb. “Each” takes a singular verb."
  },
  {
    id: "rw-014", subject: "Reading & Writing", topic: "Transitions",
    prompt: "The library extended its evening hours. _____, more students were able to study there after sports practice.",
    choices: ["As a result","However","For example","In contrast"],
    answer: 0,
    explanation: "The second sentence describes an effect of the library staying open later. “As a result” correctly signals that cause-and-effect relationship.",
    clue: "Ask how the ideas connect: cause and effect, contrast, or example?"
  },
  {
    id: "rw-015", subject: "Reading & Writing", topic: "Words in Context",
    prompt: "The scientist's explanation was _____: even students without a background in chemistry could follow every step.",
    choices: ["obscure","accessible","tentative","contradictory"],
    answer: 1,
    explanation: "The students could easily follow the explanation, so “accessible,” meaning easy to understand, best fits the context.",
    clue: "Use the words after the colon to predict the meaning before checking the choices."
  },
  {
    id: "rw-016", subject: "Reading & Writing", topic: "Grammar",
    prompt: "Which choice most logically completes the sentence? Walking through the aquarium, _____.",
    choices: ["the colorful fish caught Maya's attention","Maya noticed the colorful fish","the tanks appeared enormous","the sound of water echoed"],
    answer: 1,
    explanation: "The opening phrase describes someone walking. “Maya” must be the subject of the main clause so the sentence clearly identifies who was walking.",
    clue: "An opening modifying phrase should describe the person or thing named immediately after it."
  },
  {
    id: "rw-017", subject: "Reading & Writing", topic: "Transitions",
    prompt: "Most deserts receive very little rain. _____, some support a surprising variety of plants that store water in their stems or leaves.",
    choices: ["Consequently","Similarly","Nevertheless","For instance"],
    answer: 2,
    explanation: "Although deserts receive little rain, some still support many plants. “Nevertheless” signals this unexpected contrast.",
    clue: "If the second idea is surprising despite the first, look for a contrast transition."
  }
];
