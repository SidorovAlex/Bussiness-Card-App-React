import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { Container, FormControlLabel, Grid } from "@mui/material";
import Input from "../../forms/components/Input";
import Form from "../../forms/components/Form";

const EditeUserPage= ()=>{
    const { user } = useUsers();
    const navigate = useNavigate();

    return (
        <h1>Test Edite User</h1>
    )
}


export default EditeUserPage;