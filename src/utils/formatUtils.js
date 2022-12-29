class FormatUtils {
	static capitalizeWord(word) {
		return word[0].toUpperCase() + word.substring(1);
	}

	static getInputError(fieldApiName, errors) {
		for (let [key, value] of Object.entries(errors)) {
			if (key === fieldApiName) {
				return value;
			}
		}
	}
}

export default FormatUtils;
