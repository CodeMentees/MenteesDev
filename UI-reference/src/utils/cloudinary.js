// Cloudinary Upload Utility
// Free tier: 25 GB storage, 25GB monthly bandwidth
import api from '../services/api';

export const uploadToCloudinary = async (file, folder = 'courses') => {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    // Upload via backend API (backend handles Cloudinary credentials)
    const response = await api.post('/upload/cloudinary', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const data = response.data;
    return {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
      size: data.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file');
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await api.delete('/upload/cloudinary/delete', {
      data: { publicId }
    });

    return response.data;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file');
  }
};

// Validate file before upload
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  } = options;

  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed`);
  }

  return true;
};

// Generate optimized image URL from Cloudinary
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width = 800,
    height,
    quality = 'auto',
    format = 'auto'
  } = options;

  // Insert transformations before 'upload' in the URL
  const transformations = `w_${width}${height ? `,h_${height}` : ''},q_${quality},f_${format}`;
  return url.replace('/upload/', `/upload/${transformations}/`);
};
