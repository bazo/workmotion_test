import { Employee } from "./types";

export async function fetchEmployees(): Promise<Employee[]> {
	const response = await fetch("/employees", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export async function createEmployee({ name }: Partial<Employee>): Promise<Employee> {
	const response = await fetch("/employees", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	});

	return response.json();
}

export async function updateEmployee({ id, data }: { id: number; data: Omit<Partial<Employee>, "id"> }): Promise<Employee> {
	const response = await fetch(`/employees/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return response.json();
}
