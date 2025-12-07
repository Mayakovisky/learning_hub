import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, TrendingUp, CreditCard, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Payment {
  id: string;
  studentName: string;
  courseName: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  paymentMethod: string;
  transactionId: string;
}

const mockPayments: Payment[] = [
  {
    id: "PAY001",
    studentName: "Alex Johnson",
    courseName: "Web Development Bootcamp",
    amount: 89.99,
    status: "completed",
    date: "2024-06-15",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567890",
  },
  {
    id: "PAY002",
    studentName: "Emma Davis",
    courseName: "Data Science Fundamentals",
    amount: 79.99,
    status: "completed",
    date: "2024-06-14",
    paymentMethod: "PayPal",
    transactionId: "txn_1234567891",
  },
  {
    id: "PAY003",
    studentName: "Michael Brown",
    courseName: "UI/UX Design Principles",
    amount: 69.99,
    status: "pending",
    date: "2024-06-14",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567892",
  },
  {
    id: "PAY004",
    studentName: "Sarah Wilson",
    courseName: "Advanced Python Programming",
    amount: 99.99,
    status: "completed",
    date: "2024-06-13",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567893",
  },
  {
    id: "PAY005",
    studentName: "John Smith",
    courseName: "Digital Marketing Basics",
    amount: 49.99,
    status: "failed",
    date: "2024-06-13",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567894",
  },
  {
    id: "PAY006",
    studentName: "Lisa Chen",
    courseName: "Web Development Bootcamp",
    amount: 89.99,
    status: "refunded",
    date: "2024-06-12",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567895",
  },
  {
    id: "PAY007",
    studentName: "David Martinez",
    courseName: "Mobile App Development",
    amount: 119.99,
    status: "completed",
    date: "2024-06-12",
    paymentMethod: "Stripe",
    transactionId: "txn_1234567896",
  },
  {
    id: "PAY008",
    studentName: "Jessica Lee",
    courseName: "UI/UX Design Principles",
    amount: 69.99,
    status: "completed",
    date: "2024-06-11",
    paymentMethod: "PayPal",
    transactionId: "txn_1234567897",
  },
];

export const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedPayments = payments.filter((p) => p.status === "completed");
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const averageTransaction =
    totalRevenue / (completedPayments.length || 1);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      case "refunded":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <span className="text-destructive">✕</span>;
      case "refunded":
        return <span className="text-muted-foreground">↩</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment Management</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage all transactions</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    ${totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {completedPayments.length} transactions
                  </p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Amount</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    ${pendingAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-yellow-500 mt-2">
                    {payments.filter((p) => p.status === "pending").length} pending
                  </p>
                </div>
                <div className="text-3xl">⏳</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Transaction</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    ${averageTransaction.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Per transaction</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {((completedPayments.length / payments.length) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-green-500 mt-2">Completion rate</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, course, or transaction ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions ({filteredPayments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {payment.transactionId}
                      </TableCell>
                      <TableCell className="font-medium">{payment.studentName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {payment.courseName}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <Badge
                            variant={getStatusBadgeVariant(payment.status)}
                            className="capitalize"
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {payment.paymentMethod}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { method: "Credit Card", count: 5, percentage: 62.5 },
                { method: "PayPal", count: 2, percentage: 25 },
                { method: "Stripe", count: 1, percentage: 12.5 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.method}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Status Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { status: "Completed", count: completedPayments.length, color: "text-green-500" },
                {
                  status: "Pending",
                  count: payments.filter((p) => p.status === "pending").length,
                  color: "text-yellow-500",
                },
                {
                  status: "Failed",
                  count: payments.filter((p) => p.status === "failed").length,
                  color: "text-red-500",
                },
                {
                  status: "Refunded",
                  count: payments.filter((p) => p.status === "refunded").length,
                  color: "text-gray-500",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-foreground">{item.status}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPayments;
