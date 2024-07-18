import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: (props) => ({
      Body: {
        bg: props.colorMode === "light"? "white" : "black",
        color: props.colorMode === "light"? "black" : "white",
        buttonBg: props.colorMode === "light"? "white" : "black",
        buttonText: props.colorMode === "light"? "black" : "white",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider  theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

