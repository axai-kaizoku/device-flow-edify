export const getImageUrl = async (data: { file: File }, category: string) => {
    const formData = new FormData();
    formData.append("file", data.file);
    try {
      const response = await fetch("https://api.edify.club/edifybackend/v1/file/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
      console.log(response);
      return await response.json(); 
    } catch (error) {
      console.error("Error uploading the image:", error);
      throw error;
    }
  };
  