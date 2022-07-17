import React from "react";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  inner: {
    position: "relative",
  },

  image: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    paddingTop: 220,
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: 180,
    },
  },

  title: {
    fontFamily: `Lora, serif !important`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function Error404() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { currentMonth, currentYear } = useSelector((state) => state.expense);
  const { months } = useSelector((state) => state.utils);

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Image src="/404.svg" alt="404" className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address.
          </Text>
          <Group position="center">
            <Button
              onClick={() =>
                navigate(`/years/${currentYear}/${months[+currentMonth - 1]}`)
              }
              size="md"
            >
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
