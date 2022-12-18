import { Text, Button, Paper, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
import { Switch, Group } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { toggleLoadingOverlay } from "../../../store/utils";
import { useStyles } from "./Email.style";
import removeQueryFromUrl from "../../../utils/removeQueryFromUrl";
const {
    updateEmailSubscription,
} = require("../../../store/user/ThunkFunctions/updateEmailSubscription");

const Email = () => {
    const [monthlyReportChecked, setMonthlyReportChecked] = useState(false);
    const [yearlyReportChecked, setYearlyReportChecked] = useState(false);

    const { updatingEmailSubscription, user } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    const { classes } = useStyles();

    const smallScreen = useMediaQuery("(max-width: 470px)");

    removeQueryFromUrl("email");

    useEffect(() => {
        dispatch(toggleLoadingOverlay(updatingEmailSubscription));
    }, [updatingEmailSubscription]);

    useEffect(() => {
        setMonthlyReportChecked(user["email_subscription"].monthly);
        setYearlyReportChecked(user["email_subscription"].yearly);
    }, [user]);

    const handleEmailSubscription = () => {
        dispatch(
            updateEmailSubscription({
                monthly: monthlyReportChecked,
                yearly: yearlyReportChecked,
            })
        );
    };

    const SwitchText = ({ title, description }) => (
        <Stack spacing={0}>
            <Text size={smallScreen ? "md" : "xl"}>{title} </Text>
            <Text color="grey" size="xs">
                {description}
            </Text>
        </Stack>
    );

    return (
        <Paper
            className={classes.paper}
            p={smallScreen ? 0 : 30}
            radius={smallScreen ? "none" : "sm"}
            shadow={smallScreen ? "none" : "xs"}
            withBorder={!smallScreen}
        >
            <Stack align="flex-start">
                <Group noWrap className={classes.group} position="apart">
                    <SwitchText
                        title="Monthly Report"
                        description="Receive a monthly report of your expenses"
                    />
                    <Switch
                        onLabel="Yes"
                        offLabel="No"
                        mt={smallScreen ? -15 : -10}
                        checked={monthlyReportChecked}
                        labelPosition="left"
                        onChange={(event) =>
                            setMonthlyReportChecked(event.currentTarget.checked)
                        }
                        color="teal"
                        size={smallScreen ? "md" : "xl"}
                    />
                </Group>
                <Group noWrap className={classes.group} position="apart">
                    <SwitchText
                        title="Yearly Report"
                        description="Receive a yearly report of your expenses"
                    />
                    <Switch
                        checked={yearlyReportChecked}
                        onLabel="Yes"
                        offLabel="No"
                        mt={smallScreen ? -15 : -10}
                        labelPosition="left"
                        onChange={(event) =>
                            setYearlyReportChecked(event.currentTarget.checked)
                        }
                        color="teal"
                        size={smallScreen ? "md" : "xl"}
                    />
                </Group>
                <Group className={classes.group} mt={20} position="right">
                    <Button onClick={handleEmailSubscription} variant="filled">
                        {updatingEmailSubscription ? "Saving..." : "Save"}
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
};

export default Email;
