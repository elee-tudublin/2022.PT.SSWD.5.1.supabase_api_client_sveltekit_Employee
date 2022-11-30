// @ts-nocheck
// import the employees store
import  {getAllEmployees, getAllDepartments} from '../stores/employeeStore.js';

// Refresh the store when page loads (optional due to overhead but probably a good idea)
export const load = async ({ fetch }) => {

    // fill the store
    await getAllEmployees();
    await getAllDepartments();

    return {

    }
}