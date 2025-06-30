import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {
  const getBarColor = (priority) => {
    switch (priority) {
      case 'Low':
        return '#00BC7D';
      case 'Medium':
        return '#FE9900';
      case 'High':
        return '#FF1F57';
      default:
        return '#00BC7D';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="font-medium">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }} 
            stroke="none" 
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }} 
            stroke="none" 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: "transparent" }} 
          />
          <Bar
            dataKey="count"
            nameKey="priority"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={index}
                fill={getBarColor(entry.priority)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
