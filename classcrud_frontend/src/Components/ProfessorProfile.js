import React, { useEffect, useState } from 'react';
import ProfessorLayout from "./ProfessorLayout";
import { useHistory } from 'react-router-dom';
import { AuthSesion } from './Api/Api';

function ProfessorProfile() {

  const [professorData, setProfessorData] = useState(null);
  let history = useHistory();

  useEffect(()=> {
    AuthSesion()
      .then((res) => {
        if(!res) {
          history.replace('/')
          return
        };
        const data = window.localStorage.getItem('user');
        return setProfessorData(JSON.parse(data));
      });
  },[]);

  return (
    <>
      {professorData && <ProfessorLayout data={professorData} handlerHistory={history} />}
      
    </>
  )
}

export default ProfessorProfile;