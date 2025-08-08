import axios from "axios";

const uploadData = async (data, navigate) => {
    try {
        const response = await axios.post('http://localhost:8000/register', data, {
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
        const response = await axios.post('http://localhost:8000/enter', data, {
            withCredentials: true,
        });
        alert(response.data);

        if (document.referrer) {
            window.location = document.referrer;
        } else {
            window.location.href = "http://localhost:5173/";
        }
    } catch (error) {
        if (error.response?.status === 409) {
            alert(error.response.data);
        } else {
            alert(error.response?.data || "Something went wrong");
        }
        // window.location.href = "http://localhost:5173/";
    }
}

const loggedInUser = async () => {
    const response = await axios.get('http://localhost:8000/loggedInData', {
        withCredentials: true
    });

    return response.data.user;
}

const logoutUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/logOut', {
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
        const response = await axios.post('http://localhost:8000/getOutput', data, {
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
        const response = await axios.post('http://localhost:8000/getVerdict', data, {
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
        const response = await axios.post('http://localhost:8000/aiReview', data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Please Enter to get your Code's AI review");
            navigate('/enter');
        } else {
            alert(error.response?.data || "Something went wrong");
        }
    }
}

const getProblems = async (navigate) => {
    try {
        const response = await axios.get('http://localhost:8000/getProblems', {
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
        const response = await axios.get('http://localhost:8000/getSubmissions', {
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
        const response = await axios.get(`http://localhost:8000/getParticularProblem/${code}`, {
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
        const response = await axios.get(`http://localhost:8000/getParticularTestCase/${code}`, {
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