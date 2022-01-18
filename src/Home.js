import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ListAll = () => {
  const [studentState, setStudentState] = useState([]);
  const [mentorState, setMentorState] = useState([]);

  const mentorfetch = () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/mentor`)
      .then((data) => data.json())
      .then((men) => setMentorState(men));
  };

  useEffect(() => {
    mentorfetch();
  }, []);

  const studentfetch = () => {
    fetch(`https://assign-mentor-by-vrushabh.herokuapp.com/student`)
      .then((data) => data.json())
      .then((stu) => setStudentState(stu));
  };

  useEffect(() => {
    studentfetch();
  }, []);

  return (
    <div className="container ">
      <div className="row">
        <div className="col">
          {studentState ? (
            <>
              <h2>Student Data</h2>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Mentor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentState.map((stud) => {
                      return (
                        <TableRow key={stud._id}>
                          <TableCell>{stud.name}</TableCell>
                          <TableCell>{stud.email}</TableCell>
                          <TableCell>{stud.course}</TableCell>
                          <TableCell>
                            {stud.mentorAssigned
                              ? "Mentor Assigned"
                              : "Not Assigned"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="col">
          {mentorState ? (
            <>
              <h2>Mentor Data</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Expertise</TableCell>
                      <TableCell>Students</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mentorState.map((ment) => {
                      return (
                        <TableRow
                          key={ment._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{ment.name}</TableCell>
                          <TableCell>{ment.email}</TableCell>
                          <TableCell>{ment.expertise}</TableCell>
                          <TableCell>
                            {ment.studentsAssigned.length > 0
                              ? "Students Assigned"
                              : "Not Assigned"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default ListAll;
