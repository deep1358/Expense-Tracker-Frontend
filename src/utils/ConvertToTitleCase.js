// Split string by _, if it exists and then convert it to camel case

export const ConvertToTitleCase = (str) => {
	return str
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
