export const BASE_URL = 'http://127.0.0.1:8000'

export const headers = {
  basic: {
    'Content-Type': 'application/json'
  },
  auth: (token)=>{
    const authHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    return authHeaders;
  }
}

export const ValidateStatus = async (response) => {
  const type = response.headers.get('Content-Type');
  if(response.status >= 200 && response.status <= 299) {
    return (type === 'application/json') ? response.json() : true;
  }
  return false
}

export const AuthCredentials = async (data)=> {
  try {
    const response = await fetch(`${BASE_URL}/api/token/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers.basic,
    })
    return ValidateStatus(response); 
  } catch (error) {
    return console.error(error);
  }
};

const CallEndpoint = async ({ token, url, method  }) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: headers.auth(token),
    })
    return ValidateStatus(response);
  } catch (error) {
    return console.error(error);
  }
}

export const AuthRefreshToken = async (token) => {
  try {
    const refreshField = {
      "refresh": token,
    }
    const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: headers.basic,
      body: JSON.stringify(refreshField)
    });
    return ValidateStatus(response)
  } catch (error) {
    return console.error(error);
  }
};

export const Login = async (data) => {
  try {
    const response = await AuthCredentials(data);

    if(!response) return false;
    const config = {
      method: 'POST',
      url: '/getProfile/',
      token: response.access,
    }
    const user = await CallEndpoint(config);

    if(!user)return false;
    
    const rol = (user?.professor) ? `/profile/professor/${user.pk}` : (user?.student) ? `/profile/student/${user.pk}` : false;
    if(rol) {
      window.localStorage.setItem('token', JSON.stringify(response))
      window.localStorage.setItem('user',JSON.stringify(user)) 
    }
    return rol;
  } catch (error) {
    console.error(error);
  }
  
}

export const AuthSesion = async () => {

  const token = window.localStorage.getItem('token');

  if(!token) return false;

  const dataToken = JSON.parse(token)
  const isrefreshValid = await AuthRefreshToken(dataToken.refresh);

  if(!isrefreshValid) {
    localStorage.clear();
    return false;
  }

  dataToken.access = isrefreshValid.access;
  const config = {
    token: dataToken.access,
    method: 'POST',
    url: '/getProfile/',
  }
  
  const response = await CallEndpoint(config);
  if(!response) {
    localStorage.clear();
    return false;
  }
  window.localStorage.setItem('user', JSON.stringify(response));
  return isrefreshValid.access;
};

