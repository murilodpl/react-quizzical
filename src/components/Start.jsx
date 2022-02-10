export default function Start(props) {
    return (
        <div className="startScreen">
            <h1>Quizzical</h1>
            <p>I'm a puzzle of different topics</p>
            <button className="btn-quiz" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}