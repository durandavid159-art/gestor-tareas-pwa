import { useTasks } from '../hooks/useTasks';
import {TaskForm} from '../components/tasks/TaskForm'
import {TaskAccordion} from '../components/tasks/TaskAccordion'
import { CommentSection } from '../components/tasks/CommentSection'
import {ProductivitySummary} from '../components/reports/ProductivitySummary'
import {ProductivityCards} from '../components/reports/ProductivityCards'
import { ReportExport } from '../components/reports/ReportExport'
import { ExcelExport } from '../components/reports/ExcelExport'
import { PdfExport } from '../components/reports/PdfExport'
import Swal from 'sweetalert2';
import "../styles/Auth.css"

export const Dashboard = () => {
    const { tasks, addTask, updateTask, deleteTask, archiveTask, addComment, startTimer, pauseTimer, addAttachment, toggleTaskStatus} = useTasks();
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

            <ProductivityCards
                tasks={tasks}
            />

            <ProductivitySummary
                tasks={tasks}
            />

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >
                <ReportExport />

                <ExcelExport />

                <PdfExport />
            </div>

            <TaskForm onCreate={addTask}/>

            <br />

            {activeTasks.map(task => (
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
                        onToggleStatus={toggleTaskStatus}
                    />

                ))
            }

        </div>
    );
};