import { useEffect, useState } from "react"
import { nanoid } from 'nanoid'

import Question from "./components/Question"
import Start from "./components/Start"

export default function App() {
  // Variables
  const [startGame, setStartGame] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestions(() => {
          let newArray = []

          for (let i = 0; i < data.results.length; i++) {
            newArray.push({
              id: nanoid(),
              question: data.results[i].question,
              correct_answer: data.results[i].correct_answer,
              answers: [...data.results[i].incorrect_answers, data.results[i].correct_answer],
              select_answer: '',
              isCorrect: false
            })
          }

          return newArray
        })
      })
  }, [newGame])

  console.log(questions)

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

  const questionsElement = questions.map(question => ([<Question key={question.id} data={question} handleChange={selectAnswer} />]))

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