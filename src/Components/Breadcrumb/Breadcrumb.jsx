import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import useStyles from "./Breadcrumb.style.js";

const Breadcrumb = ({ crumbItems, activeLinkIndex }) => {
	const { classes, cx } = useStyles();

	return (
		<div className={classes.breadcrumb}>
			{crumbItems.map((crumbItem, index) => (
				<Link
					to={crumbItem.to}
					className={cx(classes.breadcrumbItem, {
						[classes.breadcrumbItemActive]: index === activeLinkIndex,
					})}
					key={crumbItem.to}
				>
					<Text className={classes.breadcrumbItemLink}>
						{crumbItem.label}
					</Text>
				</Link>
			))}
		</div>
	);
};

export default Breadcrumb;
