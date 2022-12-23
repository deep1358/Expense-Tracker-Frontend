import { Container, Select, Stack, Tabs, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StyledTabs, { useStyles } from "./SettingsLayout.style";

const DEFAULT_TAB = "email";

export default function Settings() {
    const { leftNavWidth } = useSelector((state) => state.utils);

    const location = useLocation();
    const currentTab = location.pathname.split("/")[2] || DEFAULT_TAB;

    const navigate = useNavigate();

    const smallScreen = useMediaQuery("(max-width: 575px)");

    const { classes } = useStyles();

    const tabs = [
        {
            value: "email",
            label: "Email Preferences",
        },
    ];

    return (
        <Container size="lg" pt={10}>
            <Stack>
                <Title order={2} weight={300}>
                    Settings
                </Title>
                {smallScreen && (
                    <Select
                        className={classes.settingsDropdown}
                        defaultValue={
                            tabs.find((tab) => tab.value === currentTab).label
                        }
                        onChange={(value) => {
                            const tab = tabs.find((tab) => tab.label === value);
                            navigate(`/settings/${tab.value}`);
                        }}
                        data={tabs.map((tab) => tab.label)}
                    />
                )}
                <StyledTabs
                    value={currentTab}
                    onTabChange={(value) => navigate(`/settings/${value}`)}
                    leftnavwidth={leftNavWidth}
                >
                    {!smallScreen && (
                        <Tabs.List>
                            {tabs.map((tab) => (
                                <Tabs.Tab key={tab.value} value={tab.value}>
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    )}

                    <Tabs.Panel value={currentTab} pt="xs">
                        <Outlet />
                    </Tabs.Panel>
                </StyledTabs>
            </Stack>
        </Container>
    );
}
