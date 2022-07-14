import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearWiseExpense } from "../../store/expense/ThunkFunctions/getYearWiseExpense";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
// import { Breadcrumbs } from "@mantine/core";

const YearWiseExpense = () => {
  const dispatch = useDispatch();
  const { yearWiseExpense, gettingYearWiseExpense } = useSelector(
    (state) => state.expense
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    user && dispatch(getYearWiseExpense());
  }, [user]);

  const items = [
    { label: "Year", link: "/year" },
    // {
    //   label: "Expense",
    //   link: "/expense",
    // },
  ];

  if (gettingYearWiseExpense) return <div>Getting Expenses...</div>;
  return (
    <div>
      {/* <Breadcrumbs>{items}</Breadcrumbs> */}
      <Breadcrumb items={items} />
      {Object.keys(yearWiseExpense)?.map((expense, index) => (
        <Link style={{ margin: "10px" }} key={index} to={`/year/${expense}`}>
          {expense}: {yearWiseExpense[expense]}
        </Link>
      ))}
    </div>
  );
};

export default YearWiseExpense;
