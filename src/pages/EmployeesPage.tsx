import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Spacer, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import { createEmployee, fetchEmployees, updateEmployee } from "api";
import { Employee, EmployeeStatus } from "api/types";
import EmployeeForm from "components/employees/EmployeeForm";
import EmployeesTable from "components/employees/EmployeesTable";
import Modal from "components/Modal";
import { useRef } from "react";
import { FormRenderProps } from "react-final-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface FormValues {
	name: string;
}

const QUERY_KEY = "employees";

const EmployeesPage = () => {
	const submitRef = useRef<FormRenderProps["handleSubmit"]>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const queryClient = useQueryClient();
	const toast = useToast();

	const { data: employees, isLoading } = useQuery([QUERY_KEY], fetchEmployees);
	const createMutation = useMutation(createEmployee, {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEY);
			toast({
				title: "Employee created.",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		},
	});

	const updateMutation = useMutation(updateEmployee, {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEY);
			toast({
				title: "Employee updated.",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		},
	});

	const handleSubmit = ({ name }: FormValues) => {
		onClose();
		createMutation.mutate({
			name,
		});
	};

	const handleStatusChange = (employee: Employee, status: EmployeeStatus) => {
		updateMutation.mutate({
			id: employee.id,
			data: { status },
		});
	};

	if (isLoading) {
		return <Spinner size="xl" />;
	}

	return (
		<Box>
			<Flex>
				<Heading as="h2">Employees</Heading>
				<Spacer />
				<Button colorScheme="green" onClick={onOpen}>
					<AddIcon w={6} h={6} />
					&nbsp;Add employee
				</Button>
			</Flex>

			<EmployeesTable employees={employees} onStatusChange={handleStatusChange} />
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				body={<EmployeeForm<FormValues> onSubmit={handleSubmit} submitRef={submitRef} />}
				buttons={[
					<Button
						colorScheme="green"
						key="submit"
						onClick={() => {
							if (submitRef.current) {
								submitRef.current();
							}
						}}
					>
						Submit
					</Button>,
				]}
			></Modal>
		</Box>
	);
};

export default EmployeesPage;
