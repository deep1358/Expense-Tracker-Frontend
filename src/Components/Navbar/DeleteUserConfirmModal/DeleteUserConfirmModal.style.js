import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  deleteModalGroup: {
    "& > *": {
      fontSize: ".95rem",
      [theme.fn.smallerThan("xs")]: {
        fontSize: ".75rem !important",
      },
    },
  },
}));

export default useStyles;
