import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

import { useEffect } from "react";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";

const UserDetailPage = () => {
  const {id} = useParams();
 
  
  const {users, user, handleGetUsers,  handleGetUser} = useUsers();
  
  useEffect(() => {
    handleGetUsers();
    handleGetUser(id);
  }, []);

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="User Details"
        subtitle="Here you can find more details about the User Profile"
      ></PageHeader>
      <div>ID: {id}</div>
      {console.log(users)}
    
      
  

     
    </Container>
  );
};

export default UserDetailPage;
