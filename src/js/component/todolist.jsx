import React, { useState, useEffect } from "react";
import Styles from "../../styles/index.css";

export const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newLabel, setNewLabel] = useState("");

    const host = 'https://playground.4geeks.com/todo';
    const user = 'ricardemese';

    const getPublications = async () => {
        const uri = `${host}/users/${user}`;
        const response = await fetch(uri);
        if (!response.ok) createUser()
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

    const createUser = async () => {
        const uri = `${host}/users/${user}`
        const options = {
            method: 'POST'
        }
        const response = await fetch(uri, options)
        if (!response.ok) return console.log(response)
        getPublications()

    }

    useEffect(() => {
        getPublications();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            createPublication();
            setNewLabel('');
        }
    }

    const Trash = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>)
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "10px",
            }}
        >
            <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={() => createPublication()}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Send
            </button>
            <ul
                style={{
                    listStyleType: "none",
                    paddingLeft: "0",
                    width: "100%",
                    maxWidth: "400px",
                    border: todoList.length > 0 ? "2px solid #ccc" : "none",
                    padding: todoList.length > 0 ? "10px" : "0",
                }}
            >
                {todoList.map((todo) => {

                    return (
                        <li
                            key={todo.id}
                            onClick={() => deletePublication(todo.id)}
                            style={{
                                backgroundColor: "#f8f9fa",
                                padding: "10px",
                                marginBottom: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <p style={{ margin: "0", fontSize: "18px" }}>
                                    {todo.label}
                                </p>
                                <span style={{ marginLeft: "10px", color: "red" }}>{Trash}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
