import { useTasks } from '../hooks/useTasks';
import {TaskForm} from '../components/tasks/TaskForm'
import {TaskAccordion} from '../components/tasks/TaskAccordion'
import { CommentSection } from '../components/tasks/CommentSection'
import Swal from 'sweetalert2';
import "../styles/Auth.css"

export const Dashboard = () => {
    const { tasks, addTask, updateTask, deleteTask, archiveTask, addComment, startTimer, pauseTimer, addAttachment} = useTasks();
    const activeTasks = tasks.filter(task => !task.archived);

    const handleCreate = () => {
        
        addTask({
            uuid: "",
            title: "",
            description: "",
            estimatedTime: 0,
            timeSpent: 0,
            status: "pending",
            archived: false,
            createdAt: Date,
            updatedAt: Date
        });
    };

    const handleDelete = (taskId) => {
        Swal.fire({
            title:
                "¿Eliminar tarea?",
            icon: "warning",
            showCancelButton: true
        }).then(result => {
            if (
                result.isConfirmed
            ) {
                deleteTask(taskId);
            }
        });

    };

    const handleArchive = (
        taskId
    ) => {

        archiveTask(taskId);

        Swal.fire({
            icon: "success",
            title:
                "Tarea archivada"
        });

    };

    return (
        <div className="glass-container">

            <h1>
                Mis Tareas
            </h1>

            <TaskForm
                onCreate={addTask}
            />

            <br />

            {
                activeTasks.map(task => (

                    <TaskAccordion
                        key={task.id}
                        task={task}
                        onDelete={handleDelete}
                        onArchive={handleArchive}
                        onUpdate={updateTask}
                        onAddComment={addComment}
                        onStartTimer={startTimer}
                        onPauseTimer={pauseTimer}
                        onAddAttachment={addAttachment}
                    />

                ))
            }

        </div>
    );
};