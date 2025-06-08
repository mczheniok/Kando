"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,PieChart,Pie, Cell} from "recharts"

const data = [
    { name: 'Январь', views: 1000, sales: 1000 },
    { name: 'Февраль', views: 2000, sales: 2000 },
    { name: 'Март', views: 500, sales: 3000},
];

  export function SalesChart({id}) {
      return (
        <div  id={id} style={{
            width: '100%', 
            height: 'auto',  
            boxSizing: 'border-box'
        }}>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"  dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
  };

  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  export function CircleGraphic() {

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];

    const linkTitle = [
        "telegram",
        "whatsapp",
        "youtube",
        "instagram"
    ]


      return (
        <div style={{width: "100%",height: "400px"}} className="flex flex-row align-center">
            <ul style={{width: "40%"}}>
                {linkTitle.map((el,ind) => {
                    return (
                        <li key={`graphic-info-el-${ind}`} className="flex flex-row justify-around align-center">
                            <h3>{el}</h3>
                            <div className="circle" style={{width: "33px",height: "33px",background: `${COLORS[ind]}`}}></div>
                        </li>
                    )
                })}
            </ul>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart width="100%" height={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_,index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
        </div>
      );
  }
  