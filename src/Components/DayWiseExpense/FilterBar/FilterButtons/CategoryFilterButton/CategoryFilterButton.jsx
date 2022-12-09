import { Menu, ScrollArea, Stack, Text, UnstyledButton } from "@mantine/core";
import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import { Selector } from "tabler-icons-react";
import { useStyles } from "../../../../SelectPaymentMode/SelectPaymentMode.style";

const CategoryFilterButton = ({
    forDrawer,
    category,
    handleAppliedFilters,
    width,
}) => {
    const [categoryOpened, setCategoryOpened] = useState(false);

    const { user } = useSelector((state) => state.user);

    const { classes, cx } = useStyles({
        opened: categoryOpened,
        forDayWiseExpense: !forDrawer,
    });

    const categoryItems = ["All", ...user?.categories].map((item) => (
        <Menu.Item
            onClick={() => handleAppliedFilters(item, "category")}
            key={item}
            className={cx({
                [classes.active]: category === item,
            })}
        >
            <Text className={classes.label}>{item}</Text>
        </Menu.Item>
    ));

    return (
        <Stack style={{ width }} mt={forDrawer && 8} spacing={2}>
            <Text className={classes.placeHolder}>Category</Text>
            <Menu
                onOpen={() => setCategoryOpened(true)}
                onClose={() => setCategoryOpened(false)}
                radius="sm"
                width="target"
            >
                <Menu.Target style={{ width: forDrawer && "100%" }}>
                    <UnstyledButton className={classes.control}>
                        <Text className={classes.label}>{category}</Text>
                        <Selector size={12} color="gray" />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <ScrollArea
                        styles={{
                            height: 40 * categoryItems.length + 1,
                        }}
                        className={classes.scrollArea}
                    >
                        {categoryItems}
                    </ScrollArea>
                </Menu.Dropdown>
            </Menu>
        </Stack>
    );
};

export default memo(CategoryFilterButton);
