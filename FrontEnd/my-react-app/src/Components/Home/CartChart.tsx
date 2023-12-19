import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface CartChartProps {
  nutrients: Record<string, number>;
}

const CartChart: React.FC<CartChartProps> = ({ nutrients }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (chartRef.current && nutrients) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (!chartInstanceRef.current) {
          const labels: string[] = [];
          const data: number[] = [];
          const colors: string[] = generateRandomColors(
            Object.keys(nutrients).length
          );

          for (const key in nutrients) {
            labels.push(key);
            data.push(nutrients[key]);
          }

          chartInstanceRef.current = new Chart(ctx, {
            type: "bar", // Change the chart type to "bar"
            data: {
              labels,
              datasets: [
                {
                  label: "Quantity",
                  data,
                  backgroundColor: colors,
                },
              ],
            },
            options: {
              // Add any specific options for the bar chart if needed
              scales: {
                y: { beginAtZero: true }, // Start the y-axis at zero
              },
            },
          });
        } else {
          // Update chart data if nutrients change
          const labels: string[] = [];
          const data: number[] = [];

          for (const key in nutrients) {
            labels.push(key);
            data.push(nutrients[key]);
          }

          chartInstanceRef.current.data.labels = labels;
          chartInstanceRef.current.data.datasets[0].data = data;
          chartInstanceRef.current.update();
        }
      }
    }
  }, [nutrients]);

  // Function to generate random colors
  const generateRandomColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  return <canvas ref={chartRef} />;
};

export default CartChart;
