import { Button, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
const AllStudentsforEachMentor = () => {
  const [mentorDetails, setmentorDetails] = useState();
  const [state, setState] = useState("");
  const [mentorName, setMentorName] = useState([]);

  const mentorfetch = () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/mentor`)
      .then((data) => data.json())
      .then((men) => setMentorName(men));
  };

  useEffect(() => {
    mentorfetch();
  }, []);

  const submitForm = (state) => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/mentor/${state}`)
      .then((data) => data.json())
      .then((result) => setmentorDetails(result));
  };

  if (!mentorName) {
    return <p>Loading.....</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div>
            <label>Select Mentor</label><br/>
            <Select
            variant="standard"
            value={state}
              onChange={(ev) => {
                setState(ev.target.value);
                console.log(state);
              }}
            >
              {mentorName &&
                mentorName.map((ment) => {
                  return (
                    <MenuItem value={ment._id} key={ment._id}>
                      {ment.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <div className="btn">
            <Button type="button" onClick={() => submitForm(state)}>
              Submit
            </Button>
          </div>
        </div>

        <div className="col">
          {mentorDetails ? (
            <ul>
              {mentorDetails.studentsAssigned.map((stud) => (
                <li key={stud._id}>{stud.name}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
          {mentorDetails
            ? mentorDetails.studentsAssigned.length < 1
              ? "No Students Assigned"
              : ""
            : ""}
        </div>
      </div>
    </div>
  );
};

export default AllStudentsforEachMentor;
