import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ form, year, month, id, navigate }) => {
    try {
      await axios.patch("/expense", {
        category: form.category,
        amount: form.amount,
        note: form.note,
        _id: id,
      });
      showNotification({
        id: "updateExpense",
        message: "Expense updated successfully",
        color: "teal",
        icon: <Check />,
      });
      navigate(`/years/${year}/${month}`);
      return { errorMessage: "", id };
    } catch (err) {
      showNotification({
        id: "updateExpense",
        message: err.response.data.message || "Error updating expense",
        color: "red",
        icon: <X side={16} />,
      });
      return { errorMessage: err.response.data.message };
    }
  }
);
