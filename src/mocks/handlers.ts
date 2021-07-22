import { Employee, EmployeeStatus } from "api/types";
import { rest, RestRequest } from "msw";

const defaultEmployees: Employee[] = [
	{
		id: 1,
		name: "Martin",
		status: EmployeeStatus.ADDED,
	},
	{
		id: 2,
		name: "Joe",
		status: EmployeeStatus.IN_CHECK,
	},
];

const STORAGE_NAMESPACE = "employees";

if (!localStorage.getItem(STORAGE_NAMESPACE)) {
	saveEmployees(defaultEmployees);
}

function saveEmployees(employees: Employee[]) {
	localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(employees));
}

function decodeEmployees(): Employee[] {
	return JSON.parse(localStorage.getItem(STORAGE_NAMESPACE) as string) as Employee[];
}

function createEmployee(name: string, existing: Employee[]): Employee {
	const id = Math.max(...existing.map(({ id }) => id)) + 1;

	return {
		id,
		name,
		status: EmployeeStatus.ADDED,
	};
}

export const handlers = [
	rest.get("/employees", (req, res, ctx) => {
		return res(ctx.status(200), ctx.text(localStorage.getItem(STORAGE_NAMESPACE) as string));
	}),

	rest.post("/employees", (req: RestRequest<{ name: string }>, res, ctx) => {
		const employees = decodeEmployees();

		const newEmployee = createEmployee(req.body["name"], employees);

		employees.push(newEmployee);

		saveEmployees(employees);

		return res(ctx.status(201), ctx.json(newEmployee));
	}),

	rest.patch("/employees/:id", (req: RestRequest<{ name: string }, { id: string }>, res, ctx) => {
		const id = parseInt(req.params.id);

		const employees = decodeEmployees();
		const index = employees.findIndex((employee) => employee.id === id);
		employees[index] = { ...employees[index], ...req.body };

		saveEmployees(employees);

		return res(ctx.status(200), ctx.json(employees[index]));
	}),
];
