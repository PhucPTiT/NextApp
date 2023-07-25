"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [mesages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversationId} = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])


    return (<div className="flex-1 overflow-y-auto">
            {mesages.map((mesage, i) => (
                <MessageBox
                    isLast = {i=== mesages.length - 1}
                    key = {mesage.id}
                    data ={mesage}
                />
            ))}
            <div ref = {bottomRef} className="pt-24"></div>
        </div>  );
}
 
export default Body;