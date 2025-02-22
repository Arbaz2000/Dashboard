"use client"; // Ensure the component is rendered on the client side

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { mockLeads } from "../data/mockLeads";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define the lead stages
const stages = [
  "New",
  "Contacted",
  "Interested",
  "Qualified",
  "Negotiation/Lost",
  "Won/Churned",
];

// Function to get the color of the progress bar based on the progress
const getProgressBarColor = (progress: number) => {
  if (progress <= 16) return "bg-orange-500"; // Orange for 0-16%
  if (progress <= 33) return "bg-orange-300"; // Light Orange for 17-33%
  if (progress <= 50) return "bg-yellow-400"; // Yellow for 34-50%
  if (progress <= 66) return "bg-green-200"; // Light Green for 51-66%
  if (progress <= 83) return "bg-red-500"; // Red for 67-83%
  return "bg-green-500"; // Green for 84-100%
};

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className="mb-4">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-base font-medium break-words">{value}</div>
  </div>
);

export default function LeadDetailsPage() {
  const params = useParams();
  const leadId = params.id as string;

  // Fetch the lead data from mockLeads or API
  const lead = Object.values(mockLeads)
    .flat()
    .find((l) => l.id === leadId);

  if (!lead) {
    return <div>Lead not found</div>;
  }

  const [progress, setProgress] = useState(0); // Track progress based on selected stage
  const [activeTab, setActiveTab] = useState("notes");

  // Function to handle stage selection and progress update
  const handleStageClick = (index: number) => {
    setProgress((index / (stages.length - 1)) * 100); // Update progress based on the selected stage
  };

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 px-8 pt-6">
        {/* Left Column - Contact Details */}
        <div className="flex flex-wrap justify-between space-x-4 mb-6">
          <Card className="flex-1 min-w-[200px] max-w-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`}
                    />
                    <AvatarFallback>
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-3xl font-bold">{lead.name}</h2>
                    <p className="text-gray-500">Lead</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-3">
                  {/* Social Media Links (LinkedIn, Twitter, etc.) */}
                  <a
                    href="https://linkedin.com/in/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {/* LinkedIn Icon */}
                  </a>
                  <a
                    href="https://twitter.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {/* Twitter Icon */}
                  </a>
                  <a
                    href="https://facebook.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {/* Facebook Icon */}
                  </a>
                  <a
                    href="https://instagram.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {/* Instagram Icon */}
                  </a>
                  <a
                    href="https://github.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {/* GitHub Icon */}
                  </a>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex flex-wrap gap-4 space-x-8">
                <DetailItem label="Title" value="Sales Mgr" />
                <DetailItem label="Company" value="Widget.io" />
                <DetailItem label="Email" value="mohammadali@gmail.com" />
                <DetailItem label="Phone" value="385-685-6967" />
                <DetailItem label="Owner" value="Artiflow Agency" />
                <DetailItem label="Source" value={lead.source} />
                <DetailItem
                  label="Created"
                  value={new Date(lead.dateCreated).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Progress Bar Section */}
      <div className="mb-6 px-8">
        <h3 className="text-lg font-semibold mb-2">Lead Progress</h3>

        {/* Progress Bar with Stage Selection */}
        <div className="relative w-full bg-gray-200 rounded-full h-12 mb-4">
          {/* Progress Bar Fill */}
          <div
            className={`absolute h-12 rounded-full transition-all duration-300 ${getProgressBarColor(
              progress
            )}`}
            style={{ width: `${progress}%` }}
          ></div>

          {/* Stage Selection Buttons */}
          <div className="absolute w-full h-full flex justify-between items-center px-2">
            {stages.map((stage, index) => (
              <Button
                key={stage}
                variant="ghost"
                className={`text-lg z-10 h-8 hover:bg-transparent hover:no-underline ${
                  progress === (index / (stages.length - 1)) * 100
                    ? "font-bold text-black"
                    : "text-black"
                }`}
                onClick={() => handleStageClick(index)}
              >
                {stage}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section with Notes and Deals Tabs */}
      <div className="grid grid-cols-1 gap-8 px-8">
        <Card>
          <CardContent className="p-6 min-h-[500px]">
            <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="inline-flex w-auto">
                <TabsTrigger 
                  value="notes" 
                  className="px-4 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="deals" 
                  className="px-4 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Deals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add Notes</h3>
                  <textarea
                    className="w-full min-h-[150px] p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    placeholder="Write your notes here..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="deals" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add Deal Info</h3>
                  <textarea
                    className="w-full min-h-[150px] p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    placeholder="Enter deal details here..."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
