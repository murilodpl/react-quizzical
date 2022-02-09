export default function Start(props) {
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.startGame}>Start quiz</button>
        </div>
    )
}