import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDayWiseExpenseForChart } from "../../store/expense/ThunkFunctions/getDayWiseExpenseForChart";
import { getYearWiseExpense } from "../../store/expense/ThunkFunctions/getYearWiseExpense";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";

const DayWiseExpenseForChart = ({ yearWiseExpense, chartCategories }) => {
  const dispatch = useDispatch();

  const {
    dayWiseExpenseForChart,
    gettingDayWiseExpenseForChart,
    dayWiseExpenseForChartError,
    currentMonth,
    currentYear,
  } = useSelector((state) => state.expense);

  const { months } = useSelector((state) => state.utils);

  const { user } = useSelector((state) => state.user);

  const [dayWiseExpenseYear, setDayWiseExpenseYear] = useState("");
  const [dayWiseExpenseMonth, setDayWiseExpenseMonth] = useState("");
  const [dayWiseExpenseCategory, setDayWiseExpenseCategory] = useState("All");

  useEffect(() => {
    if (user)
      dispatch(
        getDayWiseExpenseForChart([
          currentYear,
          currentMonth,
          dayWiseExpenseCategory,
        ])
      );
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(getYearWiseExpense());

      setDayWiseExpenseYear(currentYear);
      setDayWiseExpenseMonth(months[currentMonth - 1]);
    }
  }, [user, Object(yearWiseExpense).length]);

  const handleDayWiseExpenseYearChange = (e) => {
    setDayWiseExpenseYear(e.target.value);
    dispatch(
      getDayWiseExpenseForChart([
        e.target.value,
        months.indexOf(dayWiseExpenseMonth) === -1
          ? "All"
          : months.indexOf(dayWiseExpenseMonth) + 1,
        dayWiseExpenseCategory,
      ])
    );
  };

  const handleDayWiseExpenseMonthChange = (e) => {
    setDayWiseExpenseMonth(e.target.value);
    dispatch(
      getDayWiseExpenseForChart([
        dayWiseExpenseYear,
        months.indexOf(e.target.value) === -1
          ? "All"
          : months.indexOf(e.target.value) + 1,
        dayWiseExpenseCategory,
      ])
    );
  };

  const handleDayWiseExpenseCategoryChange = (e) => {
    setDayWiseExpenseCategory(e.target.value);
    dispatch(
      getDayWiseExpenseForChart([
        dayWiseExpenseYear,
        months.indexOf(dayWiseExpenseMonth) === -1
          ? "All"
          : months.indexOf(dayWiseExpenseMonth) + 1,
        e.target.value,
      ])
    );
  };

  return (
    <div>
      <select
        value={dayWiseExpenseYear}
        onChange={handleDayWiseExpenseYearChange}
      >
        {Object.keys(yearWiseExpense)
          ?.sort((a, b) => b - a)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>
      <select
        value={dayWiseExpenseMonth}
        onChange={handleDayWiseExpenseMonthChange}
      >
        {months.map((month) => {
          return (
            <option key={month} value={month}>
              {month}
            </option>
          );
        })}
      </select>
      <select
        value={dayWiseExpenseCategory}
        onChange={handleDayWiseExpenseCategoryChange}
      >
        <option value="All">All</option>
        {chartCategories?.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      {gettingDayWiseExpenseForChart ? (
        <div>Day Loading...</div>
      ) : dayWiseExpenseForChartError ? (
        <div>{dayWiseExpenseForChartError}</div>
      ) : (
        <BarOrAreaChart
          name="day"
          data={dayWiseExpenseForChart}
          chartType="area"
        />
      )}
    </div>
  );
};

export default DayWiseExpenseForChart;
