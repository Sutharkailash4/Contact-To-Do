const baseURL = "http://localhost:3000/api/auth";    

const registerApi = async ({username, email, password}) => {
    try {

      const response = await fetch(`${baseURL}/register`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
           body: JSON.stringify({ username, email, password }),
      });

    const data = await response.json();

    console.log(data);

    } catch (error) {
        console.error("Register Error:", error.message);
        throw error;
    }
};

const loginApi = async ({email, password}) => {
    try {

        const response = await fetch(`${baseURL}/login`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({email, password}),
        });

        const data = await response.json();

        console.log(data);
        
    } catch (error) {
        console.error("Register Error:", error.message);
        throw error;
    }
};

const getMeApi = async () => {
    try {

        const response = await fetch(`${baseURL}/getMe`,{
            method : "GET"
        });

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("Register Error:", error.message);
        throw error;
    }
};

const logoutApi = async () => {
    try {
        const response = await fetch(`${baseURL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), 
        });

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Logout Error:", error.message);
        throw error;
    }
};

export {
    registerApi,
    loginApi,
    getMeApi,
    logoutApi
}