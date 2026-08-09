const baseURL = "http://localhost:3000/api/task";

const createTaskApi = async ({firstName, lastName, email, phoneNumber, address}) => {
    try {

        const response = await fetch(`${baseURL}/createTask`,{
            method : "POST",
            credentials: "include",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({firstName, lastName, email, phoneNumber, address})
        })

        const data = await response.json();

        console.log(data);

        return data;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getAllTaskApi = async () => {
    try {

        const response = await fetch(`${baseURL}/getAllTasks`,{
            method : "GET",
            credentials: "include",
        });

        const data = await response.json();

        return data;
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const updateTaskApi = async (taskId, { firstName, lastName, email, phoneNumber, address }) => {
    try {
        const response = await fetch(`${baseURL}/updateTask/${taskId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email, phoneNumber, address }),
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const getTaskApi = async (taskId) => {
    try {
        const response = await fetch(`${baseURL}/getTask/${taskId}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const deleteTaskApi = async (taskId) => {
    try {
        const response = await fetch(`${baseURL}/deleteTask/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        console.log(data);

        return data;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export {
    createTaskApi,
    getAllTaskApi,
    deleteTaskApi,
    updateTaskApi,
    getTaskApi,
};