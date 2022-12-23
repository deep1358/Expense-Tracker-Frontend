import { Tabs, createStyles } from "@mantine/core";

export default function StyledTabs(props) {
    const { leftnavwidth } = props;

    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor: theme.colors.dark[6],
                    color: theme.colors.dark[0],
                    border: `1px solid ${theme.colors.dark[6]}`,
                    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                    cursor: "pointer",
                    fontSize: theme.fontSizes.sm,
                    display: "flex",
                    alignItems: "center",

                    "&:disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },

                    "&:first-of-type": {
                        borderTopLeftRadius: theme.radius.sm,
                        borderBottomLeftRadius: theme.radius.sm,
                    },

                    "&:last-of-type": {
                        borderTopRightRadius: theme.radius.sm,
                        borderBottomRightRadius: theme.radius.sm,
                    },

                    "&[data-active]": {
                        backgroundColor: theme.colors.blue[7],
                        borderColor: theme.colors.blue[7],
                        color: theme.white,
                    },
                },

                tabsList: {
                    display: "flex",
                    width: `calc(84vw - ${leftnavwidth / 2}px - 20px)`,
                    overflowY: "hidden",
                    overflowX: "auto",
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* Internet Explorer 10+ */,
                    borderRadius: theme.radius.sm,
                    marginBottom: theme.spacing.xs,

                    "&::-webkit-scrollbar": {
                        width: 0,
                        height: 0,
                    },

                    "@media (max-width: 772px)": {
                        width: "94vw",
                    },
                },
            })}
            {...props}
        />
    );
}

export const useStyles = createStyles(() => ({
    settingsDropdown: {
        width: "fit-content",
        minWidth: "280px",
    },
}));
