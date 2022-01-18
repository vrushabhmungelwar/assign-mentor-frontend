import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NewMentor from "./pages/createMentor";
import { useNavigate } from "react-router-dom";
import NewStudent from "./pages/createstudent";
import AddStudentstoMentor from "./pages/assignStudentToMentor";
import ChangeMentorforStudent from "./pages/mentorChange";
import AllStudentsforEachMentor from "./pages/listOfStudent";
import ListAll from "./pages/Home";
import { Success } from "./pages/success";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/creatementor")}>
              create mentor
            </Button>
            <Button color="inherit" onClick={() => navigate("/createstudent")}>
              create student
            </Button>
            <Button color="inherit" onClick={() => navigate("/addStudentsToMentor")}>
              assign Student To Mentor
            </Button>
            <Button color="inherit" onClick={() => navigate("/changeMentor")}>
              Change Mentor
            </Button>
            <Button color="inherit" onClick={() => navigate("/assignedStudents")}>
              Assigned Students
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Routes>
      <Route exact path="/" element={<ListAll />} />
        <Route path="/creatementor" element={<NewMentor />} />
        <Route path="/createstudent" element={<NewStudent />} />
        <Route path="/addStudentsToMentor" element={<AddStudentstoMentor />} />
        <Route path="/changeMentor" element={<ChangeMentorforStudent />} />
        <Route path="/assignedStudents" element={<AllStudentsforEachMentor />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
