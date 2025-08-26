
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// import './GymServicesPieChart.scss';

const GymServicesPieChart = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Your color palette
  const colors = ['#559cf2', '#EFABFF', '#FFCB3B', '#000000', '#3A405A'];
  
  // Create data for the pie chart
  const pieData = services.map((service, index) => ({
    name: service,
    value: 1, // Equal weight for each service
    color: colors[index % colors.length],
    percentage: Math.round(100 / services.length)
  }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="custom-tooltip" 
          style={{ border: `2px solid ${payload[0].payload.color}` }}
        >
          <p 
            className="custom-tooltip__name" 
            style={{ color: payload[0].payload.color }}
          >
            {payload[0].payload.name}
          </p>
          <p className="custom-tooltip__percentage">
            {payload[0].payload.percentage}% of services
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        className="pie-label"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="gym-services-pie-chart">
      <h3 className="gym-services-pie-chart__title">
        Service Distribution
      </h3>

      <ResponsiveContainer className="gym-services-pie-chart__chart-container">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={activeIndex === index ? '#fff' : 'none'}
                strokeWidth={activeIndex === index ? 3 : 0}
                className={`recharts-pie-sector ${activeIndex === index ? 'recharts-pie-sector--active' : ''}`}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="gym-services-pie-chart__legend">
        {pieData.map((entry, index) => (
          <div
            key={entry.name}
            className={`gym-services-pie-chart__legend-item ${
              activeIndex === index ? 'gym-services-pie-chart__legend-item--active' : ''
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <div 
              className={`gym-services-pie-chart__legend-item-color ${
                activeIndex === index ? 'gym-services-pie-chart__legend-item-color--active' : ''
              }`}
              style={{
                background: entry.color,
                boxShadow: activeIndex === index ? `0 0 8px ${entry.color}` : 'none'
              }}
            />
            <span 
              className={`gym-services-pie-chart__legend-item-text ${
                activeIndex === index ? 'gym-services-pie-chart__legend-item-text--active' : ''
              }`}
              style={{ 
                color: activeIndex === index ? entry.color : '#333'
              }}
            >
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymServicesPieChart;