import { useNavigate, useParams } from "react-router-dom";
import { Paper, Container, Title, ActionIcon } from "@mantine/core";
import AddOrUpdateExpenseForm from "../../Components/AddOrUpdateExpense/AddOrUpdateExpenseForm/AddOrUpdateExpenseForm";
import { ArrowLeft } from "tabler-icons-react";

const AddOrUpdateExpense = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    return (
        <Container mt={10} size={420}>
            <ActionIcon
                onClick={() => navigate(-1)}
                variant="default"
                pos="absolute"
                style={{ top: "9%" }}
            >
                <ArrowLeft size={16} />
            </ActionIcon>
            <Title align="center" weight={300}>
                {!id ? "Add Expense" : "Update Expense"}
            </Title>
            <Paper
                withBorder
                shadow="md"
                p={30}
                mt={30}
                size="md"
                radius="md"
                mx="auto"
            >
                <AddOrUpdateExpenseForm id={id} />
            </Paper>
        </Container>
    );
};

export default AddOrUpdateExpense;
