import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addExpense } from "../../store/expense/ThunkFunctions/addExpense";
import { getExpense } from "../../store/expense/ThunkFunctions/getExpense";
import { updateExpense } from "../../store/expense/ThunkFunctions/updateExpense";
import { setFocusedExpense } from "../../store/expense/index";
import {
  Paper,
  Textarea,
  NumberInput,
  Container,
  Select,
  Group,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Calendar } from "tabler-icons-react";
import { useForm } from "@mantine/form";

const AddOrUpdateExpense = () => {
  const { user } = useSelector((state) => state.user);
  const { creatingExpense, focusedExpense, updatingExpense } = useSelector(
    (state) => state.expense
  );

  const { months } = useSelector((state) => state.utils);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();

  const expenseForm = useForm({
    initialValues: {
      category: "",
      amount: 1,
      date: new Date(),
      note: "",
    },
    validate: (values) => ({
      category: values.category === "" ? "Category is required" : "",
      amount:
        values.amount < 0 || isNaN(values.amount) || values.amount === null
          ? "Amount must be greater than 0"
          : undefined,
      date: values.date ? undefined : "Date is required",
    }),
  });

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getExpense(id));
      if (Object.keys(focusedExpense).length > 0) {
        expenseForm.setValues({
          category: focusedExpense.category,
          amount: +focusedExpense.amount,
          date: new Date(
            focusedExpense.year,
            focusedExpense.month,
            focusedExpense.day
          ),
          note: focusedExpense.note,
        });
      }
    } else {
      expenseForm.setValues({
        category: "",
        amount: 1,
        date: new Date(),
        note: "",
      });
      dispatch(setFocusedExpense({}));
    }
  }, [id, Object.values(focusedExpense).length]);

  const currentDate = new Date();

  // const [expenseForm, setForm] = useState({
  //   amount: 0,
  //   date: currentDate.toISOString().split("T")[0],
  //   category: "",
  //   note: "",
  // });

  // const { amount, date, category, note } = expenseForm;

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  if (creatingExpense) return <div>Creating Expense</div>;
  if (updatingExpense) return <div>Updating Expense</div>;

  const handleSaveOrUpdate = (values) => {
    return console.log(values);
    if (id === undefined) {
      const year = expenseForm.values.date.getFullYear();
      const month = expenseForm.values.date.getMonth();
      const day = expenseForm.values.date.getDate();

      dispatch(
        addExpense({
          form: {
            ...values,
            date: new Date(year, month, day).toISOString().substring(0, 10),
          },
          year,
          month: months[+month],
          navigate,
        })
      );
    } else
      dispatch(
        updateExpense({
          form: values,
          year: focusedExpense.year,
          month: months[focusedExpense.month - 1],
          id,
          navigate,
        })
      );
  };

  const handleAddMore = () => {
    const year = expenseForm.values.date.getFullYear();
    const month = expenseForm.values.date.getMonth();
    const day = expenseForm.values.date.getDate();

    dispatch(
      addExpense({
        expenseForm: {
          ...expenseForm.values,
          date: new Date(year, month, day).toISOString().substring(0, 10),
        },
        year,
        month: months[+month],
      })
    );
    expenseForm.reset();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(expenseForm.values);
  // };

  return (
    <Container size={420}>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        size="md"
        radius="md"
        mx="auto"
      >
        <form onSubmit={expenseForm.onSubmit((values) => console.log(values))}>
          <Select
            searchable
            clearable
            data={user?.categories || []}
            label="Select a category"
            placeholder="Pick one"
            {...expenseForm.getInputProps("category")}
            required
          />
          <NumberInput
            name="amount"
            label="Amount"
            parser={(value) => value.replace(/\₹\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "₹ "
            }
            min={1}
            {...expenseForm.getInputProps("amount")}
            required
            stepHoldDelay={500}
            stepHoldInterval={100}
            spellCheck={false}
          />
          <DatePicker
            placeholder="Pick a date"
            label="Date"
            {...expenseForm.getInputProps("date")}
            disabled={id !== undefined}
            required
            icon={<Calendar size={16} />}
          />
          <Textarea
            label="Note"
            placeholder="Leave a note"
            {...expenseForm.getInputProps("note")}
            autosize
          />
          <Group position="center" mt="lg">
            <Button type="submit">Save</Button>
            {/* {id === undefined && (
              <Button onClick={handleAddMore}>Add More</Button>
            )} */}
          </Group>
        </form>
      </Paper>
    </Container>
    // <expenseForm onSubmit={handleSaveOrUpdate}>
    //   <select required name="category" value={category} onChange={handleChange}>
    //     <option defaultValue="Select Category">Select Category</option>
    //     {user?.categories?.map((category, index) => (
    //       <option value={category} key={index}>
    //         {category}
    //       </option>
    //     ))}
    //   </select>
    //   <input
    //     required
    //     value={amount}
    //     name="amount"
    //     onChange={handleChange}
    //     type="number"
    //     placeholder="Amount"
    //   />
    //   {!id && (
    //     <input
    //       value={date}
    //       name="date"
    //       onChange={handleChange}
    //       type="date"
    //       placeholder="Date"
    //     />
    //   )}
    //   <input
    //     value={note}
    //     name="note"
    //     onChange={handleChange}
    //     type="text"
    //     placeholder="Note"
    //   />
    //   <button type="submit">Save</button>
    //   {!Object.keys(focusedExpense).length > 0 && (
    //     <button onClick={handleAddMore}>Add More</button>
    //   )}
    // </expenseForm>
  );
};

export default AddOrUpdateExpense;
