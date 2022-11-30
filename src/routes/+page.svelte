<script>
// @ts-nocheck

	// Import the store etc.
	import { employees, departments, getAllEmployees } from '../stores/employeeStore.js';

	import { browser } from '$app/environment';

	// filtered is subscribed to the $employees store
	// initially filtered is a copy of employees (from the store)

	$: filtered = $employees;

	// Object to store sort directions
	const table_sort = {
		id: false,
		first_name: false,
		last_name: false,
		email: false,
		job_title: false,
		start_date: false,
		salary: false
	};

	// Sort alpha values in a givren column (default to employee_name)
	const sortAlpha = (col = 'first_name') => {

		// reverse current sort direction for this col
		// i.e. reverse the current order
		table_sort[col] = !table_sort[col];

		// output to the  browser console
		console.log(`${col} : ${table_sort[col]}`);

		// sort the filtered array based on column selected
		// sort takes a function parameter to indicate which column should be sorted (e.g. employee_name) 
		filtered = filtered.sort((a, b) => {
			// sort asc
			if (table_sort[col] === true) {
				return a[col].toLowerCase() < b[col].toLowerCase();
			// sort desc
			} else {
				return a[col].toLowerCase() > b[col].toLowerCase();
			}
		});
	}

	// sort numeric values in a given column (default to employee_price)
	const sortNumeric = (col = 'salary') => {

		// reverse current sort direction for this col
		table_sort[col] = !table_sort[col];

		// check browser console for output
		// sort takes a function parameter to indicate which column should be sorted (e.g. employee_price) 
		console.log(`${col} : ${table_sort[col]}`);

		// sort the filtered array based on column selected
		filtered = filtered.sort((a, b) => {
			if (table_sort[col] === true) {
				return a[col] - b[col];
			} else {
				return b[col] - a[col];
			}
		});
	}

	// This function will filter employees by dept_id
	const filterByDept = async (dept_id = 0) => {
		// Refresh the store to ensure it is up to date (optional)
		await getAllEmployees();

		// Filter if we have a dept_id value > 0
		// See https://javascript.info/array-methods#filter
		// Note this filters the existing $employee store and does not replace it like getEmployeesByCat()
		if (dept_id > 0) {
			filtered = $employees.filter((e) => {
				return e.department_id == dept_id;
			});
		}
	};

	// Function to delete a employee by id
	// validate id
	// Ask user to confirm
	// then call API endpoint to delete
	// refresh the view
	const deleteEmployee = async (id = 0) => {
		if (confirm(`Permenently deleting employee with id= ${id}\n\nAre you sure?`)) {
			console.log(`delete employee id: ${id}`);
		}
	};
</script>

<!-- Main Content - Employees etc. -->
<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Employees List</h2>
	</div>
	<div class="row">
		<div class="col-sm-2">
			<!-- Page Body Left Column (menu) -->
			<div id="departmentList" class="list-group">
				<!-- placeholders - replace with real department links -->
				<button
					on:click={() => filterByDept()}
					class="department-link list-group-item list-group-item-action"
				>
					All Employees
				</button>
				{#each $departments as dept}
					<button
						on:click={() => filterByDept(dept.id)}
						class="department-link list-group-item list-group-item-action"
					>
						{dept.name}
					</button>
				{/each}
			</div>
		</div>
		<!-- End department col -->
		<div class="col-sm-10">
			<!-- Page Body Right Side (Content goes here) -->
			<div id="employees">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th><a on:click={() => sortNumeric('id')} href="/">id</a></th>
							<th><a on:click={() => sortAlpha('last_name')} href="/">last name</a></th>
							<th><a on:click={() => sortAlpha('first_name')} href="/">first name</a></th>
							<th><a on:click={() => sortAlpha('email')} href="/">email</a></th>
							<th><a on:click={() => sortAlpha('job_title')} href="/">job title</a></th>
							<th><a on:click={() => sortNumeric('start_year')} href="/">start year</a></th>
							<th><a on:click={() => sortNumeric('salary')} href="/">salary</a></th>
						</tr>
					</thead>
					<tbody id="employeeRows">
						<!-- Employee Rows to be inserted here -->
						{#each filtered as employee}
							<tr>
								<td>{employee.id}</td>
								<td>{employee.last_name}</td>
								<td>{employee.first_name}</td>
								<td>{employee.email}</td>
								<td>{employee.job_title}</td>
								<td>{employee.start_year}</td>
								<td class="price">&euro;{Number(employee.salary).toFixed(2)}</td>
								<td
									><a
										class="btn btn-sm btn-outline-primary"
										href="/updateemployee/?id={employee.id}"
										role="button"
									>
										<span class="bi bi-pencil-square" />
									</a>
								</td>
								<td
									><button
										on:click={() => deleteEmployee(employee.id)}
										class="btn btn-sm btn-outline-danger"
									>
										<span class="bi bi-trash" /></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<!-- Add employee button goes here -->
			<a id="AddEmployeeButton" class="btn btn-primary" href="/addemployee" role="button">New Employee</a>
		</div>
		<!-- End Employee col -->
	</div>
	<!-- End Row -->
</div>

<!-- End Main Content-->
<style>
</style>
