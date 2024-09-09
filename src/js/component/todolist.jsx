import React, { useState, useEffect } from "react";

export const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [editLabel, setEditLabel] = useState("");
    const [editId, setEditId] = useState(null);

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

    //Crear una tarea
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
        };

        try {
            const response = await fetch(uri, options);
            if (!response.ok) return Error('Error al crear la tarea');
            getPublications();
            setNewLabel('');
        } catch (error) {
            console.log('Error al crear la tarea', error);
        }
    }

    //Editar una tarea
    const editPublication = async (id) => {
        const uri = `${host}/todos/${id}`;
        const headers = {
            'Content-Type': 'application/json',
        }

        const body = {
            "label": editLabel,
            "is_done": false
        };

        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: headers
        };

        try {
            const response = await fetch(uri, options);
            if (!response.ok) return Error('Error al editar la tarea');
            getPublications();
            setEditId(null);
            setEditLabel('');
        } catch (error) {
            console.log('Error al editar la tarea', error);
        }
    }

    //Eliminar tarea
    const deletePublication = async (id) => {
        const uri = `${host}/todos/${id}`;
        const options = {
            method: 'DELETE',
        }
        try {
            const response = await fetch(uri, options);
            if (!response.ok) return Error('Error al eliminar la tarea');
            getPublications();
        } catch (error) {
            console.log('Error al eliminar la tarea', error);
        }
    }



    useEffect(() => {
        getPublications();
    }, []);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (editId !== null) {
                await editPublication(editId);
            } else {
                await createPublication();
            }
        }
    }

    const handleBlur = async () => {
        if (editId !== null) {
            await editPublication(editId);
        }
    }

    const Trash = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
    );

    const Pencil = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.233.13l-5 1a.5.5 0 0 1-.606-.606l1-5a.5.5 0 0 1 .13-.233l10-10zM11.207 2L3 10.207V11h.793L13 3.793 11.207 2zM2 12v1h1l8.207-8.207-1-1L2 12z" />
        </svg>
    );

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
                Add
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
                {todoList.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            backgroundColor: "#f8f9fa",
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {editId === todo.id ? (
                            <input
                                type="text"
                                value={editLabel}
                                onChange={(e) => setEditLabel(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        editPublication(todo.id);
                                    }
                                }}
                                onBlur={handleBlur}
                                style={{
                                    fontSize: "18px",
                                    padding: "5px",
                                    flex: 1,
                                    marginRight: "10px",
                                }}
                            />
                        ) : (
                            <p style={{ margin: "0", fontSize: "18px", flex: 1 }}>
                                {todo.label}
                            </p>
                        )}
                        <span
                            onClick={() => {
                                if (editId === todo.id) {
                                    editPublication(todo.id);
                                } else {
                                    setEditId(todo.id);
                                    setEditLabel(todo.label);
                                }
                            }}
                            style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
                        >
                            {Pencil}
                        </span>
                        <span
                            onClick={() => deletePublication(todo.id)}
                            style={{ color: "red", cursor: "pointer" }}
                        >
                            {Trash}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}