import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "app/App";
import theme from "app/theme";
import { worker } from "mocks/browser";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

async function prepare() {
	if (import.meta.env.DEV) {
		return worker.start();
	}
}

prepare().then(() => {
	ReactDOM.render(
		<StrictMode>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</StrictMode>,
		document.getElementById("root"),
	);
});
