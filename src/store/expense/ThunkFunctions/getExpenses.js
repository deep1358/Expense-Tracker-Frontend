import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export const getExpenses = createAsyncThunk(
  "expense/getExpenses",
  async ([year, month]) => {
    try {
      const res = await axios.get(`/expense/year/${year}/${month}`);
      return { expenses: res.data, errorMessage: "" };
    } catch (err) {
      showNotification({
        id: "getExpense",
        message: err.response.data.message || "Error getting expenses",
        color: "red",
        icon: <X side={16} />,
      });
      return { errorMessage: err.response.data.message, expense: null };
    }
  }
);
