import { useEffect, useState } from "react"
import { nanoid } from 'nanoid'

import Question from "./components/Question"
import Start from "./components/Start"

export default function App() {
  // Variables
  const [startGame, setStartGame] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestions(() => ({
          question: data.results.question,
          i_answer: data.results.incorrect_answers,
          c_answer: data.results.correct_answer,
          difficulty: data.results.difficulty,
          isHeld: false,
          isCorrect: false
        }))
      })
  }, [startGame])

  // Functions
  function startGameHandle() {
    setStartGame(prevStartGame => !prevStartGame)
  }

  function selectAnswer() {
    console.log("select");
  }

  const questionsElement = questions.map(question => (<Question key={nanoid()} data={question} answerClick={selectAnswer} />))

  return (
    <div>
      {
        !startGame
          ?
          <Start startGame={startGameHandle} />
          :
          <div>
            {questionsElement}
          </div>
      }
    </div>
  )
}