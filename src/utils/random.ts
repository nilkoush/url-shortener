export default function random(Length: number) {
	let final: string = '';

	const randomChar = () => {
		let num = Math.floor(Math.random() * 62);
		if (num < 10) return num;
		if (num < 36) return String.fromCharCode(num + 55);
		return String.fromCharCode(num + 61);
	};

	while (final.length < Length) final += randomChar();

	return final;
}
