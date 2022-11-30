// Import sveltekit dependencies
import { invalid, redirect } from "@sveltejs/kit"

// Import the addNewEmployee() function from the employee store.
import { addNewEmployee } from '../../stores/employeeStore.js';

// The form action handler(s)
export const actions = {

    // action function for adding a employee - called when form is submitted
    // This is where the form sends its data
    addemployee: async ({request }) => {
      let success = false;

      // get data from the POST request
      const form_data = await request.formData();

      // read each value - to do: add validation
      const employee = {
        department_id: Number(form_data.get('department_id')),
        last_name: form_data.get('last_name'),
        first_name: form_data.get('first_name'),
        email: form_data.get('email'),
        job_title: form_data.get('job_title'),
        start_year: Number(form_data.get('start_year')),
        salary: Number(form_data.get('salary'))
      }

      console.log('employee', employee);

      // Basic validation
      if (employee.department_id > 0 &&
          employee.last_name != '' &&
          employee.first_name != '' &&
          employee.email != '' &&
          employee.job_title != '' &&
          employee.start_year > 1990 &&
          employee.salary > 0
      ) {
          // Add the new employee via the API (using the employee store function)
          const result = await addNewEmployee(employee);
          console.log('add employee result: ', result)

        // return the result
        // This will display the success section of the page to show the newly added employee
        return { 
          success: true,
          message: `New employee added with id: ${result.id}`,
          employee: result
        };

        // This will cause the form to redisplay for corrections, along with an error message
      } else {
        return invalid(400, {
          error: true,
          message: 'validation failed',
          employee: employee
        })
      }
    }

  };
