import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

// const data = [
// 	{
// 		name: "Page A",
// 		uv: 4000,
// 		pv: 2400,
// 		amt: 2400,
// 	},
// ]

const Barchart = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<XAxis dataKey="category" />
				<YAxis />
				<Tooltip cursor={false} />
				<Legend />
				<CartesianGrid strokeDasharray="3 3" />
				<Bar dataKey="amount" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default Barchart;
