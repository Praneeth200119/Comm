export const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};

export const isNumber = (evt: any) => {
	if (!/[0-9]/.test(evt.key)) {
		evt.preventDefault();
	}
};

