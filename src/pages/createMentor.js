import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewMentor = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    expertise: "Physics",
  });

  const submitForm = async () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/mentor`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(navigate("/success"))
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Add a new mentor</h2>
          <form>
            <div>
              <TextField
                label="Name"
                type="text"
                variant="standard"
                value={state.name}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, name: ev.target.value }));
                }}
              />
            </div>
            <div>
              <TextField
                label="Email"
                type="email"
                variant="standard"
                value={state.email}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, email: ev.target.value }));
                }}
              />
            </div>
            <div className="select">
              <Select
                value={state.expertise}
                variant="standard"
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, expertise: ev.target.value }));
                }}
              >
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Maths">Maths</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </Select>
            </div>
            <div className="btn">
              <Button type="button" onClick={() => submitForm()}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMentor;
