import { useTasks } from '../hooks/useTasks';
import Swal from 'sweetalert2';

export const Dashboard = () => {
    const { tasks, addTask, deleteTask } = useTasks();

    const handleCreate = () => {
        
        addTask({
            title: 'Nueva Tarea de Prueba',
            description: 'Descripción base',
            status: 'pending',
            timeSpent: 0
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) deleteTask(id);
        });
    };

    return (
        <div className='glass-container'>
            <h1>Mis Tareas</h1>
            <button onClick={handleCreate}>Crear Tarea Rápida</button>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>{task.title}</h3>
                        <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};