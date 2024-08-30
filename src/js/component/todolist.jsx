import React, { useState, useEffect } from "react";

export const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newLabel, setNewLabel] = useState("");

    const host = 'https://playground.4geeks.com/todo';
    const user = 'ricardemese';

    const getPublications = async () => {
        const uri = `${host}/users/${user}`;
        const response = await fetch(uri);
        if (!response.ok) console.log(response.status);
        const data = await response.json();
        console.log(data.todos);

        setTodoList(data.todos);
    }
    
    const deletePublication = async (id) => {
        const uri = `${host}/todos/${id}`;
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(uri, options);
        if (!response.ok) return;
        getPublications();
    }

    const createPublication = async () => {
        const uri = `${host}/todos/${user}`;
        console.log(newLabel);
         const headers = {
            'Content-Type': 'application/json',
        };
        const body = {
            "label": newLabel,
            "is_done": false
          };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        }
        const response = await fetch(uri, options);
        if (!response.ok) return;
        getPublications();
    }


    useEffect(() => {
        getPublications();
    }, []);

    const Trash = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>)
    return (
        <>
        <input type="text" onChange={(e) => setNewLabel(e.target.value)} /><button onClick={(e) => createPublication()}>Send</button>
        <ul>
            {todoList.map((todo) => {
                return <li key={todo.id} onClick={() => deletePublication(todo.id)}>
                    <div>
                        <p>{todo.label} {Trash}</p>
                    </div>
                </li>
            }
            )}
        </ul>
        </>
    );
}
