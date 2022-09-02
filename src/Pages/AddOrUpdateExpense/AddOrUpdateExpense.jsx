import { useParams } from "react-router-dom";
import { Paper, Container, Title } from "@mantine/core";
import AddOrUpdateExpenseForm from "../../Components/AddOrUpdateExpense/AddOrUpdateExpenseForm/AddOrUpdateExpenseForm";

const AddOrUpdateExpense = () => {
	const { id } = useParams();

	return (
		<>
			<Container size={420}>
				<Title align="center">
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
		</>
	);
};

export default AddOrUpdateExpense;
