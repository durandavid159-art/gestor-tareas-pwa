export const ProductivitySummary = ({ tasks }) => {

    const totalTasks =
        tasks.length;

    const completedTasks =
        tasks.filter(
            task =>
                task.status === "completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            task =>
                task.status === "pending"
        ).length;

    const archivedTasks =
        tasks.filter(
            task =>
                task.archived === true
        ).length;

    const estimatedSeconds =
        tasks.reduce(
            (total, task) =>
                total +
                (task.estimatedTime || 0) * 60,
            0
        );

    const spentSeconds =
        tasks.reduce(
            (total, task) =>
                total +
                (task.timeSpent || 0),
            0
        );

    const estimatedHours =
        (estimatedSeconds / 3600)
            .toFixed(1);

    const spentHours =
        (spentSeconds / 3600)
            .toFixed(1);

    const difference =
        (
            spentHours -
            estimatedHours
        ).toFixed(1);

    return (

        <div
            className="glass-card"
            style={{
                padding: "20px",
                marginBottom: "20px"
            }}
        >

            <h2>
                Resumen General
            </h2>

            <p>
                Total tareas:
                {" "}
                {totalTasks}
            </p>

            <p>
                Pendientes:
                {" "}
                {pendingTasks}
            </p>

            <p>
                Completadas:
                {" "}
                {completedTasks}
            </p>

            <p>
                Archivadas:
                {" "}
                {archivedTasks}
            </p>

            <hr />

            <p>
                Tiempo estimado:
                {" "}
                {estimatedHours}
                h
            </p>

            <p>
                Tiempo invertido:
                {" "}
                {spentHours}
                h
            </p>

            <p>
                Diferencia:
                {" "}
                {difference}
                h
            </p>

        </div>

    );
};