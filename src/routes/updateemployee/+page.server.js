// Import sveltekit dependencies
// @ts-ignore
import { invalid, redirect, error } from "@sveltejs/kit";

import { GetEmployeeById, updateEmployee } from '../../stores/employeeStore';


// Refresh the store when page loads (optional due to overhead but probably a good idea)
/** @type {import('./$types').PageServerLoad} */
export const load = async ({url}) => {

  const id = url?.searchParams.get('id');
    
    if (id)  {
        let employee;
        console.log('id: ', id);
        employee = await GetEmployeeById(id)

        return {
                employee: employee
            }
    }
}

// The form action handler(s)
export const actions = {

    // This is where the form sends its data
    // @ts-ignore
    update_employee: async ({request }) => {
      // @ts-ignore
      let success = false;
  
      // get data from the request
      const form_data = await request.formData();
  
      // read each value
      const employee = {
        id: Number(form_data.get('id')),
        department_id: Number(form_data.get('department_id')),
        last_name: form_data.get('last_name'),
        first_name: form_data.get('first_name'),
        email: form_data.get('email'),
        job_title: form_data.get('job_title'),
        start_year: Number(form_data.get('start_year')),
        salary: Number(form_data.get('salary'))
      }
      console.log('employee', employee);
      // Basic validation check
      if (
          employee.id > 0 &&
          employee.department_id > 0 &&
          employee.last_name != '' &&
          employee.first_name != '' &&
          employee.email != '' &&
          employee.job_title != '' &&
          employee.start_year > 1990 &&
          employee.salary > 0
      ) {
          // Add the new employee to Supabase
          const result = await updateEmployee(employee);
  
        // If validation passed - return the result
        // This is a JS object containing the success state, a message, and a copy of the newly added employee (from Supabase)
        return { 
          success: true,
          // The following annotation is to ignore TypeScript Syntax errors detected by ESLint and the Svelte VS Code extensions
          // @ts-ignore
          message: `Update employee with id: ${employee.id}`,
          // @ts-ignore
          employee: result
        };
        // If va;idation failed
        // Return a response with Status 400
        // set error state, a message, and return employee (a copy of the form data) 
      } else {
        return invalid(400, {
          error: true,
          message: 'validation failed',
          employee: employee
        })
      }
    }
  
  };