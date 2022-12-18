import { Container, Stack, Tabs, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StyledTabs from "./SettingsLayout.style";

const DEFAULT_TAB = "email";

export default function Settings() {
    const { leftNavWidth } = useSelector((state) => state.utils);

    const [currentTab, setCurrentTab] = useState(DEFAULT_TAB);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const tab = location.pathname.split("/")[2];
        if (tab) setCurrentTab(tab);
    });

    return (
        <Container size="lg" pt={10}>
            <Stack>
                <Title order={2} weight={300}>
                    Settings
                </Title>
                <StyledTabs
                    value={currentTab}
                    onTabChange={(value) => navigate(`/settings/${value}`)}
                    leftnavwidth={leftNavWidth}
                >
                    <Tabs.List>
                        <Tabs.Tab value="email">Email Preferences</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={currentTab} pt="xs">
                        <Outlet />
                    </Tabs.Panel>
                </StyledTabs>
            </Stack>
        </Container>
    );
}
