"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useState, StrictMode } from "react";
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
  const [sortBy, setSortBy] = useState<"name" | "dateCreated">("dateCreated");

  const getFilteredAndSortedLeads = (leads: Lead[]) => {
    return leads
      .filter((lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "dateCreated") {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        }
        return a.name.localeCompare(b.name);
      });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If the card is dropped in the same place (same column and same index), don't do anything
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Copy the columns to avoid direct mutation
    const newColumns = { ...columns };

    // Extract source and destination arrays
    const sourceArray = newColumns[source.droppableId as keyof ColumnType];
    const destArray = newColumns[destination.droppableId as keyof ColumnType];

    // Remove the item from the source array
    const [removed] = sourceArray.splice(source.index, 1);

    // If moving to the same column, simply insert at the new index without duplicating
    if (source.droppableId === destination.droppableId) {
      sourceArray.splice(destination.index, 0, removed);
    } else {
      // Otherwise, move the item to the destination column
      destArray.splice(destination.index, 0, removed);
    }

    // Set the updated state
    newColumns[source.droppableId as keyof ColumnType] = sourceArray;
    newColumns[destination.droppableId as keyof ColumnType] = destArray;

    // Only update if there's a change in order or column
    if (JSON.stringify(newColumns) !== JSON.stringify(columns)) {
      setColumns(newColumns);
    }
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

  const DroppableColumn = ({ columnId }: { columnId: string }) => (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[500px] space-y-2 p-2 rounded-md transition-colors ${
            snapshot.isDraggingOver ? "bg-slate-100" : ""
          }`}
        >
          {getFilteredAndSortedLeads(columns[columnId as keyof ColumnType]).map((lead, index) => (
            <LeadCard
              key={lead.id}
              id={lead.id}
              index={index}
              name={lead.name}
              source={lead.source}
              dateCreated={lead.dateCreated}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
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
              onChange={(e) => setSortBy(e.target.value as "name" | "dateCreated")}
              className="px-3 py-2 border rounded-md"
            >
              <option value="dateCreated">Sort by Date</option>
              <option value="name">Sort by Name</option>
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
