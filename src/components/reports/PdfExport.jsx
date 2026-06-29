import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTasks } from "../../hooks/useTasks";

export const PdfExport = () => {

    const { tasks } = useTasks();

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text(
            "Reporte de Productividad",
            14,
            20
        );

        const tableData = tasks.map(task => [

            task.title,

            task.status,

            task.estimatedTime || 0,

            task.timeSpent || 0

        ]);

        autoTable(doc, {

            startY: 30,

            head: [[
                "Tarea",
                "Estado",
                "Tiempo Estimado",
                "Tiempo Invertido"
            ]],

            body: tableData

        });

        doc.save(
            "reporte-productividad.pdf"
        );
    };

    return (

        <button
            className="btn-secondary"
            onClick={exportPDF}
        >
            Exportar PDF
        </button>

    );
};