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

export default uploadData;