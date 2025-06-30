import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosinstance';

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data; // Return the uploaded image response
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error; // Let calling function handle the error
  }
};

export default uploadImage;
