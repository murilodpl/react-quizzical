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
    const answers = props.data.i_answer.map(i_answers => <button key={i_answers} onClick={props.answerClick}>{i_answers}</button>)
    answers.splice((Math.ceil(Math.random() * 4)), 0, <button key={props.data.c_answer} id={props.data.c_answer}>{props.data.c_answer}</button>)

    return (
        <div>
            <h2>{props.data.question}</h2>
            <div>
                {answers}
            </div>
        </div>
    )
}