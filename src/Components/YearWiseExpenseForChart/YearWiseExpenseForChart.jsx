import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearWiseExpenseForChart } from "../../store/expense/ThunkFunctions/getYearWiseExpenseForChart";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";

const YearWiseExpenseForChart = ({ chartCategories }) => {
  const dispatch = useDispatch();

  const {
    yearWiseExpenseForChart,
    gettingYearWiseExpenseForChart,
    yearWiseExpenseForChartError,
  } = useSelector((state) => state.expense);

  const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
    (state) => state.utils
  );

  const { user } = useSelector((state) => state.user);

  const [yearWiseDays, setYearWiseDays] = useState([]);
  const [yearWiseMonths, setYearWiseMonths] = useState(months);

  const [yearWiseExpenseMonth, setYearWiseExpenseMonth] = useState("All");
  const [yearWiseExpenseDay, setYearWiseExpenseDay] = useState("All");
  const [yearWiseExpenseCategory, setYearWiseExpenseCategory] = useState("All");

  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    if (user)
      dispatch(
        getYearWiseExpenseForChart([
          yearWiseExpenseMonth,
          yearWiseExpenseDay,
          yearWiseExpenseCategory,
        ])
      );
  }, [user]);

  useEffect(() => {
    if (+yearWiseExpenseDay === 31) {
      setYearWiseMonths(_31DaysMonths);
    } else if (+yearWiseExpenseDay === 30) {
      setYearWiseMonths(_30DaysMonths);
    } else {
      setYearWiseMonths(months);
    }
  }, [yearWiseExpenseDay, months.length]);

  useEffect(() => {
    if (yearWiseExpenseMonth === "All") {
      setYearWiseDays(fixedDays);
    } else {
      const daysCount = new Date(
        2020,
        months.indexOf(yearWiseExpenseMonth) + 1,
        0
      ).getDate();
      setYearWiseDays(
        Array.from(Array(daysCount).keys())
          .map((i) => i + 1)
          .map((i) => i.toString())
          .map((i) => (i.length === 1 ? `0${i}` : i))
      );
    }
  }, [yearWiseExpenseMonth]);

  const handleYearWiseExpenseMonthChange = (e) => {
    setYearWiseExpenseMonth(e.target.value);
    dispatch(
      getYearWiseExpenseForChart([
        months.indexOf(e.target.value) === -1
          ? "All"
          : months.indexOf(e.target.value) + 1,
        yearWiseExpenseDay,
        yearWiseExpenseCategory,
      ])
    );
  };

  const handleYearWiseExpenseDayChange = (e) => {
    setYearWiseExpenseDay(e.target.value);
    dispatch(
      getYearWiseExpenseForChart([
        months.indexOf(yearWiseExpenseMonth) === -1
          ? "All"
          : months.indexOf(yearWiseExpenseMonth) + 1,
        e.target.value,
        yearWiseExpenseCategory,
      ])
    );
  };

  const handleYearWiseExpenseCategoryChange = (e) => {
    setYearWiseExpenseCategory(e.target.value);
    dispatch(
      getYearWiseExpenseForChart([
        months.indexOf(yearWiseExpenseMonth) === -1
          ? "All"
          : months.indexOf(yearWiseExpenseMonth) + 1,
        yearWiseExpenseDay,
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
        value={yearWiseExpenseMonth}
        onChange={handleYearWiseExpenseMonthChange}
      >
        <option value="All">All</option>
        {yearWiseMonths.map((month) => {
          return (
            <option key={month} value={month}>
              {month}
            </option>
          );
        })}
      </select>
      <select
        value={yearWiseExpenseDay}
        onChange={handleYearWiseExpenseDayChange}
      >
        <option value="All">All</option>
        {yearWiseDays.map((day) => {
          return (
            <option key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select>
      <select
        value={yearWiseExpenseCategory}
        onChange={handleYearWiseExpenseCategoryChange}
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
      {gettingYearWiseExpenseForChart ? (
        <div>Year Loading...</div>
      ) : yearWiseExpenseForChartError ? (
        <div>{yearWiseExpenseForChartError}</div>
      ) : (
        yearWiseExpenseForChart &&
        (chartType === "donut" ? (
          <DonutChart data={yearWiseExpenseForChart} name="year" />
        ) : (
          <BarOrAreaChart data={yearWiseExpenseForChart} name="year" />
        ))
      )}
    </div>
  );
};

export default YearWiseExpenseForChart;
