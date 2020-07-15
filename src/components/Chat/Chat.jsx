import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import { InfoBar, Input, Messages, TextContainer } from '../index'

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('')

    const ENDPOINT = 'https://react-chat-application4.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(( ) => {
        socket.on("message", message => {
          setMessages(msgs => [...msgs, message]);
        });

        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    },  [ ]);


        const sendMessage = (event) => {
            event.preventDefault();
            if (message) {
                socket.emit('sendMessage', message, () => setMessage(''))
            }

    }
    
        return (
            <div className='outerContainer'>
                <div className='container'>

                    <InfoBar room={room} />
                    <Messages messages={messages} name={name}></Messages>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
                </div>
                <TextContainer users={users}/>
            </div>
        );
    }

export default Chat;



