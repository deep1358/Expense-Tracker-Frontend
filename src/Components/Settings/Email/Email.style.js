import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
    paper: {
        width: "fit-content",
        minWidth: "450px",
        margin: "0 auto",

        "@media (max-width: 470px)": {
            minWidth: "93vw",
        },
    },
    group: {
        width: "100%",
    },
}));
