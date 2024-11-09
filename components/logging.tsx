import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { transactions } from "@/mock-data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Import ArcElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
); // Register ArcElement here

const LoggingCard = () => {
  // Sample data
  const transactionData = transactions; // Replace with actual fetched data

  // Prepare data for charts
  const transactionCounts = transactionData.reduce(
    (acc: { [key: string]: number }, transaction) => {
      const date = transaction.date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const riskLevels = transactionData.reduce(
    (acc: { [key: string]: number }, transaction) => {
      const risk = transaction.risk_score > 0 ? "High Risk" : "Low Risk";
      acc[risk] = (acc[risk] || 0) + 1;
      return acc;
    },
    {}
  );

  // Bar chart for transactions over time
  const barData = {
    labels: Object.keys(transactionCounts),
    datasets: [
      {
        label: "Transactions per Day",
        data: Object.values(transactionCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie chart for risk analysis
  const pieData = {
    labels: Object.keys(riskLevels),
    datasets: [
      {
        data: Object.values(riskLevels),
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2 space-x-4">
        {/* Transaction Frequency */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Transaction Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barData} />
          </CardContent>
        </Card>

        {/* Risk Score Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Risk Score Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={pieData} />
          </CardContent>
        </Card>

        {/* Detailed Transactions Table */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Transaction Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Risk Score</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell
                      className={
                        transaction.risk_score > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {transaction.risk_score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoggingCard;
