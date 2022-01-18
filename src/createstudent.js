import React, { useState } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewStudent = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    course: "Physics",
  });

  const submitForm = async () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/student`, {
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
          <h2>Add a new Student</h2>
          <form>
            <div>
              <TextField
                type="text"
                label="Name"
                variant="standard"
                value={state.name}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, name: ev.target.value }));
                }}
              />
            </div>
            <div>
              <TextField
                type="email"
                label="Email"
                variant="standard"
                value={state.email}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, email: ev.target.value }));
                }}
              />
            </div>
            <div className="select">
              <Select
                variant="standard"
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, course: ev.target.value }));
                }}
                value={state.course}
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

export default NewStudent;
