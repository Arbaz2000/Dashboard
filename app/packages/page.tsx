"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, ChevronUp, ChevronDown } from "lucide-react"; // Importing lucide-react icons

type Package = {
  profile: string;
  email: string;
  contact: string;
  company: string;
  status: string;
  estimateValue: string;
};

// Example data - you can replace this with your actual data fetching logic
const packages = [
  {
    profile: "John Doe",
    email: "john@example.com",
    contact: "+1 234-567-8900",
    company: "Travel Corp",
    status: "accepted",
    estimateValue: "$5,000",
  },
  {
    profile: "Jane Smith",
    email: "jane@example.com",
    contact: "+1 234-567-8901",
    company: "Vacation Ltd",
    status: "pending",
    estimateValue: "$3,500",
  },
  {
    profile: "Alice Green",
    email: "alice@example.com",
    contact: "+1 234-567-8902",
    company: "Explore Co",
    status: "accepted",
    estimateValue: "$4,200",
  },
  {
    profile: "Bob White",
    email: "bob@example.com",
    contact: "+1 234-567-8903",
    company: "Holiday Ventures",
    status: "declined",
    estimateValue: "$2,800",
  },
  {
    profile: "Charlie Black",
    email: "charlie@example.com",
    contact: "+1 234-567-8904",
    company: "Global Tours",
    status: "pending",
    estimateValue: "$6,100",
  },
  {
    profile: "Diana Blue",
    email: "diana@example.com",
    contact: "+1 234-567-8905",
    company: "Adventure Travel",
    status: "accepted",
    estimateValue: "$7,500",
  },
  {
    profile: "Evan Gray",
    email: "evan@example.com",
    contact: "+1 234-567-8906",
    company: "Journey Enterprises",
    status: "pending",
    estimateValue: "$4,800",
  },
];

const getStatusBadge = (status: string) => {
  const styles =
    {
      accepted: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      declined: "bg-red-100 text-red-800",
    }[status] || "";

  return <Badge className={styles}>{status}</Badge>;
};

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Package>("profile");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter packages based on search query
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.contact.includes(searchQuery)
  );

  // Sort packages based on the selected column and order
  const sortedPackages = filteredPackages.sort((a: Package, b: Package) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new column to sort by and default to ascending order
      setSortBy(column as keyof Package);
      setSortOrder("asc");
    }
  };

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Packages</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-2 border rounded"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="profile">Sort by Profile</option>
              <option value="company">Sort by Company</option>
              <option value="status">Sort by Status</option>
              <option value="estimateValue">Sort by Estimate Value</option>
            </select>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Package Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-2">
                      <span>Profile</span>
                      {sortBy === "profile" && sortOrder === "asc" ? (
                        <ChevronUp
                          className="w-4 h-4"
                          onClick={() => handleSort("profile")}
                        />
                      ) : sortBy === "profile" && sortOrder === "desc" ? (
                        <ChevronDown
                          className="w-4 h-4"
                          onClick={() => handleSort("profile")}
                        />
                      ) : (
                        <ChevronUp
                          className="w-4 h-4"
                          onClick={() => handleSort("profile")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-2">
                      <span>Email</span>
                      {sortBy === "email" && sortOrder === "asc" ? (
                        <ChevronUp
                          className="w-4 h-4"
                          onClick={() => handleSort("email")}
                        />
                      ) : sortBy === "email" && sortOrder === "desc" ? (
                        <ChevronDown
                          className="w-4 h-4"
                          onClick={() => handleSort("email")}
                        />
                      ) : (
                        <ChevronUp
                          className="w-4 h-4"
                          onClick={() => handleSort("email")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-2">
                      <span>Contact</span>
                      {sortBy === "contact" && sortOrder === "asc" ? (
                        <ChevronUp
                          className="w-4 h-4"
                          onClick={() => handleSort("contact")}
                        />
                      ) : sortBy === "contact" && sortOrder === "desc" ? (
                        <ChevronDown
                          className="w-4 h-4"
                          onClick={() => handleSort("contact")}
                        />
                      ) : (
                        <ChevronUp
                          className="w-4 h-4"
                          onClick={() => handleSort("contact")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Estimate Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPackages.map((pkg, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{pkg.profile}</TableCell>
                    <TableCell>
                      <Mail className="inline mr-2" />
                      {pkg.email}
                    </TableCell>
                    <TableCell>
                      <Phone className="inline mr-2" />
                      {pkg.contact}
                    </TableCell>
                    <TableCell>{pkg.company}</TableCell>
                    <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                    <TableCell>{pkg.estimateValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
