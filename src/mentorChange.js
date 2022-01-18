import { Button, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChangeMentorforStudent = () => {
  const navigate = useNavigate();

  const [mentor, setMentor] = useState([]);
  const [student, setStudent] = useState([]);
  const [studentSelected, setStudentSelected] = useState("");
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

  const submitForm = async () => {
    console.log(studentSelected, "studentsselected");
    console.log(mentorSelected, "mentorSelected");
    const studData = student.filter((s) => {
      return s._id === studentSelected;
    });
    const isAssigned = studData[0].mentorAssigned;
    console.log(studData, "studData");

    if (isAssigned !== null) {
      console.log(isAssigned, "isAssigned");
      //this act as assign new mentor
      const body = {
        studentId: studentSelected,
        newMentorId: mentorSelected,
      };

      function MentorChange(body) {
        fetch(
          `https://assign-mentor-by-vrushabh.herokuapp.com/assignmentor/modifyMentor`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(navigate("/success"));
      }
      MentorChange(body);
    } else {
      const body = {
        mentorId: mentorSelected,
        studentsArray: new Array(studentSelected),
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
        ).then(navigate("/success"));
      }
      AddingStudentsToMentor(body);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div>
            <label>Select Mentor</label>
            <br />
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

        <div className="col">
          <div>
            <label>Select Student</label>
            <br />
            {student && (
              <Select
                variant="standard"
                value={studentSelected}
                onChange={(ev) => {
                  setStudentSelected(ev.target.value);
                }}
              >
                {student &&
                  student.map((stud) => {
                    return (
                      <MenuItem value={stud._id} key={stud._id}>
                        {stud.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            )}
          </div>
        </div>
        <div className="m-5 col">
          <Button type="button" onClick={() => submitForm()}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeMentorforStudent;
