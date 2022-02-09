export default function Question(props) {
    /*
    props
        data
          question: data.results.question,
          i_answer: data.results.incorrect_answers,
          c_answer: data.results.correct_answer,
          difficulty: data.results.difficulty,
          isHeld: false,
          isCorrect: false
    */
    const c_answer = props.data.correct_answer
    const answers = props.data.incorrect_answers
    answers.splice((Math.ceil(Math.random() * 4)), 0, c_answer)

    return (
        <div>
            <h2>{props.data.question}</h2>
            <div>
                {answers}
            </div>
        </div>
    )
}