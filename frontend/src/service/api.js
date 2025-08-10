import axios from "axios";

const uploadData = async (data, navigate) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, data, {
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
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/enter`, data, {
            withCredentials: true,
        });
        alert(response.data);

        window.history.back();
        setTimeout(() => {
            window.location.reload();
        }, 100);
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data);
        } else {
            alert(error.response?.data || "Something went wrong");
        }
        // window.location.href = "/";
    }
}

const loggedInUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/loggedInData`, {
        withCredentials: true
    });

    return response.data.user;
}

const logoutUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logOut`, {
            withCredentials: true
        });
        console.log(response.data);
        window.location.reload();
    } catch (error) {
        alert(error.response?.data || "Something went wrong");
    }
}

const getOutput = async (data, navigate) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getOutput`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Please Enter to Run");
            navigate('/enter');
        }
        return (error.response?.data || "Something went wrong");
    }
}

const getVerdict = async (data, navigate) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getVerdict`, data, {
            withCredentials: true
        });
        if (response?.status === 200) {
            alert("Code Submitted Successfully!")
            navigate('/Submissions')
        }
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Please Enter to Submit");
            navigate('/enter');
        } else {
            alert(error.response?.data || "Something went wrong");
        }
    }
}

const getAIReview = async (data,navigate) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiReview`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Please Enter to get your Code's AI review");
            navigate('/enter');
        } else {
            alert("Something went wrong");
        }
    }
}

const getProblems = async (navigate) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getProblems`, {
            withCredentials: true
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Error while fetching problems");
        navigate('/');
    }
}

const getSubmissions = async (navigate) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getSubmissions`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
            alert("Please Enter to see Your Submissions");
            navigate('/enter');
        } else {
            alert(error.response?.data || "Something went wrong");
            navigate('/');
        }
    }
}

const getParticularProblem = async (code, navigate) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getParticularProblem/${code}`, {
            withCredentials: true
        });
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        alert("Error while fetching problem");
        navigate('/');
    }
}

const getParticularTestCase = async (code) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getParticularTestCase/${code}`, {
            withCredentials: true
        });
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        alert("Error while fetching problem");
        navigate('/');
    }
}



export { uploadData, enterData, loggedInUser, logoutUser, getOutput, getVerdict, getAIReview, getProblems, getSubmissions, getParticularProblem, getParticularTestCase };