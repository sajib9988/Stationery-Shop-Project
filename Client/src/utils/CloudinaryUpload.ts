export const uploadImageToCloudinary = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "stationery shop");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dyqm6ffjt/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    // console.log("Cloudinary upload result:", result);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};
