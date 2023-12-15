import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import { getAllUsers } from "../apis/api";

const LoginPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(controller.signal);
        setUserList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <form>
      <label htmlFor="UserName">
        <h4> Select Your User </h4>
        <select name="userName" value={"test"}>
          {userList.length > 0 ? (
            userList.map((person) => {
              return <option key={uuid()}>{person.username}</option>;
            })
          ) : (
            <option> No users To Display</option>
          )}
        </select>
      </label>

      <Button type="submit">Log In</Button>
    </form>
  );
}

export default LoginPage;
