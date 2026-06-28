import { useState } from "react";
import Swal from "sweetalert2";

export const TaskForm = ({ onCreate }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!title.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Nombre obligatorio",
                text: "Debes ingresar un nombre para la tarea."
            });

            return;
        }

        onCreate({
            title,
            description,
            estimatedTime: Number(estimatedTime)
        });

        setTitle("");
        setDescription("");
        setEstimatedTime("");
    };

    return (

        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                placeholder="Nombre de la tarea"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <input
                type="number"
                placeholder="Tiempo estimado (min)"
                value={estimatedTime}
                onChange={(e) =>
                    setEstimatedTime(e.target.value)
                }
            />

            <button
                type="submit"
                className="btn-primary"
            >
                Crear Tarea
            </button>

        </form>
    );
};