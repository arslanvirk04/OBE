import { combineReducers } from "redux"
import Register from "src/views/pages/register/Register";
import auth from "src/store/auth/index"
// import Profile from "src/views/pages/profile/Profile";
// import students from "src/views/addStudent/AddStudent"
// import Faculty from "src/views/addFaculty/AddFaculty";
// import Courses from "src/views/addCourse/AddCourse";
// import Assessment from "src/views/assessments/Assessment";
// import Curriculum from "src/views/curriculum/Curriculum";
// import AvailableResources from "src/views/availableResources/AvailableResources";
const rootReducer = (asyncReducers) => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		...asyncReducers,
	});
	return combinedReducer(state, action);
};

export default rootReducer;
