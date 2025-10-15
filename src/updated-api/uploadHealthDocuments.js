// src/api/post/uploadHealthDocuments.js

const API_BASE = import.meta.env.VITE_API_BASE;
export const uploadHealthDocuments = async (visitId, files) => {
  if (!files || files.length === 0) return;

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await fetch(
    `${API_BASE}/api/health-records/${visitId}/documents`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload documents");
  }

  return await response.json();
};
