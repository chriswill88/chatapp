import Chatr from "./Chatr/Chatr"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Draggable } from "gsap/Draggable";
import { useRef, useState } from "react";
import Chatroom from "./Chatroom/Chatroom";


gsap.registerPlugin(useGSAP, Draggable);

export default function ChatArea({}) {
    // const [triggerWords, setTriggerWords] = useState([]);
    // const triggerWords = useRef(null);

    // Draggable.create(".chatroom-container", {
    //     bounds: ".chatarea-container",
    //     trigger: triggerWords.current
    // });
    const fixture = [{roomid: "room1", name: "Life Chat"}, {roomid: "room2", name: "Romance Chat"}]
    let containers = document.querySelectorAll(".chatroom-container");
    console.log("containers", containers)

    containers.forEach((cont) => {
        let handle = cont.querySelector('.grabme')
        Draggable.create(cont, {
            bounds: ".chatarea-container",
            trigger: handle
        });
    });

    
    return <div className="chatarea-container">
        {
            fixture.map((room, id) => {
                return (<Chatroom key={id} roomObj={room}/>)
            })
        }
    </div>
}