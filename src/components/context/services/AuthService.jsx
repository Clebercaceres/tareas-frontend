import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Registrar usuario
export const register = (userData) => {
return axios.post(`${API_URL}/register`, userData);
};

// Iniciar sesión
export const login = (identifier, password) => {
return axios.post(`${API_URL}/login`, { identifier, password });
};

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

// Obtener todos los usuarios
export const getAllUsers = async () => {
try {
const response = await axios.get(`${API_URL}/users`);
return response.data;
} catch (error) {
console.error("Error al obtener los usuarios:", error);
throw error;
}
};
