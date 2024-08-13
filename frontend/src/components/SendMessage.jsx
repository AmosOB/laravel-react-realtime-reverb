import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from './apis';

const SendMessage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        message: '',
        recipient_id: id
    });


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (formData.message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        api.post(`/message/send`, formData)
        .then((res) => {
            setFormData({ ...formData, message: ''});
        })
        .catch((err) => {
            console.log(err);
        })
    }

  return (
    <div className='w-full fixed bottom-2 mr-4'>
        <form
            onSubmit={ handleSendMessage }
            className="max-w-md z-50 w-full mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={ formData.message }
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    id="message"
                    name="message"
                    className="block w-full p-4 ps-10 text-sm text-gray-900
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Send Message..."/>

                <input
                    type="hidden"
                    value={ formData.recipient_id }
                    onChange={(e) => setFormData({ ...formData, recipient_id: e.target.value })}
                    id="recipient_id"
                    name="recipient_id"/>
                <button
                    type="submit"
                    className="text-white absolute end-2.5
                    bottom-2.5 bg-blue-700 hover:bg-blue-800
                    focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
            </div>
        </form>
    </div>
  )
}

export default SendMessage
