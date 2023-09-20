import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';

export const addCurriculum = (body = {}) => {
  console.log("going to addCurriculum before")

  return post(`${BASE_URL}/api/curriculum/addCurriculum`,body);
};
export const addCurriculumImportFile = (body = {}) => {
  return post(`${BASE_URL}/api/curriculum/addCurriculumImportFile`,body);
};
export const getAllCurriculums = (body = {}) => {
  return get(`${BASE_URL}/api/curriculum/getAllCurriculum`);
};
export const getOneCurriculum = (id) => {
  return get(`${BASE_URL}/api/curriculum/getOneCurriculum/${id}`);
};
export const updateCurriculum = (id) => {
  return put(`${BASE_URL}/api/curriculum/updateCurriculum/${id}`);
};
export const deleteCurriculum = (id) => {
  return destroy(`${BASE_URL}/api/curriculum/deleteCurriculum/${id}`);
};