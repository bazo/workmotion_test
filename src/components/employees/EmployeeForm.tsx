import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { MutableRefObject } from "react";
import { Field, Form, FormRenderProps } from "react-final-form";

interface EmployeeFormProps<Values> {
	onSubmit: (values: Values) => void;
	submitRef?: MutableRefObject<FormRenderProps["handleSubmit"] | undefined>;
}

const EmployeeForm = <Values extends unknown>({ onSubmit, submitRef }: EmployeeFormProps<Values>) => {
	return (
		<>
			<Form<Values>
				onSubmit={onSubmit}
				render={({ handleSubmit }) => {
					if (submitRef) {
						submitRef.current = handleSubmit;
					}
					return (
						<form onSubmit={handleSubmit}>
							<Field name="name">
								{({ input, meta }) => (
									<FormControl id="name" isInvalid={meta.touched && meta.error}>
										<FormLabel>Name</FormLabel>
										<Input type="text" {...input} />
										<FormErrorMessage>{meta.error}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</form>
					);
				}}
			/>
		</>
	);
};

export default EmployeeForm;
