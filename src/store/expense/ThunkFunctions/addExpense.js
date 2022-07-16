import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { Check } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async ({ form, year, month, navigate = null }) => {
    try {
      const res = await axios.post("/expense", form);
      showNotification({
        id: "addExpense",
        message: "Expense added successfully",
        color: "teal",
        icon: <Check />,
      });
      if (navigate !== null) navigate(`/years/${year}/${month}`);
      return { expense: res.data.expense, errorMessage: "" };
    } catch (err) {
      return { errorMessage: err.response.data.message, expense: null };
    }
  }
);
