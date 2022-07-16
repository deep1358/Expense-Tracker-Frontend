import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { Check, X } from "tabler-icons-react";
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
      showNotification({
        id: "deleteExpense",
        message: err.response.data.message || "Error deleting expense",
        color: "red",
        icon: <X side={16} />,
      });
      return { errorMessage: err.response.data.message };
    }
  }
);
