export const uploadFileToCloudinary = async (file) => {

    const url =
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;

    const formData =
        new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {

        const res =
            await fetch(url, {
                method: "POST",
                body: formData
            });

        const data = await res.json();

        console.log(JSON.stringify(data, null, 2));/*++++++++++++++*/

        if (!data.secure_url) {
            throw new Error("Upload failed");
        }

        return {
            id: crypto.randomUUID(),
            url: data.secure_url,
            name: file.name,
            type: file.type.startsWith("image")
                ? "image"
                : "pdf",
            createdAt: new Date().toISOString()
        };

    } catch (error) {

        console.error(error);

        throw error;
    }
};