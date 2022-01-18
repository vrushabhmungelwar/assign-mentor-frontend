import { Button, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddStudentstoMentor = () => {
  const navigate = useNavigate();

  const [mentor, setMentor] = useState([]);
  const [student, setStudent] = useState([]);
  const [studentsSelected, setStudentsSelected] = useState([]);
  const [mentorSelected, setMentorSelected] = useState("");

  const mentorfetch = () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/mentor`)
      .then((data) => data.json())
      .then((men) => setMentor(men));
  };

  useEffect(() => {
    mentorfetch();
  }, []);

  const studentfetch = () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/student`)
      .then((data) => data.json())
      .then((stu) => setStudent(stu));
  };

  useEffect(() => {
    studentfetch();
  }, []);

  var stude = student.filter((s) => s.mentorAssigned === null);

  const checkboxChangeFunc = (ev) => {
    setStudentsSelected((prev) => {
      if (ev.target.checked === true) {
        if (!studentsSelected.includes(ev.target.name)) {
          return [...prev, ev.target.name];
        }
      }
      if (ev.target.checked === false) {
        if (studentsSelected.includes(ev.target.name)) {
          return prev.filter((pre) => {
            return pre !== ev.target.name ? pre : null;
          });
        }
      }
    });
  };

  const submitForm = async () => {
    console.log(studentsSelected, "studentsselected");
    console.log(mentorSelected, "mentorSelected");
    const body = {
      mentorId: mentorSelected,
      studentsArray: studentsSelected,
    };
    function AddingStudentsToMentor(body) {
      fetch(
        `https://assign-mentor-by-vrushabh.herokuapp.com/assignmentor/newmentor`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    .then(navigate("/success"))
    }
    AddingStudentsToMentor(body);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div>
            <label>Select Mentor</label>
            <br></br>
            <Select
              variant="standard"
              value={mentorSelected}
              onChange={(ev) => {
                setMentorSelected(ev.target.value);
              }}
            >
              {mentor &&
                mentor.map((ment) => {
                  return (
                    <MenuItem value={ment._id} key={ment._id}>
                      {ment.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        </div>

        <div className="select">
          <div>
            <label>Select Students</label>
            {student && (
              <ul style={{ listStyle: "none" }}>
                {stude.map((stud) => {
                  return (
                    <li key={stud._id}>
                      <input
                        type="checkbox"
                        name={stud._id}
                        value={stud._id}
                        onChange={(ev) => checkboxChangeFunc(ev)}
                      />
                      {stud.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="btn">
          <Button type="button" onClick={() => submitForm()}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentstoMentor;
