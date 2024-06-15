// export const base_url = "http://localhost:8000/api/";

export const base_url = "https://backend-growit.onrender.com/api/";

const getToken = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

  export const config = {
    headers: {
        Authorization: `Bearer ${
            getToken !== null ? getToken.token : ""
        }`,
        Accept: "application/json"
    }
  }