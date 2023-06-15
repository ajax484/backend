const allowednoncechars = "1234567890";
export function generateNonce(length = 9) {
	let nonce = "";
	for (let i = 0; i < length; i++) {
		const c = Math.ceil(Math.random() * 9);
		nonce += allowednoncechars[c];
	}

	return nonce;
}