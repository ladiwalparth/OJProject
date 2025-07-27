import axios from "axios";

const uploadData = async (data, navigate) => {
    try {
        const response = await axios.post('http://localhost:8000/register', data , {
            withCredentials: true,
        });
        alert(response.data);
        navigate("/enter");
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data);
        } else {
            alert(error.response?.data || "Something went wrong");
            navigate("/");
        }
    }
}

const enterData = async (data, navigate) => {
    try {
        const response = await axios.post('http://localhost:8000/enter', data , {
            withCredentials: true,
        });
        alert(response.data);
        
        window.location.href = "http://localhost:5173/";
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data);
        } else {
            alert(error.response?.data || "Something went wrong");
        }
        window.location.href = "http://localhost:5173/";
    }
}

const loggedInUser = async () => {
    const response = await axios.get('http://localhost:8000/loggedInData',{
        withCredentials: true
    });
    
    return response.data.user;
}

const logoutUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/logOut',{
            withCredentials: true
        });
        console.log(response.data);
        window.location.reload();
    } catch (error) {
        alert(error.response?.data || "Something went wrong");
    }
}

export {uploadData, enterData, loggedInUser, logoutUser};