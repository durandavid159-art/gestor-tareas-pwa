import { useState } from "react";
import Swal from "sweetalert2";

export const CommentSection = ({
    comments = [],
    onAddComment
}) => {

    const [comment, setComment] =
        useState("");

    const handleSubmit = () => {

        if (!comment.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Comentario vacío"
            });

            return;
        }

        onAddComment(comment);

        setComment("");
    };

    return (

        <div>

            <h4>Comentarios</h4>

            <div>

                {

                    comments.length > 0 ? (

                        comments.map(comment => (

                            <div
                                key={comment.id}
                                style={{
                                    marginBottom: "10px"
                                }}
                            >

                                <p>
                                    {comment.text}
                                </p>

                                <small>

                                    {
                                        new Date(
                                            comment.createdAt
                                        ).toLocaleString()
                                    }

                                </small>

                            </div>

                        ))

                    ) : (

                        <p>
                            Sin comentarios
                        </p>

                    )

                }

            </div>

            <input
                type="text"
                placeholder="Escribe un comentario..."
                value={comment}
                onChange={(e) =>
                    setComment(
                        e.target.value
                    )
                }
            />

            <button
                className="btn-primary"
                onClick={handleSubmit}
            >
                Agregar
            </button>

        </div>

    );
};