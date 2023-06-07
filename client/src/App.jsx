import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";


const socket = io( 'http://localhost:3001' );
function App ()
{
  const [ messages, setMessages ] = useState( [] );
  const [ input, setInput ] = useState( '' );

  useEffect( () =>
  {
    socket.on( 'chat message', ( msg ) =>
    {
      setMessages( ( prevMessages ) => [ ...prevMessages, { text: msg, sender: false } ] );
    } );
  }, [] );

  const handleInputChange = ( e ) =>
  {
    setInput( e.target.value );
  };

  const handleSubmit = ( e ) =>
  {
    e.preventDefault();
    if ( input.trim() !== '' )
    {
      socket.emit( 'chat message', input );
      setMessages( ( prevMessages ) => [ ...prevMessages, { text: input, sender: true } ] );
      setInput( '' );
    }
  };

  return (
    <div>
      <ul>
        { messages.map( ( message, index ) => (
          <li
            key={ index }
            style={ {
              textAlign: message.sender ? 'right' : 'left',
              listStyle: 'none',
              padding: '5px',
            } }
          >
            { message.text }
          </li>
        ) ) }
      </ul>
      <form onSubmit={ handleSubmit }>
        <input type="text" value={ input } onChange={ handleInputChange } />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
