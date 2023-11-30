import { Column } from '@ant-design/plots';

const Chart = () => {
  const data = [
    {
      type: "Jan",
      sales: 50,
    },
    {
      type: "Feb",
      sales: 130,
    },
    {
      type: "Mar",
      sales: 525,
    },
    {
      type: "Apr",
      sales: 285,
    },
    {
      type: "May",
      sales: 470,
    },
    {
      type: "Jun",
      sales: 130,
    },
    {
      type: "July",
      sales: 285,
    },
    {
      type: "Aug",
      sales: 240,
    },
    {
      type: "Sept",
      sales: 710,
    },
    {
      type: "Oct",
      sales: 470,
    },
    {
      type: "Nov",
      sales: 640,
    },
    {
      type: "Dec",
      sales: 1110,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  return <Column {...config} />;
};

export default Chart
