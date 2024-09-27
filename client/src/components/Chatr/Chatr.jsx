const exit = () => {
    console.log("exit");
}

const mini = () => {
    console.log("mini");
}

export default function Chatr({roomObj}) {
    return <div className="chatroom-container">
        <div className="topbar">
            <div> {roomObj?.name} </div>
            <div className="grabme">|  |  |  |  |  |  |</div>
            <div className="cm-group">
                <span className="exit" onClick={() => exit()}>x</span>
                <span className="mini" onClick={() => mini()}>-</span>
                {/* <span ></span> */}
            </div>
        </div>

        <div className="inner-chat">
                   {/* display screen for posts */}
            
        </div>

        { <form className="textbox-container" onSubmit={null}>
            <textarea id="output" rows={1} onChange={null} className="textbox" placeholder='Write your message...' name="comment"/>
            <button className="send-button" type="submit">send</button>
        </form>}
    </div>
}