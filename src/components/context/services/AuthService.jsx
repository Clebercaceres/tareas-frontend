import axios from 'axios';

const API_URL = 'http://localhost:500/api/auth';

// Registrar usuario
export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Iniciar sesión
export const login = (identifier, password) => {
  return axios.post(`${API_URL}/login`, { identifier, password });
};

// la creacion de tareas por backend falta implementarlas aca en el frontend
// Crear una nueva tarea
export const createTask = async (newTask) => {
  const response = await api.createTask(newTask);
  if (response.message === "Tarea creada") {
    setTodos(prevTodos => [...prevTodos, response.task]);
  }
};


// Editar una tarea
export const editTask = (taskId, taskData, token) => {
  return axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Eliminar una tarea
export const deleteTask = (taskId, token) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
