import projectsData from '../data/projects.json';
import blogsData from '../data/blogs.json';
import experienceData from '../data/experience.json';
import skillsData from '../data/skills.json';
import settingsData from '../data/settings.json';

// Project APIs
export const getProjects = async () => {
  return projectsData;
};

export const getProjectById = async (id) => {
  return projectsData.find(p => p._id === id);
};

// Blog APIs
export const getBlogs = async () => {
  return blogsData;
};

export const getBlogById = async (id) => {
  return blogsData.find(b => b._id === id);
};

// Experience APIs
export const getExperience = async () => {
  return experienceData;
};

export const getExperienceById = async (id) => {
  return experienceData.find(e => e._id === id);
};

// Skills APIs
export const getSkills = async () => {
  return skillsData;
};

export const getSkillById = async (id) => {
  return skillsData.find(s => s._id === id);
};

// Settings APIs
export const getSettings = async () => {
  return settingsData;
};

// Update settings is no longer supported on the static frontend
export const updateSettings = async () => {
  throw new Error("Update settings is disabled in static mode.");
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
  getSettings,
  updateSettings,
};
