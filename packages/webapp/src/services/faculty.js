import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';
// to do
export const addTeacher = (body = {}) => {
  return post(`${BASE_URL}/api/teacher/addTeacher`, body);
};
export const addImportFileTeacher = (body = {}) => {
  return post(`${BASE_URL}/api/teacher/addImportFileTeacher`, body);
};
export const getOne = (id) => {
  return get(`${BASE_URL}/api/teacher/getOne/${id}`);
};
export const getAllTeachers = (options = {}) => {
  return get(`${BASE_URL}/api/teacher/getAllTeachers`);
};
export const updateTeacher = (id) => {
  return put(`${BASE_URL}/api/teacher/update/${id}`);
};
export const deleteTeacher = (id) => {
  return destroy(`${BASE_URL}/api/teacher/destroy/${id}`);
};
