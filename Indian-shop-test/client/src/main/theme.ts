import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const TIVRA_SECONDARY = "#EA376B";

export const theme = responsiveFontSizes(
	createTheme({
		typography: {
			fontFamily: "Inter",
		},
		palette: {
			primary: {
				main: "#391061",
			},
			secondary: {
				main: TIVRA_SECONDARY,
			},
			error: {
				main: red.A400,
			},
			background: {
				default: "#efeff5",
			},
			success: {
				main: "#15AD64",
			},
			text: {
				secondary: "#898989",
			},
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						fontSmooth: "antialiased",
					},
				},
			},
			MuiFormLabel: {
				styleOverrides: {
					asterisk: {
						color: TIVRA_SECONDARY,
						"&$error": {
							color: TIVRA_SECONDARY,
						},
					},
				},
			},
			MuiGrid2: {
				defaultProps: {
					padding: 0,
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						paddingTop: 8,
						paddingBottom: 8,
						backgroundColor: TIVRA_SECONDARY,
						borderRadius: "8px",
						"&:hover": {
							backgroundColor: "#d62759",
						},
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color: "#898989",
					},
				},
			},
			MuiLink: {
				styleOverrides: {
					root: {
						color: "#fff",
						textDecoration: "none",
					},
				},
			},
			MuiTab: {
				defaultProps: {
					style: {
						textTransform: "none",
						minHeight: "25px",
					},
				},
				styleOverrides: {
					root: {
						"&.Mui-selected": {
							backgroundColor: "transparent",
							color: "#391061",
						},
					},
				},
			},
			MuiStack: {
				defaultProps: {
					color: "#fff",
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						backgroundColor: "#efeff5",
						borderRadius: "8px",
						border: "none",
						"& fieldset": { border: "none" },
						"&:hover": { backgroundColor: "#efeff5" },
						"&:active": { backgroundColor: "#efeff5" },
						"&:focus": { backgroundColor: "#efeff5" },
						"&:focus-within": { backgroundColor: "#efeff5" },
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					input: {
						"&:-webkit-autofill": {
							"-webkit-box-shadow": "0 0 0 100px #efeff5 inset",
						},
					},
				},
			},
			MuiSelect: {
				defaultProps: {
					sx: {
						borderRadius: "50px",
						backgroundColor: "#efeff5",
						border: "none",
						"& fieldset": { border: "none" },
						"&:hover": { backgroundColor: "#efeff5" },
						"&:active": { backgroundColor: "#efeff5" },
						"&:focus": { backgroundColor: "#efeff5" },
						"&:focus-within": { backgroundColor: "#efeff5" },
					},
				},
				styleOverrides: {
					filled: {
						backgroundColor: "#efeff5",
						borderRadius: "8px",
						border: "none",
						"& fieldset": { border: "none" },
						"&:hover": { backgroundColor: "#efeff5" },
						"&:active": { backgroundColor: "#efeff5" },
						"&:focus": { backgroundColor: "#efeff5" },
						"&:focus-within": { backgroundColor: "#efeff5" },
					},
				},
			},
			MuiList: {
				styleOverrides: {
					root: {
						width: "100%",
					},
				},
			},
		},
	})
);
