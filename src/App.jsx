import { useEffect, useState } from "react"
import { nanoid } from 'nanoid'

import Question from "./components/Question"
import Start from "./components/Start"
import Confetti from 'react-confetti'

export default function App() {
  // Variables
  const [startGame, setStartGame] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const [playAgain, setPlayAgain] = useState(false)

  const [questions, setQuestions] = useState([])
  const [correctCount, setCorrectCount] = useState(0)

  // Style
  const correctStyle = { color: (correctCount < 4) ? '#ff0000' : '#00ae24' }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
      .then(res => res.json())
      .then(data => {
        setQuestions(() => {
          let newArray = []

          for (let i = 0; i < data.results.length; i++) {
            newArray.push({
              id: nanoid(),
              question: atob(data.results[i].question),
              correct_answer: atob(data.results[i].correct_answer),
              answers: [
                ...data.results[i].incorrect_answers.map(incorrect => atob(incorrect)),
                atob(data.results[i].correct_answer)
              ].sort(() => Math.random() - 0.5),
              select_answer: '',
              isCorrect: false
            })
          }

          return newArray
        })
      })
  }, [newGame])

  // console.log(questions)

  // Functions
  function startGameHandle() {
    setStartGame(prevStartGame => !prevStartGame)
  }

  function selectAnswer(e, c_answer, id) {
    const { value } = e.target

    setQuestions(oldQuestion => oldQuestion.map(question => {
      return question.id === id ?
        { ...question, select_answer: value, isCorrect: value === c_answer ? true : false } :
        question
    }))
  }

  function checkAnswers() {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].select_answer != "") {
        if (questions[i].isCorrect) {
          setCorrectCount(prevCount => prevCount + 1)
        }
      } else {
        setCorrectCount(0)
        alert('Answer all questions!')
        return
      }
    }
    setPlayAgain(true)
  }

  function handlePlayAgain() {
    setPlayAgain(false)
    setNewGame(prevGame => !prevGame)
    setCorrectCount(0)
  }

  const questionsElement = questions.map(question => ([<Question key={question.id} data={question} handleChange={selectAnswer} playAgain={playAgain} />]))

  return (
    <div className="app">
      {
        !startGame
          ?
          <Start startGame={startGameHandle} />
          :
          <div>
            {questionsElement}

            {
              !playAgain
                ?
                <div className="checkAnswers">
                  <button className="btn-quiz" onClick={checkAnswers}>Check Answers</button>
                </div>
                :
                <div className="playAgainBtnDiv">
                  {correctCount == 5 && <Confetti />}
                  <span className="score">You scored <span style={correctStyle}>{correctCount}/5</span> correct answers</span>
                  <button className="btn-quiz" onClick={handlePlayAgain}>Play again</button>
                </div>
            }
          </div>
      }
    </div>
  )
}