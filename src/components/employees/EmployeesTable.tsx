import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Employee, EmployeeStatus } from "api/types";
import { VFC } from "react";

import EmployeeAvatar from "./EmployeeAvatar";
import EmployeeStatusProgress from "./EmployeeStatus";

interface EmployeesTableProps {
	employees?: Employee[];
	onStatusChange: (employee: Employee, newStatus: EmployeeStatus) => void;
}

const EmployeesTable: VFC<EmployeesTableProps> = ({ employees, onStatusChange }) => {
	return (
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>Photo</Th>
					<Th>Name</Th>
					<Th>Status</Th>
				</Tr>
			</Thead>
			<Tbody>
				{employees?.map((employee) => {
					return (
						<Tr key={employee.id}>
							<Td>
								<EmployeeAvatar name={employee.name} />
							</Td>
							<Td>{employee.name}</Td>
							<Td>
								<EmployeeStatusProgress status={employee.status} onChange={onStatusChange.bind(null, employee)} />
							</Td>
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default EmployeesTable;
