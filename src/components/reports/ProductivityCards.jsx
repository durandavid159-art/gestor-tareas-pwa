export const ProductivityCards = ({ tasks }) => {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task =>
                task.status === "completed"
        ).length;

    const pending =
        tasks.filter(
            task =>
                task.status === "pending"
        ).length;

    const completionRate =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit,minmax(200px,1fr))",
                gap: "15px",
                marginBottom: "20px"
            }}
        >

            <div
                className="glass-card"
                style={{
                    padding: "20px"
                }}
            >
                <h3>Total</h3>
                <h2>{total}</h2>
            </div>

            <div
                className="glass-card"
                style={{
                    padding: "20px"
                }}
            >
                <h3>Completadas</h3>
                <h2>{completed}</h2>
            </div>

            <div
                className="glass-card"
                style={{
                    padding: "20px"
                }}
            >
                <h3>Pendientes</h3>
                <h2>{pending}</h2>
            </div>

            <div
                className="glass-card"
                style={{
                    padding: "20px"
                }}
            >
                <h3>Productividad</h3>
                <h2>{completionRate}%</h2>
            </div>

        </div>

    );
};