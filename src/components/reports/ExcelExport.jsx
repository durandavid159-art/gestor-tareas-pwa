import * as XLSX from "xlsx";
import { useTasks } from "../../hooks/useTasks";

export const ExcelExport = () => {

    const { tasks } = useTasks();

    const exportToExcel = () => {

        const reportData = tasks.map(task => ({
            ID: task.id,
            Nombre: task.title,
            Estado: task.status,
            TiempoInvertido: task.timeSpent || 0,
            TiempoEstimado: task.estimatedTime || 0
        }));

        const worksheet =
            XLSX.utils.json_to_sheet(reportData);

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Tareas"
        );

        XLSX.writeFile(
            workbook,
            "reporte-productividad.xlsx"
        );
    };

    return (
        <button
            className="btn-primary"
            onClick={exportToExcel}
        >
            Exportar Excel
        </button>
    );
};