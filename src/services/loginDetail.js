import { BASE_URL } from 'src/components/Common';
import { get, put, post, headers } from './defaults';


export async function registerUser(data = {}) {
  return fetch(`http://localhost:4500/api/auth/signup`, {
    headers: headers(),
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(signInUser => signInUser.json())
}
export async function logInUser(data = {}) {
  return fetch(`http://localhost:4500/api/auth/login`, {
    headers: headers(),
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(login => login.json())
    .catch(error => ({
      message: error.message,
      status: error.status,
    }));
}
export async function logOutUser(data = {}) {
  return fetch(`http://localhost:4500/api/auth/logout`, {
    headers: headers(),
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(logout => logout.json())
    .catch(error => ({
      message: error.message,
      status: error.status,
    }));
}