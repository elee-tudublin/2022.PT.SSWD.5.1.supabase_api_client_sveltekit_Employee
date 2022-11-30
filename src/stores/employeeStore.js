// import dependencies
import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase.js';

// two writable stores for employees and departments
export const employees = writable([]);
export const departments = writable([]);

// Function to get all employees
// This uses the Supabase client to query the employee table
export const getAllEmployees = async () => {
	const { data, error } = await supabase
		.from('employee')
		.select()
		.order('last_name', { ascending: true });

	if (error) {
		return console.error(error);
	}

	// @ts-ignore
	employees.set(data);
};

// Get a employee by id from Supabase
// @ts-ignore
export const GetEmployeeById = async (id) => {
	const { data, error } = await supabase
		.from('employee')
		.select()
        .eq('id', id);

	if (error) {
		console.error(error);
	}

    if (data) {
        return data[0];
    }

    return '';
};

// Function to get all departments
// This uses the Supabase client to query the department table
export const getAllDepartments = async () => {
	const { data, error } = await supabase
		.from('department')
		.select()
		.order('name', { ascending: true });

	if (error) {
		return console.error(error);
	}

	// @ts-ignore
	departments.set(data);
};

// Get employees by department id
export const getEmployeesByDept= async (dept_id = 0) => {
	if (dept_id > 0) {
		const { data, error } = await supabase
			.from('employee')
			.select()
			.eq('department_id', dept_id)
			.order('last_name', { ascending: true });

		if (error) {
			return console.error(error);
		}

		// @ts-ignore
		employees.set(data);
	} else {
		getAllEmployees();
	}
};

// Function to call Supabase and insert a row
// @ts-ignore
export const addNewEmployee = async (employee) => {
	const { data, error } = await supabase
		.from('employee')
		.insert([
			{
				department_id: Number(employee?.department_id),
				last_name: employee?.last_name,
				first_name: employee?.first_name,
				email: employee?.email,
				job_title: employee?.job_title,
				start_year: Number(employee?.start_year),
				salary: Number(employee?.salary)
			}
		])
		// Select the newly inserted employee (so that it can be returned)
		.select();

	if (error) {
		return console.error(error);
	}

	// return inserted employee
	return data[0];
};

// To do - delete an existing employee by id
// id set to 0 by default
export const deleteEmployeeById = async (id = 0) => {
	if (id > 0) {
		// To do:
		// Call the Supabase API to delete employee with matching id
	}
};

// Function to call Supabase and insert a row
// @ts-ignore
export const updateEmployee = async (employee) => {
	const { data, error } = await supabase
		.from('employee')
		.update([
			{
				department_id: Number(employee?.department_id),
				last_name: employee?.last_name,
				first_name: employee?.first_name,
				email: employee?.email,
				job_title: employee?.job_title,
				start_year: Number(employee?.start_year),
				salary: Number(employee?.salary)
			}
		])
		.eq('id', employee.id)
        .select();

	if (error) {
		return console.error(error);
	}

	// return updated employee
	return data[0];
};

// initialise the store
// getAllEmployees();
// getAllDepartments();
