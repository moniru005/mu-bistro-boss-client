import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBook, FaUsers, FaWallet } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = axiosSecure.get("/order-stats");
      return (await res).data;
    },
  });

  //custom shape for the bar charts
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="w-full">
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>

      <div >
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x  shadow mt-10">
          <div className="stat ">
            <div className="stat-figure text-secondary">
              <FaWallet className="text-3xl text-orange-500"></FaWallet>
            </div>

            <div className="stat-title text-xl">Revenue</div>
            <div className="stat-value text-3xl">{"$ " + stats?.revenue}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl text-orange-500"></FaUsers>
            </div>

            <div className="stat-title text-xl">Users</div>
            <div className="stat-value text-3xl">{stats?.users}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaBook className="text-3xl text-orange-500"></FaBook>
            </div>

            <div className="stat-title text-xl">Menu Items</div>
            <div className="stat-value text-3xl">{stats?.menuItems}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat items-start">
            <div className="stat-figure text-secondary">
              <CiMemoPad className="text-3xl text-orange-500"></CiMemoPad>
            </div>

            <div className="stat-title text-xl">Orders</div>
            <div className="stat-value text-3xl">{stats?.orders}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-1/2">
            <BarChart
              width={400}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                ))}
              </Bar>
            </BarChart>
          </div>

          <div className="w-1/2">
            <PieChart 
            width={300} 
            height={285}
            >
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
