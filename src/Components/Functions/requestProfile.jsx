import axios from "axios";

export const GetGradeUser = async ({ user_id }) => {
  try {
    const response = await axios.get(
      "https://poo.zabedu.ru/services/students/1297/dashboard",
      {
        headers: {},
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
