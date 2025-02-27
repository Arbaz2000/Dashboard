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
import {
  Mail,
  Phone,
  ChevronsUpDown,
  Users,
  Package as PackageIcon,
  DollarSign,
  Tag,
  Building2,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"; // Added new icons
import { packages } from "./mockPackageData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      accepted: "bg-green-100 text-green-800 hover:bg-green-200",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      declined: "bg-red-100 text-red-800 hover:bg-red-200",
    }[status] || "";

  return <Badge className={styles}>{status}</Badge>;
};

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Package>("profile");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set()); // Track selected rows
  const itemsPerPage = 7;

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.contact.includes(searchQuery)
  );

  const sortedPackages = filteredPackages.sort((a: Package, b: Package) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = sortedPackages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column as keyof Package);
      setSortOrder("asc");
    }
  };

  const handleRowSelect = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

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
                <DollarSign />
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
                <Users />
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold mt-3">1,234</div>
                <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-sm text-white font-bold mt-2">
                  <PackageIcon />
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
                className="p-2 border border-gray-300 rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="p-2 border rounded-lg justify-end border-gray-300 text-slate-400"
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="profile" className=" text-black">
                  Sort by Profile
                </option>
                <option value="company" className=" text-black">
                  Sort by Company
                </option>
                <option value="status" className=" text-black">
                  Sort by Status
                </option>
                <option value="estimateValue" className=" text-black">
                  Sort by Estimate Value
                </option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="border border-gray-300">
              <TableHeader>
                <TableRow className="border-b border-gray-300">
                  <TableHead className="border-r border-gray-300 text-md font-bold text-gray-700">
                    Select
                  </TableHead>
                  <TableHead className="border-r border-gray-300 text-md font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <PackageIcon className="w-5 h-5" />
                      <span>Profile</span>
                      {sortBy === "profile" && sortOrder === "asc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("profile")}
                        />
                      ) : sortBy === "profile" && sortOrder === "desc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("profile")}
                        />
                      ) : (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("profile")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r border-gray-300 text-md font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                      {sortBy === "email" && sortOrder === "asc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("email")}
                        />
                      ) : sortBy === "email" && sortOrder === "desc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("email")}
                        />
                      ) : (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("email")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r border-gray-300 text-md font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5" />
                      <span>Company</span>
                      {sortBy === "company" && sortOrder === "asc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("company")}
                        />
                      ) : sortBy === "company" && sortOrder === "desc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("company")}
                        />
                      ) : (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("company")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r border-gray-300 text-md font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-5 h-5" />
                      <span>Status</span>
                      {sortBy === "status" && sortOrder === "asc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("status")}
                        />
                      ) : sortBy === "status" && sortOrder === "desc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("status")}
                        />
                      ) : (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("status")}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r border-gray-300 text-md font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-5 h-5" />
                      <span>Estimate Value</span>
                      {sortBy === "estimateValue" && sortOrder === "asc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("estimateValue")}
                        />
                      ) : sortBy === "estimateValue" && sortOrder === "desc" ? (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("estimateValue")}
                        />
                      ) : (
                        <ChevronsUpDown
                          className="w-5 h-5"
                          onClick={() => handleSort("estimateValue")}
                        />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPackages.map((pkg, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      selectedRows.has(index) ? "bg-blue-100" : ""
                    } hover:bg-blue-50`} // Added hover effect
                    onClick={() => handleRowSelect(index)} // Toggle selection
                  >
                    <TableCell className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="transform scale-150 mt-3"
                        checked={selectedRows.has(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://via.placeholder.com/40" />
                          <AvatarFallback>
                            {pkg.profile
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold">{pkg.profile}</span>
                          <div className="text-xs text-gray-500">
                            Created: {pkg.profileCreatedAt}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="inline mr-2 opacity-60 w-4 h-4" />
                          {pkg.email}
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="inline mr-2 opacity-60 w-4 h-4" />
                          {pkg.contact}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://via.placeholder.com/40" />
                          <AvatarFallback>
                            {pkg.company
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold">{pkg.company}</span>
                          <div className="text-xs text-gray-500">
                            {pkg.companyEmail}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                    <TableCell>{pkg.estimateValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination controls */}
            <div className="flex justify-end mt-4">
              <button
                className="p-2 border rounded "
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5 stroke-5" />
              </button>
              <span className="p-2">{currentPage}</span>
              <button
                className="p-2 border rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-5 h-5 stroke-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
