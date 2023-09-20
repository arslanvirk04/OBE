import { BASE_URL } from 'src/components/Common';
import { get, put, post,destroy } from './defaults';

export const addStudent = (body = {}) => {
  return post(`${BASE_URL}/api/student/add`, body);
};

export const addImportFileStudent = (body = {}) => {
  return post(`${BASE_URL}/api/student/addImportFileStudent`);
};
export const getAllStudents = (options = {}) => {
  return get(`${BASE_URL}/api/student/findAllStudent`);
};
export const getOneStudent = (id) => {
  return get(`${BASE_URL}/api/student/getOne/${id}`);
};
export const deleteStudent = (id) => {

  return destroy(`${BASE_URL}/api/student/destroy/${id}`);
};
export const updateStudentData = (id) => {
  return put(`${BASE_URL}/api/student/update/${id}`);
};
