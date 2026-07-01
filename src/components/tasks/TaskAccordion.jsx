import { useState } from "react";
import Swal from "sweetalert2";
import { CommentSection } from "./CommentSection";
import { TimerDisplay } from "./TimerDisplay";
import {AttachmentSection} from "./AttachmentSection";
import '../../styles/tasks.css';

export const TaskAccordion = ({
    task,
    onDelete,
    onArchive,
    onUpdate,
    onAddComment,
    onStartTimer,
    onPauseTimer,
    onAddAttachment,
    onToggleStatus
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

        <div className="task-card">

            <div className="task-header"
                onClick={() => setOpen(!open)}
            >

                <h3 className="task-title">
                    {task.title}
                </h3>

                <span className="task-chevron">
                    {open ? "▲" : "▼"}
                </span>

            </div>
            {
                open && (
                    <div className="task-content">
                        {
                            editing ? (

                                <>
                                    <div className="task-edit-form">

                                        <input  className="task-input"
                                            type="text"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <input  className="task-input"
                                            type="text"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <input  className="task-input"
                                            type="number"
                                            value={estimatedTime}
                                            onChange={(e) =>
                                                setEstimatedTime(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            className="btn-primary"
                                            onClick={handleSave}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </>

                            ) : (

                                <>

                                    <p className="task-description">
                                        {task.description}
                                    </p>

                                    <div className="task-meta">

                                        <span> Tiempo estimado: 
                                            {task.estimatedTime} min
                                        </span>

                                        <div
                                            className={
                                                task.status === "completed"
                                                    ? "status-badge status-completed"
                                                    : "status-badge status-pending"
                                            }
                                        >
                                            {   
                                                task.status === "completed"
                                                    ? "✅ Completada"
                                                    : "🕒 Pendiente"
                                            }
                                        </div>

                                    </div>

                                    <div className="task-timer">
                                        <TimerDisplay task={task} />
                                    </div>

                                    <div className="task-actions">

                                        <button
                                            className={
                                                task.status === "completed"
                                                    ? "btn-secondary"
                                                    : "btn-primary"
                                            }
                                            onClick={() =>
                                                onToggleStatus(
                                                    task.id,
                                                    task.status
                                                )
                                            }
                                        >
                                            {
                                                task.status === "completed"
                                                    ? "Reabrir tarea"
                                                    : "Completar tarea"
                                            }
                                        </button>

                                        {
                                            task.timerRunning
                                            ? (
                                                <button
                                                    className="btn-secondary"
                                                    onClick={() =>
                                                        onPauseTimer(task.id)
                                                    }
                                                >
                                                    Pausar
                                                </button>
                                            )
                                            : (
                                                <button
                                                    className="btn-primary"
                                                    onClick={() =>
                                                        onStartTimer(task.id)
                                                    }
                                                >
                                                    Iniciar
                                                </button>
                                            )
                                        }

                                    </div>
                                        
                                    <div className="task-section">
                                        <CommentSection
                                            comments={task.comments}
                                            onAddComment={(comment) =>
                                                onAddComment(
                                                    task.id,
                                                    comment
                                                )
                                            }
                                        />
                                    </div>   
                                                                    
                                    <div className="task-actions">
                                        <button
                                            className="btn-secondary"
                                            onClick={() =>
                                                setEditing(true)
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn-secondary"
                                            onClick={() =>
                                                onArchive(task.id)
                                            }
                                        >
                                            Archivar
                                        </button>

                                        <button
                                            className="btn-primary"
                                            onClick={() =>
                                                onDelete(task.id)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>

                                    <div className="task-section">
                                        <AttachmentSection
                                            attachments={task.attachments}
                                            onUpload={(file) =>
                                                onAddAttachment(task.id, file)
                                            }
                                        />
                                    </div>

                                </>

                            )

                        }

                    </div>

                )

            }

        </div>

    );
};