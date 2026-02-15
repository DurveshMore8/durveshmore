const API_BASE_URL = "http://localhost:5000/api";

// Helper function to make API calls
const apiCall = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Project APIs
export const getProjects = async () => {
  return apiCall("/projects");
};

export const getProjectById = async (id) => {
  return apiCall(`/projects/${id}`);
};

// Blog APIs
export const getBlogs = async () => {
  return apiCall("/blogs");
};

export const getBlogById = async (id) => {
  return apiCall(`/blogs/${id}`);
};

// Experience APIs
export const getExperience = async () => {
  return apiCall("/experience");
};

export const getExperienceById = async (id) => {
  return apiCall(`/experience/${id}`);
};

// Skills APIs
export const getSkills = async () => {
  return apiCall("/skills");
};

export const getSkillById = async (id) => {
  return apiCall(`/skills/${id}`);
};

export default {
  getProjects,
  getProjectById,
  getBlogs,
  getBlogById,
  getExperience,
  getExperienceById,
  getSkills,
  getSkillById,
};
