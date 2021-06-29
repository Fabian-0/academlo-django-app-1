import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthSesion } from "./Api/Api";
import Navbar from "./Navbar";

function StudentProfile() {

  const [studentData, setStudentData] = useState(null);
  let history = useHistory();

  useEffect(()=> {
    AuthSesion()
      .then((res) => {
        if(!res) {
          history.replace('/')
          return
        };
        const data = window.localStorage.getItem('user');
        return setStudentData(JSON.parse(data));
      });
  },[]);

  let userData = {
    avatar: studentData?.student.avatar,
    first_name: studentData?.first_name,
    username: studentData?.username,
    handlerHistory: history,
  }

  const handleLeftClass = () => {
    return;
  }

  return (
    <>
      { studentData &&
        <>
          <Navbar data={userData} />
          <div className="row">
            <Link href="/classes/" className="btn btn-primary mx-auto my-2 col-lg-5 col-8">Join Class</Link>
          </div>
          <ul className="list-group">
            {studentData.student.classes.map(value => (         
              <li key={value.id} className="list-group-item d-flex justify-content-between align-items-center"><span>{value.name}</span> 
                <div className="buttons">
                  <button className="btn btn-danger border-0 py-1 px-3 d-inline-block ms-1" onClick={() => handleLeftClass(value.id)}>Left</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      }
    </>
  )
}

export default StudentProfile;