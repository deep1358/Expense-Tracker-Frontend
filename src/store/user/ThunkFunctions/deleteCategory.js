import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async (categoryName) => {
    try {
      const res = await axios.delete("/category/" + categoryName);
      showNotification({
        id: "deleteCategory",
        message: "Category deleted successfully",
        color: "teal",
        icon: <Check />,
      });
      return res.data.categories;
    } catch (err) {
      showNotification({
        id: "deleteCategory",
        message: err.response.data.message || "Error deleting category",
        color: "red",
        icon: <X side={16} />,
      });
      return error(err);
    }
  }
);
