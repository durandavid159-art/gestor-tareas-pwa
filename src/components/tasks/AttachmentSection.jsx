import { useState } from "react";
import Swal from "sweetalert2";

export const AttachmentSection = ({attachments = [], onUpload}) => {

    console.log("Attachments:", attachments); /*+++++++++++++ */

    const [file, setFile] = useState(null);

    const handleUpload = () => {
        console.log("Archivo seleccionado:", file); /* +++++++++++++++++*/ 
        if (!file) {

            Swal.fire({
                icon: "warning",
                title: "Selecciona un archivo"
            });

            return;
        }

        onUpload(file);

        setFile(null);
    };

    return (

        <div>

            <h4>Adjuntos</h4>

            <div>

                {attachments.length === 0 && (
                    <p>No hay archivos</p>
                )}

                {attachments.map((att) => (

                    <div
                        key={att.id}
                        style={{
                            marginBottom: "10px"
                        }}
                    >

                        {att.type === "image" ? (

                            <img
                                src={att.url}
                                alt={att.name}
                                width="120"
                                style={{
                                    borderRadius: "8px"
                                }}
                            />

                        ) : (

                            <a
                                href={att.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                📄 {att.name}
                            </a>

                        )}

                    </div>

                ))}

            </div>

            <input

                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                    console.log(e.target.files);
                    setFile(e.target.files[0]);
                }}
                /**type="file"
                accept="image/*,.pdf"  
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }*/
            />

            <button
                className="btn-primary"
                onClick={handleUpload}
            >
                Subir archivo
            </button>

        </div>

    );
};