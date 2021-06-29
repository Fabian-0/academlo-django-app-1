import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthSesion } from "./Api/Api";
import { CrudClass, GetClasses } from "./Api/Classes";
import Navbar from "./Navbar";

function ClassesList() {

  const [studentData, setStudentData] = useState(null);
  const [classesList, setClassesList] = useState(null);
  let history = useHistory();

  useEffect(()=> {
    AuthSesion()
      .then((response) => {
        if(!response) {
          history.replace('/')
          return
        };
        const data = JSON.parse(window.localStorage.getItem('user'));
        setStudentData(data);
        GetClasses('/classes/')
          .then(res => {
            let isClass = {};
            let list = [];
            const total = data.student.classes.length;
            const newData = data;
            for (let i = 0; i < total; i++) {
              isClass[newData.student.classes[i].name] = newData.student.classes[i].name;
            }
            for (let i = 0; i < res.length; i++) {
              const element = res[i];
              if(isClass[element.name]) continue;
              list.push(
                <li className="list-group-item d-flex justify-content-between align-items-center"><span>{element.name}</span> 
                <div className="buttons">
                  <button className="btn btn-prymary border-0 py-1 px-3 d-inline-block ms-1" onClick={() => handleJoinClass(element.name)}>Join</button>
                </div>
              </li>
              )
            }
            return setClassesList(list);
          })
      });
  },[]);

  let userData = {
    avatar: studentData?.student.avatar,
    first_name: studentData?.first_name,
    username: studentData?.username,
    handlerHistory: history,
  }

  const handleJoinClass = () => {
    return;
  }

  return (
    <>
      {studentData && 
        <Navbar data={userData} />
      }
      {classesList && 
        <div className="row">
          <ul className="list-group">          
            {classesList}
          </ul>
        </div>
      }
    </>
  )
}

export default ClassesList;