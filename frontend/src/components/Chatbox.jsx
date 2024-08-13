import React, { useEffect, useRef, useState } from 'react'
import SendMessage from './SendMessage'
import api from './apis';
import { useParams } from 'react-router-dom';
import echo from './echo';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [authId, setAuthId] = useState();
    const { id } = useParams();
    const scroll = useRef(null);

    useEffect(() => {

        fetchMessages();

            const channel = echo.channel('message');
            channel.listen('MessageSent', (e) => {
                // console.log(e);
                setMessages(prevMessages => [...prevMessages, e.message]);
                setTimeout(scrollToBottom, 0);
            });


            return () => {
                channel.stopListening('MessageSent');
                echo.leaveChannel('message');
            };


    }, []);

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            if(id)
            {
                const response = await api.get(`/messages/${id}`);
                setMessages(response.data.messages);
                // console.log(response.data);
                setAuthId(response.data.currentUser);
                setTimeout(scrollToBottom, 0);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className="p-4 sm:ml-64 mt-14">
            <div
                className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    { messages.map( message => (
                        <div key={message.id} className={`flex items-start mb-10
                        ${message.sender_id === authId ? 'justify-end' : '' } gap-2.5`}>
                        <img className="w-8 h-8 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                            alt="Jese image"/>
                        <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4
                            border-gray-200 ${message.sender_id === authId ? 'bg-blue-100' : 'bg-gray-100' } rounded-e-xl rounded-es-xl
                            dark:bg-gray-700`}>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    { message.sender_id === authId ? 'You' : message.sender.name}</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                { message.message }</p>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                        </div>
                    </div>
                    ))}




            </div>

            <span ref={scroll}></span>

            <SendMessage />


        </div>

    </>
  )
}

export default Chatbox
