"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa"; // Import the refresh icon
import { LeadCard } from "./components/LeadCard";
import { NewLeadForm } from "./components/NewLeadForm";
import { mockLeads } from "./data/mockLeads";

const COLUMNS = ["new-leads", "scheduled", "processing", "closed"] as const;

interface Lead {
  id: string;
  name: string;
  source: string;
  dateCreated: string;
}

type ColumnType = {
  [K in (typeof COLUMNS)[number]]: Lead[];
};

export default function LeadsPage() {
  const [columns, setColumns] = useState<ColumnType>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "dateCreated" | "none">("none");
  const [daysFilter, setDaysFilter] = useState<
    "all" | "today" | "7days" | "30days"
  >("all");

  const [refreshKey, setRefreshKey] = useState(0); // Add a state to force re-render

  // Re-render handler, for the refresh button click
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Change the key to force a re-render
  };

  const getFilteredAndSortedLeads = (leads: Lead[]) => {
    return leads
      .filter((lead) => {
        // Name filter
        const nameMatch = lead.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Days filter
        if (daysFilter === "all") return nameMatch;
        
        const days = getDaysFromNow(new Date(lead.dateCreated));
        return nameMatch && isInSelectedRange(days, daysFilter);
      })
      .sort((a, b) => {
        if (sortBy === "none") return 0;
        if (sortBy === "dateCreated") {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        }
        return a.name.localeCompare(b.name);
      });
  };

  const isInSelectedRange = (days: number, selectedRange: string) => {
    switch (selectedRange) {
      case "today":
        return days < 1;
      case "7days":
        return days <= 7;
      case "30days":
        return days <= 30;
      default:
        return true;
    }
  };

  const getDaysFromNow = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceId = source.droppableId as keyof ColumnType;
    const destinationId = destination.droppableId as keyof ColumnType;

    // Create a new copy of the columns
    const newColumns = { ...columns };

    // Get the actual arrays
    const sourceLeads = [...newColumns[sourceId]];
    const destinationLeads = sourceId === destinationId 
      ? sourceLeads 
      : [...newColumns[destinationId]];

    // Remove from source
    const [movedLead] = sourceLeads.splice(source.index, 1);

    // Add to destination
    destinationLeads.splice(destination.index, 0, movedLead);

    // Update the columns
    newColumns[sourceId] = sourceLeads;
    if (sourceId !== destinationId) {
      newColumns[destinationId] = destinationLeads;
    }

    setColumns(newColumns);
  };

  const handleAddLead = (lead: Omit<Lead, "id">) => {
    // Generate a unique ID using timestamp and random string
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    setColumns((prev) => {
      // Check if lead with same name already exists
      const leadExists = prev["new-leads"].some(
        (existingLead) => existingLead.name === lead.name
      );

      if (leadExists) {
        alert("A lead with this name already exists");
        return prev;
      }

      return {
        ...prev,
        "new-leads": [
          ...prev["new-leads"],
          {
            id: uniqueId,
            ...lead,
          },
        ],
      };
    });
  };

  const getDisplayTitle = (columnId: string) => {
    return columnId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const DroppableColumn = ({ columnId }: { columnId: string }) => {
    const leads = columns[columnId as keyof ColumnType];
    // Get filtered and sorted leads for display only
    const displayLeads = getFilteredAndSortedLeads(leads);
    
    return (
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[500px] space-y-2 p-2 rounded-md transition-colors ${
              snapshot.isDraggingOver ? "bg-slate-100" : ""
            }`}
          >
            {displayLeads.map((lead, index) => {
              // Find the actual index in the original array
              const originalIndex = leads.findIndex((l) => l.id === lead.id);
              return (
                <LeadCard
                  key={lead.id}
                  id={lead.id}
                  index={originalIndex} // Use the original index for drag and drop
                  name={lead.name}
                  source={lead.source}
                  dateCreated={lead.dateCreated}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
            <button
              onClick={handleRefresh}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <FaSyncAlt className="text-xl" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search leads..."
              className="px-3 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="none">No Sorting</option>
              <option value="dateCreated">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
            <select
              value={daysFilter}
              onChange={(e) => setDaysFilter(e.target.value as typeof daysFilter)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Days</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
            <NewLeadForm onAddLead={handleAddLead} />
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-4 gap-4">
            {COLUMNS.map((columnId) => (
              <Card key={columnId}>
                <CardHeader>
                  <CardTitle>{getDisplayTitle(columnId)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <DroppableColumn columnId={columnId} />
                </CardContent>
              </Card>
            ))}
          </div>
        </DragDropContext>
      </div>
    </DashboardShell>
  );
}
