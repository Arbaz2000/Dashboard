"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { packages } from "./packageData"; // Add this import

type Package = {
  profile: string;
  email: string;
  contact: string;
  company: string;
  status: string;
  estimateValue: string;
};

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  // Paginate sorted packages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = sortedPackages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  // Pagination control handlers
  const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Packages</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
          <div className="col-span-2 ">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Estimate
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap justify-center gap-8 sm:gap-16 md:gap-32">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">$12.5k</div>
                      <span className="text-green-500">Accepted</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">$50k</div>
                      <span className="text-yellow-500">Pending</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">$20k</div>
                      <span className="text-red-500">Cancelled</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-muted-foreground mt-4 sm:mt-0">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    <br />
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold mt-3">1,234</div>
                <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-sm text-white font-bold mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 mr-1"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>+15.2%</span>
                </span>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex space-x-4 ">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="p-2 border rounded justify-end "
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="profile">Sort by Profile</option>
                <option value="company">Sort by Company</option>
                <option value="status">Sort by Status</option>
                <option value="estimateValue">Sort by Estimate Value</option>
              </select>
            </div>
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
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Estimate Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPackages.map((pkg, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{pkg.profile}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="inline mr-2 opacity-60" />
                          {pkg.email}
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="inline mr-2 opacity-60" />
                          {pkg.contact}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{pkg.company}</TableCell>
                    <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                    <TableCell>{pkg.estimateValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
              <button
                className="p-2 border rounded"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="p-2 border rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
