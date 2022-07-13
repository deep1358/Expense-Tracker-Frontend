import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (navigate) => {
    try {
      await axios.post("/auth/logout");
      showNotification({
        id: "logout",
        message: "You have been logged out",
        color: "teal",
        icon: <Check />,
      });
      navigate("/login");
      return null;
    } catch (err) {
      return error(err);
    }
  }
);
