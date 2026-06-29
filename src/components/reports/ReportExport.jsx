import { CSVLink } from "react-csv";
import { useTasks } from "../../hooks/useTasks";

export const ReportExport = () => {

    const { tasks } = useTasks();

    const reportData = tasks.map(task => ({
        ID: task.id,
        Nombre: task.title,
        Estado: task.status,
        TiempoInvertido: task.timeSpent || 0,
        TiempoEstimado: task.estimatedTime || 0
    }));

    return (

        <CSVLink

            data={reportData}

            filename="reporte-productividad.csv"

            className="btn-primary"

        >

            Exportar CSV

        </CSVLink>

    );
};