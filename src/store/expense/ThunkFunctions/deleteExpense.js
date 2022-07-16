import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { Check } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id) => {
    try {
      await axios.delete(`expense/${id}`);
      showNotification({
        id: "deleteExpense",
        message: "Expense deleted successfully",
        color: "teal",
        icon: <Check />,
      });
      return { errorMessage: "", id };
    } catch (err) {
      return { errorMessage: err.response.data.message };
    }
  }
);
