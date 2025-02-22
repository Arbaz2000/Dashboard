"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { mockLeads } from "../data/mockLeads";

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className="mb-4">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-base font-medium break-words">{value}</div>
    {/* Add break-words to prevent overflow */}
  </div>
);

export default function LeadDetailsPage() {
  const params = useParams();
  const leadId = params.id as string;

  // In a real app, you would fetch this data from your API
  const lead = Object.values(mockLeads)
    .flat()
    .find((l) => l.id === leadId);

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-wrap justify-between space-x-4 mb-6">
          {/* Left Column - Contact Details */}
          <Card className="flex-1 min-w-[200px] max-w-full">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
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

              {/* Responsive Details Section */}
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

        {/* Empty Section below Details */}
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardContent className="p-6 min-h-[500px]">
              {/* Empty section for future content */}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
