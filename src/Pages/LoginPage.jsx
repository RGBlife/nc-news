import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import { getAllUsers } from "../apis/api";
import { useUser } from "../providers/UserContext";

const LoginPage = () => {
  const { setUser } = useUser();
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(controller.signal);
        setUserList(response);
        setSelectedUser(response[0]?.username); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObj = userList.find((user) => user.username === selectedUser);
    if (userObj) {
      setUser(userObj);
      setLoginStatus(`You have successfully logged in as ${userObj.username}.`);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value); 
    setLoginStatus("")
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 align-middle items-center justify-center">
      <label htmlFor="userName">
        <h4>Select Your User</h4>
        <select name="userName" id="userName" value={selectedUser} onChange={handleSelectChange}>
          {userList.length > 0 ? (
            userList.map((person) => (
              <option key={uuid()} value={person.username}>{person.username}</option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </label>

      <Button style={{ backgroundColor: "#D83367", textTransform: "none" }} type="submit" variant="contained">Log in as user</Button>
      
    </form>
  );
};

export default LoginPage;
