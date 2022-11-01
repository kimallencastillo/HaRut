// Questions List
// random question
export const easyQuestions = (questions) => {
  var n = questions.length;
  questions.sort(() => 0.5 - Math.random()).slice(0, n);
}

const questions = [
    {
      questionText: 'What was the landscape like in Greece?',
      answerOptions: [
        { symbol: '✌', answerText: 'Tundra', isCorrect: false },
        { symbol: '🤟', answerText: 'Mountainous', isCorrect: true },
        { symbol: '🤙', answerText: 'Desert', isCorrect: false },
        { symbol: '👍', answerText: 'Tropical rain forest', isCorrect: false },
      ],
    },
    {
      questionText: 'What are the Ancient Egyptians famous for building?',
      answerOptions: [
        { symbol: '✌', answerText: 'Pyramids', isCorrect: true },
        { symbol: '🤟', answerText: 'Taj Mahal', isCorrect: false },
        { symbol: '🤙', answerText: 'Burj Khalifa', isCorrect: false },
        { symbol: '👍', answerText: 'Dubai', isCorrect: false },
      ],
    },
    {
      questionText: 'Which ancient people built pyramids',
      answerOptions: [
        { symbol: '✌', answerText: 'chinese', isCorrect: false },
        { symbol: '🤟', answerText: 'Summerians', isCorrect: false },
        { symbol: '🤙', answerText: 'Egyptians', isCorrect: true },
        { symbol: '👍', answerText: 'Indians', isCorrect: false },
      ],
    },
    {
      questionText: 'Who was the Roman god of fire?',
      answerOptions: [
        { symbol: '✌', answerText: 'Tree', isCorrect: false },
        { symbol: '🤟', answerText: 'Montains', isCorrect: false },
        { symbol: '🤙', answerText: 'Moon', isCorrect: false },
        { symbol: '👍', answerText: 'Vulcan', isCorrect: true },
      ],
    },
    {
      questionText: 'Whats 15 + 8?',
      answerOptions: [
        { symbol: '✌', answerText: '29', isCorrect: false },
        { symbol: '🤟', answerText: '20', isCorrect: true },
        { symbol: '🤙', answerText: '15', isCorrect: false },
        { symbol: '👍', answerText: '23', isCorrect: false },
      ],
    },
   
]
