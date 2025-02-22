"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddQuotationModal } from "./add-quotation-modal";
import { QuotationCard } from "./quotation-card";
import { mockQuotations } from "../data/mock-quotations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface QuotationsTabProps {
  onQuotationsChange: (quotations: any[]) => void
}

export function QuotationsTab({ onQuotationsChange }: QuotationsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [sameCars, setSameCars] = useState<string[]>([]);
  const [editingQuotation, setEditingQuotation] = useState<string | null>(null);

  // Load mock data on component mount - only once
  useEffect(() => {
    const initialQuotations = mockQuotations;
    setQuotations(initialQuotations);
    // Wrap in setTimeout to avoid React 18 double-mount issue
    setTimeout(() => {
      onQuotationsChange(initialQuotations);
    }, 0);
  }, []); // Remove onQuotationsChange from dependencies

  const handleAddQuotation = (data: any) => {
    const newQuotations = [...quotations, { ...data, id: (quotations.length + 1).toString() }];
    setQuotations(newQuotations);
    setIsModalOpen(false);
    onQuotationsChange(newQuotations);
  };

  const handleDeleteQuotation = (id: string) => {
    const newQuotations = quotations.filter(q => q.id !== id);
    setQuotations(newQuotations);
    onQuotationsChange(newQuotations);
    // Also remove from sameCars if present
    setSameCars(prev => prev.filter(carId => carId !== id));
  };

  const handleEditQuotation = (id: string) => {
    setEditingQuotation(id);
    setIsModalOpen(true);
  };

  const handleSameCarChange = (id: string, checked: boolean) => {
    setSameCars((prev) =>
      checked ? [...prev, id] : prev.filter((carId) => carId !== id)
    );
  };

  return (
    <div className="space-y-4">
      {/* User Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/avatars/john-doe.png" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex gap-6">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Phone:</strong> +1 234 567 8900</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Quotation Button */}
      <Button onClick={() => setIsModalOpen(true)}>Add Quotation</Button>

      {/* Quotations List - Now with scroll */}
      <div className="max-h-[500px] overflow-y-auto">
        <div className="grid gap-4">
          {quotations.map((quotation) => (
            <QuotationCard
              key={quotation.id}
              quotation={quotation}
              onSameCarChange={handleSameCarChange}
              onDelete={handleDeleteQuotation}
              onEdit={handleEditQuotation}
              isSelected={sameCars.includes(quotation.id)}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Quotation Modal */}
      <AddQuotationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuotation(null);
        }}
        onSubmit={handleAddQuotation}
        editingQuotation={editingQuotation ? quotations.find(q => q.id === editingQuotation) : undefined}
      />
    </div>
  );
}
