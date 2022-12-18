export const styles = (theme) => ({
    "*, *::before, *::after": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "Poppins, serif !important",
    },
    ".apexcharts-zoomin-icon,.apexcharts-menu-icon,.apexcharts-zoomout-icon,.apexcharts-zoom-icon,.apexcharts-pan-icon,.apexcharts-reset-icon":
        {
            display: "none",
        },
    body: {
        ...theme.fn.fontStyles(),
        backgroundColor: theme.colors.dark[8],
        color: theme.colors.dark[0],
        lineHeight: theme.lineHeight,
        overflowX: "hidden",
    },
    ".apexcharts-theme-dark > svg": {
        background: "transparent !important",
    },
    ".mantine-Paper-root a": {
        textAlign: "center",
        textDecoration: "none",
    },
    ".mantine-Menu-dropdown ,.mantine-Input-input, .mantine-Select-dropdown, .mantine-Paper-root":
        {
            backgroundColor: theme.colors.dark[8],
        },
    ".mantine-Notification-root": {
        backgroundColor: theme.colors.dark[7],
    },
    a: {
        textDecoration: "none",
        color: "inherit",
    },
    ".noSelect": {
        WebkitTouchCallout: "none" /* iOS Safari */,
        WebkitUserSelect: "none" /* Safari */,
        KhtmlUserSelect: "none" /* Konqueror HTML */,
        MozUserSelect: "none" /* Old versions of Firefox */,
        MsUserSelect: "none" /* Internet Explorer/Edge */,
        UserSelect: "none" /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */,
    },
});
