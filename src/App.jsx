import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import BaseLayout from "./Layout/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/user/ThunkFunctions/fetchUser";
import ProtectedRoute from "./Components/ProtectedRoute";
import DayWiseExpense from "./Pages/DayWiseExpense/DayWiseExpense";
import AddOrUpdateExpense from "./Pages/AddOrUpdateExpense/AddOrUpdateExpense";
import Categories from "./Pages/Category/Categories";
import PaymentModes from "./Pages/PaymentMode/PaymentModes";
import YearWiseExpense from "./Pages/YearWiseExpense/YearWiseExpense";
import MonthWiseExpense from "./Pages/MonthWiseExpense.jsx/MonthWiseExpense";
import DurationLayout from "./Layout/DurationLayout/DurationLayout";
import Error404 from "./Pages/404/404";
import Error500 from "./Pages/500/500";
import { Auth } from "./firebase";
import { MakeUnAuthenticated, toggleFetchingUser } from "./store/user";
import { LoadingOverlay } from "@mantine/core";
import CustomLoader from "./Components/CustomLoader";
import SettingsLayout from "./Layout/SettingsLayout/SettingsLayout";
import Email from "./Components/Settings/Email/Email";
import getUrlParameter from "./utils/getUrlParameter";

function App() {
    const dispatch = useDispatch();

    const [currentMonth] = useState(new Date().getMonth());
    const [currentYear] = useState(new Date().getFullYear());

    const { months } = useSelector((state) => state.utils);

    useEffect(() => {
        if (window.location.pathname !== "/serverDown") {
            dispatch(toggleFetchingUser(true));
            Auth.onAuthStateChanged((user) => {
                // Check from query that given email same as user email
                const emailFromQuery = getUrlParameter("email");

                const redirect_url = `/login?redirect_url=${encodeURIComponent(
                    "/settings/email"
                )}`;

                if (emailFromQuery && user && emailFromQuery !== user.email) {
                    window.location.href = redirect_url;
                    return;
                }
                // Email is there in query and user does not exist
                else if (emailFromQuery && !user) {
                    window.location.href = redirect_url;
                    return;
                }

                if (user) dispatch(fetchUser(user.email));
                else dispatch(MakeUnAuthenticated());
            });
        }
    }, []);

    const { loadingOverlay } = useSelector((state) => state.utils);

    return (
        <BrowserRouter>
            <LoadingOverlay
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                }}
                opacity={0.6}
                color="#000"
                loader={<CustomLoader />}
                blur={2}
                visible={loadingOverlay}
            />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<BaseLayout />}>
                        <Route
                            path="/"
                            element={
                                <Navigate
                                    to={`/years/${currentYear}/${months[currentMonth]}`}
                                />
                            }
                        />
                        <Route
                            path="/addExpense"
                            element={<AddOrUpdateExpense />}
                        />
                        <Route
                            path="/updateExpense/:id"
                            element={<AddOrUpdateExpense />}
                        />
                        <Route path="/categories" element={<Categories />} />
                        <Route
                            path="/payment_modes"
                            element={<PaymentModes />}
                        />
                        <Route path="/settings" element={<SettingsLayout />}>
                            <Route
                                path="/settings"
                                element={<Navigate to="/settings/email" />}
                            />
                            <Route path="/settings/email" element={<Email />} />
                        </Route>
                        <Route path="/" element={<DurationLayout />}>
                            <Route
                                path="/"
                                element={
                                    <Navigate
                                        to={`/years/${currentYear}/${months[currentMonth]}`}
                                    />
                                }
                            />
                            <Route
                                path="/years"
                                element={<YearWiseExpense />}
                            />
                            <Route
                                path="/years/:year"
                                element={<MonthWiseExpense />}
                            />
                            <Route
                                path="/years/:year/:month"
                                element={<DayWiseExpense />}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/serverDown" element={<Error500 />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
