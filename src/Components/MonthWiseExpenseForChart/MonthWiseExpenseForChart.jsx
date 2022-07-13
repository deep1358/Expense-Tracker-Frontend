import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthWiseExpenseForChart } from "../../store/expense/ThunkFunctions/getMonthWiseExpenseForChart";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";

const MonthWiseExpenseForChart = ({ chartCategories, yearWiseExpense }) => {
  const dispatch = useDispatch();

  const {
    monthWiseExpenseForChart,
    gettingMonthWiseExpenseForChart,
    monthWiseExpenseForChartError,
  } = useSelector((state) => state.expense);

  const { fixedDays } = useSelector((state) => state.utils);

  const { user } = useSelector((state) => state.user);

  const [monthWiseExpenseYear, setMonthWiseExpenseYear] = useState("All");
  const [monthWiseExpenseDay, setMonthWiseExpenseDay] = useState("All");
  const [monthWiseExpenseCategory, setMonthWiseExpenseCategory] =
    useState("All");

  const [chartType, setChartType] = useState("bar");

  const handleMonthWiseExpenseYearChange = (e) => {
    setMonthWiseExpenseYear(e.target.value);
    dispatch(
      getMonthWiseExpenseForChart([
        e.target.value,
        monthWiseExpenseDay,
        monthWiseExpenseCategory,
      ])
    );
  };

  const handleMonthWiseExpenseDayChange = (e) => {
    setMonthWiseExpenseDay(e.target.value);
    dispatch(
      getMonthWiseExpenseForChart([
        monthWiseExpenseYear,
        e.target.value,
        monthWiseExpenseCategory,
      ])
    );
  };

  useEffect(() => {
    if (user)
      dispatch(
        getMonthWiseExpenseForChart([
          monthWiseExpenseYear,
          monthWiseExpenseDay,
          monthWiseExpenseCategory,
        ])
      );
  }, [user]);

  const handleMonthWiseExpenseCategoryChange = (e) => {
    setMonthWiseExpenseCategory(e.target.value);
    dispatch(
      getMonthWiseExpenseForChart([
        monthWiseExpenseYear,
        monthWiseExpenseDay,
        e.target.value,
      ])
    );
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div>
      <select
        value={monthWiseExpenseYear}
        onChange={handleMonthWiseExpenseYearChange}
      >
        <option value="All">All</option>
        {Object.keys(yearWiseExpense)
          ?.sort((a, b) => b - a)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>
      <select
        value={monthWiseExpenseDay}
        onChange={handleMonthWiseExpenseDayChange}
      >
        <option value="All">All</option>
        {fixedDays.map((day) => {
          return (
            <option key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select>
      <select
        value={monthWiseExpenseCategory}
        onChange={handleMonthWiseExpenseCategoryChange}
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
      <select value={chartType} onChange={handleChartTypeChange}>
        <option value="bar">Bar</option>
        <option value="donut">Donut</option>
      </select>
      {gettingMonthWiseExpenseForChart ? (
        <div>Month Loading...</div>
      ) : monthWiseExpenseForChartError ? (
        <div>{monthWiseExpenseForChartError}</div>
      ) : (
        monthWiseExpenseForChart &&
        (chartType === "donut" ? (
          <DonutChart data={monthWiseExpenseForChart} name="month" />
        ) : (
          <BarOrAreaChart data={monthWiseExpenseForChart} name="month" />
        ))
      )}
    </div>
  );
};

export default MonthWiseExpenseForChart;
