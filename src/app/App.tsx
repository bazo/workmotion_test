import { Container } from "@chakra-ui/react";
import Header from "components/Header";
import EmployeesPage from "pages/EmployeesPage";
import { VFC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: VFC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Container maxW="container.xl" marginTop="5">
				<EmployeesPage />
			</Container>
		</QueryClientProvider>
	);
};

export default App;
