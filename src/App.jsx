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
        setQuestions(() => {
          let newArray = []

          for (let i = 0; i < data.results.length; i++) {
            newArray.push({
              ...data.results[i],
              id: nanoid(),
              isCorrect: false
            })
          }

          return newArray
        })
      })
  }, [startGame])

  console.log(questions)

  // Functions
  function startGameHandle() {
    setStartGame(prevStartGame => !prevStartGame)
  }

  function selectAnswer(e, c_answer) {
    console.log(e.target);
    if(c_answer) {
      console.log('CERTA A RESPOSTA')
    }
  }

  const questionsElement = questions.map(question => ([<Question key={question.id} data={question} answerClick={(e) => selectAnswer(e, question.id)} />]))

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