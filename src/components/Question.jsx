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
    const answers = props.data.answers.sort(() => Math.random() - 0.5)

    const optionsAnswers = answers.map(answer => <label key={answer} htmlFor={answer}><input type="radio" checked={props.data.select_answer  === answer} onChange={(e) => props.handleChange(e, props.data.id)} value={answer} id={answer} name={props.data.id}/>{answer}</label>)

    return (
        <div>
            <h2>{props.data.question}</h2>
            <div>
                {optionsAnswers}
            </div>
        </div>
    )
}