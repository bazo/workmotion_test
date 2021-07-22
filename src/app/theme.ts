import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StatusProgressTheme } from "components/employees/styles";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	components: {
		StatusProgress: StatusProgressTheme,
	},
});
export default theme;
