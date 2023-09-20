import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';

export const addCurriculumSemester = (body = {}) => {
  return post(`${BASE_URL}/api/curriculum-semesters/add`,body);
};
export const getAllCurriculumSemester = (body = {}) => {
  return get(`${BASE_URL}/api/curriculum-semesters/getAll`);
};
export const getOneCurriculumSemester = (id) => {
  return get(`${BASE_URL}/api/curriculum-semesters/getOne/${id}`);
};
export const updateCurriculumSemester = (id) => {
  return put(`${BASE_URL}/api/curriculum-semesters/update/${id}`);
};
export const deleteCurriculumSemester = (id) => {
  return destroy(`${BASE_URL}/api/curriculum-semesters/delete/${id}`);
};