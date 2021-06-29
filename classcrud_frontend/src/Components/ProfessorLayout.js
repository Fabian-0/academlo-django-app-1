import React, { useState } from 'react';
import { CrudClass } from './Api/Classes';
import Navbar from './Navbar';

function ProfessorLayout({ data, handlerHistory }) {

  const [className, setClassName] = useState('');
  const [update, setUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const {pk, professor} = data; 
  const dataRequest = {
    history: handlerHistory,
    url: '/classes/'
  }
  console.log(data);

  const handleAddClass = async () => {
    const classField = {
      'name': className,
      'professor': pk,
    }
    dataRequest.data = JSON.stringify(classField);
    dataRequest.method = 'POST';
    const response = await CrudClass(dataRequest);
    if(!response) return;
    return window.location.reload();
  };

  const handleDeleteClass = async (id) => {
    dataRequest.method = 'DELETE';
    dataRequest.url += `${id}/` 
    const response = await CrudClass(dataRequest);
    console.log(response);
    if(!response) return;
    return window.location.reload();
  }

  const handleUpdateClass = async (id) => {
    const classField = {
      'name': dataUpdate,
    }
    dataRequest.data = JSON.stringify(classField);
    dataRequest.method = 'PATCH';
    dataRequest.url += `${id}/` 
    const response = await CrudClass(dataRequest);
    console.log(response);
    if(!response) return;
    return window.location.reload();
  }

  const userData = {
    avatar: data.professor.avatar,
    first_name: data.first_name,
    username: data.username,
    handlerHistory,
  }

  return (
    <>
      <Navbar data={userData} />
      <div className="row">
        <div className="my-2 d-flex">
          <input type="text" name="name"  onChange={(e)=>setClassName(e.target.value)} value={className} placeholder='Class Name' className='form-control w-50 rounded-0 rounded-start' />
          <button type="button" onClick={handleAddClass}  className='btn-primary'>Add</button>
        </div>
      </div>
      <div className="row p-2">
        <h2>My Classes</h2>
        <ul className="list-group">
          {professor.class_set.map(value => (
            (update) ? 
              (update === value.id) ? 
                <>
                  <li key={value.id} className="list-group-item d-flex justify-content-between align-items-center"><input type="text" name="update" onChange={(e) => setDataUpdate(e.target.value)} defaultValue={value.name}  /> 
                    <div className="buttons">
                      <button className="btn btn-warning border-0 py-1 px-3 d-inline-block ms-1" onClick={() => handleUpdateClass(value.id)} >Update</button>
                    </div>
                  </li>
                </>
                :
                <>
                  <li key={value.id} className="list-group-item d-flex justify-content-between align-items-center"><span>{value.name}</span> 
                    <div className="buttons">
                      <button className="btn btn-danger border-0 py-1 px-3 d-inline-block ms-1" onClick={() => handleDeleteClass(value.id)}>Delete</button>
                      <button className="btn btn-warning border-0 py-1 px-3 d-inline-block ms-1" onClick={() => setUpdate(true)} >Update</button>
                    </div>
                  </li>
                </>
              :
              <>
                <li key={value.id} className="list-group-item d-flex justify-content-between align-items-center"><span>{value.name}</span> 
                  <div className="buttons">
                    <button className="btn btn-danger border-0 py-1 px-3 d-inline-block ms-1" onClick={() => handleDeleteClass(value.id)}>Delete</button>
                    <button className="btn btn-warning border-0 py-1 px-3 d-inline-block ms-1" onClick={() => setUpdate(value.id)} >Update</button>
                  </div>
                </li>
              </>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProfessorLayout;