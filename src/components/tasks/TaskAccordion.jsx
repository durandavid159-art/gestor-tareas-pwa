import { useState } from "react";
import Swal from "sweetalert2";

export const TaskAccordion = ({
    task,
    onDelete,
    onArchive,
    onUpdate
}) => {

    const [open, setOpen] =
        useState(false);

    const [editing, setEditing] =
        useState(false);

    const [title, setTitle] =
        useState(task.title);

    const [description,
        setDescription] =
        useState(task.description);

    const [estimatedTime,
        setEstimatedTime] =
        useState(task.estimatedTime);

    const handleSave = async () => {

        if (!title.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Nombre obligatorio"
            });

            return;
        }

        try {

            await onUpdate(task.id, {

                title,

                description,

                estimatedTime:
                    Number(estimatedTime),

                updatedAt:
                    new Date()
            });

            setEditing(false);

            Swal.fire({
                icon: "success",
                title:
                    "Tarea actualizada"
            });

        } catch {

            Swal.fire({
                icon: "error",
                title:
                    "Error al actualizar"
            });

        }
    };

    return (

        <div
            className="glass-card"
            style={{
                marginBottom: "15px",
                padding: "15px"
            }}
        >

            <div
                onClick={() =>
                    setOpen(!open)
                }
                style={{
                    cursor: "pointer"
                }}
            >

                <h3>
                    {task.title}
                </h3>

            </div>

            {

                open && (

                    <div>

                        {

                            editing ? (

                                <>

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <br />
                                    <br />

                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <br />
                                    <br />

                                    <input
                                        type="number"
                                        value={estimatedTime}
                                        onChange={(e) =>
                                            setEstimatedTime(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <br />
                                    <br />

                                    <button
                                        className="btn-primary"
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </button>

                                </>

                            ) : (

                                <>

                                    <p>
                                        {task.description}
                                    </p>

                                    <p>
                                        Tiempo estimado:
                                        {" "}
                                        {task.estimatedTime}
                                        {" "}min
                                    </p>

                                    <p>
                                        Estado:
                                        {" "}
                                        {task.status}
                                    </p>

                                    <button
                                        className="btn-secondary"
                                        onClick={() =>
                                            setEditing(true)
                                        }
                                    >
                                        Editar
                                    </button>

                                    {" "}

                                    <button
                                        className="btn-secondary"
                                        onClick={() =>
                                            onArchive(task.id)
                                        }
                                    >
                                        Archivar
                                    </button>

                                    {" "}

                                    <button
                                        className="btn-primary"
                                        onClick={() =>
                                            onDelete(task.id)
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </>

                            )

                        }

                    </div>

                )

            }

        </div>

    );
};