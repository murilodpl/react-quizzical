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
    const answers = props.data.answers

    const optionsAnswers = answers.map(answer =>
        <span key={answer} className={(c_answer == answer && props.playAgain) ? 'correctAnswer' : ''}>
            <input type="radio" disabled={props.playAgain ? true : false} checked={props.data.select_answer === answer} onChange={(e) => props.handleChange(e, c_answer, props.data.id)} value={answer} id={props.data.id + answer} name={props.data.id} />
            <label htmlFor={props.data.id + answer}>{answer}</label>
        </span>)

    return (
        <div className="questionDiv">
            <h2>{props.data.question}</h2>
            <div className={`questionSelect ${props.playAgain && "playAgain"}`}>
                {optionsAnswers}
            </div>
        </div>
    )
}
