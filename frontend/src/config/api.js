export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const API_ENDPOINTS = {
  // Tasks endpoints
  GET_ALL_TASKS: '/api/tasks',
  CREATE_TASK: '/api/tasks',
  GET_TASK_BY_ID: (id) => `/api/tasks/${id}`,
  UPDATE_TASK: (id) => `/api/tasks/${id}`,
  DELETE_TASK: (id) => `/api/tasks/${id}`,
  DELETE_COMPLETED_TASKS: '/api/tasks/completed',
};

export const buildUrl = (endpoint, params = {}) => {
  let url = `${API_BASE_URL}${endpoint}`;
  
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  
  return url;
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildUrl,
};
