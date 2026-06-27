import { CSVLink } from "react-csv";
import { useTasks } from "../../hooks/useTasks";

export const ReportExport = () => {
    const { tasks } = useTasks();

    // Mapeamos los datos crudos a un formato amigable para el reporte
    const reportData = tasks.map(task => ({
        "ID de Tarea": task.id,
        "Nombre": task.title,
        "Estado": task.status,
        "Tiempo Invertido (Min)": task.timeSpent,
        "Fecha de Creación": task.createdAt?.toDate().toLocaleDateString()
    }));

    return (
        <div>
            <h3>Reporte de Productividad</h3>
            {tasks.length > 0 ? (
                <CSVLink
                    data={reportData}
                    filename={"mis-tareas-reporte.csv"}
                    className="btn-export"
                >
                    Descargar Reporte en Excel
                </CSVLink>
            ) : (
                <p>No hay tareas para exportar.</p>
            )}
        </div>
    );
};