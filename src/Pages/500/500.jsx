import React from "react";
import { Container, Title, Text, Image } from "@mantine/core";
import { useStyles } from "./500.style";

export default function Error500() {
	const { classes } = useStyles();

	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Image src="/500.svg" alt="500" className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>Internal Server Error</Title>
					<Text
						color="dimmed"
						size="xl"
						align="center"
						className={classes.description}
					>
						Something went wrong. Please try again later.
					</Text>
				</div>
			</div>
		</Container>
	);
}
