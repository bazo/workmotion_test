export enum EmployeeStatus {
	ADDED,
	IN_CHECK,
	APPROVED,
	ACTIVE,
	INACTIVE,
}

export interface Employee {
	id: number;
	name: string;
	status: EmployeeStatus;
}
