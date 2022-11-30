<script>
	// Sveltekit form enhancements
	import { enhance, applyAction } from '$app/forms';

	// Import the store etc.
	import { departments, getAllDepartments } from '../../stores/employeeStore';

	// Access data returned from +page.server.js
	// @ts-ignore
	export let data;
	// Access data returned from +page.server.js
	// @ts-ignore
	export let form;

	// Update list of categories (used in form)
	getAllDepartments();

	const { employee } = data;
</script>

<!-- Main Content - Products etc. -->
<div class="container">
	<!-- If the insert was sucessfull display the new product details-->
	{#if form?.success}
	<div class="row">

		<h2 class="mt-5">{form?.message || ''}</h2>
	</div>

	<div class="row">
		<div class="row mb-3">
			<h6>Employee ID: {form?.employee.id || ''}</h6>
		</div>
		<div class="row mb-3">
			<h6>Last Name: {form?.employee.last_name || ''}</h6>
		</div>
		<div class="row mb-3">
			<h6>First name: {form?.employee.first_name || ''}</h6>
		</div>
		<div class="row mb-3">
			<h6>Email: {form?.employee.email || ''}</h6>
		</div>
		<div class="row mb-3">
			<h6>Job Title: {form?.employee.job_title || ''}</h6>
		</div>
		<div class="row mb-3">
			<h6>Start year: {form?.employee.start_year || ''}</h6>
		</div>
		<div class="row mb-3">
			<h6>Salary: {form?.employee.salary || ''}</h6>
		</div>
	</div>
		<!-- else show the form again (very simple error handling - should also show validation errors)-->
		{:else}
		<div class="row">
			<!-- Page Header -->
			<h2 class="mt-5">Update Employee</h2>
		</div>

		<div class="row">
			<!-- Employee Form -->
			<form
			 	method="POST" 
			 	action="?/update_employee"
				 use:enhance={({ form }) => {
					// Before form submission to server
					return async ({ result, update }) => {
						// After form submission to server
						if (result.type === 'success') {
							await applyAction(result);
						}
						if (result.type === 'invalid') {
							await applyAction(result);
						}
						update();
					};
				}}
			 >
				<div class="row mb-3">
					<label for="department_id" class="form-label">Department:</label>
					<div class="col-sm-8">
						<select id="department_id" class="form-select" name="department_id" value ={employee?.department_id} >
							<option value="0">Choose a department</option>
							{#each $departments as dept}
								<option value={dept.id}>{dept.name}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="row mb-3">
					<label for="last_name" class="form-label">Last Name:</label>
					<div class="col-sm-8">
						<input 
							id="last_name" 
							type="text" 
							class="form-control" 
							name="last_name" 
							value="{employee?.last_name || ''}"
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="first_name" class="form-label">First Name:</label>
					<div class="col-sm-8">
						<input 
							id="first_name" 
							type="text" 
							class="form-control" 
							name="first_name" 
							value="{employee?.first_name || ''}"
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="email" class="form-label">Email:</label>
					<div class="col-sm-8">
						<input
						id="email"
						type="email"
						class="form-control"
						name="email"
						value="{employee?.email || ''}"
					/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="job_title" class="form-label">Job Title:</label>
					<div class="col-sm-8">
						<input 
							id="job_title" 
							type="text" 
							class="form-control" 
							name="job_title" 
							value="{employee?.job_title || ''}" 
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="start_year" class="form-label">Start year:</label>
					<div class="col-sm-8">
						<input 
							id="start_year" 
							type="number"
							min="1999"
							max="{new Date().getFullYear() }"
							class="form-control" 
							name="start_year" 
							value="{employee?.start_year || ''}" 
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="salary" class="form-label">Salary:</label>
					<div class="col-sm-8">
						<input
							id="salary"
							type="number"
							min="0.00"
							max="1000000.00"
							step="0.01"
							class="form-control"
							name="salary"
							value="{employee?.salary || ''}"
						/>
					</div>
				</div>
				<!-- employeeId is a hidden field value is not required but set = 0-->
				<input name="id" type="hidden" value="{employee?.id || 0}" />
				<div class="mb-3">
					<button type="submit" class="btn btn-primary"> Update Employee </button>
					<a href="/" class="btn btn-secondary"> Cancel </a>
				</div>

				{#if form?.error}
					<div class="alert alert-danger col-sm-8" role="alert">validation failed: {form?.message}</div>
				{/if}
			</form>
			<!-- End form-->
		</div>
	{/if} <!-- End the if block-->
	<!-- End the if block-->
</div>
