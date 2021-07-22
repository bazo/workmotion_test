import { Box, useStyleConfig } from "@chakra-ui/react";
import { EmployeeStatus } from "api/types";
import { VFC } from "react";

interface EmployeeStatusProps {
	status: EmployeeStatus;
	onChange: (status: EmployeeStatus) => void;
}

const EmployeeStatusProgress: VFC<EmployeeStatusProps> = ({ status, onChange }) => {
	const styles = useStyleConfig("StatusProgress");

	return (
		<Box __css={styles}>
			<div
				className={`left right ${status === EmployeeStatus.ADDED ? "active" : undefined}`}
				onClick={onChange.bind(null, EmployeeStatus.ADDED)}
			>
				Added
			</div>
			<div
				className={`left right ${status === EmployeeStatus.IN_CHECK ? "active" : undefined}`}
				onClick={onChange.bind(null, EmployeeStatus.IN_CHECK)}
			>
				In Check
			</div>
			<div
				className={`left right ${status === EmployeeStatus.APPROVED ? "active" : undefined}`}
				onClick={onChange.bind(null, EmployeeStatus.APPROVED)}
			>
				Approved
			</div>
			<div
				className={`left right ${status === EmployeeStatus.ACTIVE ? "active" : undefined}`}
				onClick={onChange.bind(null, EmployeeStatus.ACTIVE)}
			>
				Active
			</div>
			<div
				className={`left right ${status === EmployeeStatus.INACTIVE ? "active" : undefined}`}
				onClick={onChange.bind(null, EmployeeStatus.INACTIVE)}
			>
				Inactive
			</div>
		</Box>
	);
};

export default EmployeeStatusProgress;
