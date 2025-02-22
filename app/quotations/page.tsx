"use client"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuotationsTab } from "./components/quotations-tab"
import { InvoicesTab } from "./components/invoices-tab"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function QuotationsPage() {
  const [totals, setTotals] = useState({
    hotel: 0,
    car: 0,
    services: 0,
    commission: 0,
  })

  // Function to calculate totals from quotations
  const calculateTotals = (quotations: any[]) => {
    const newTotals = quotations.reduce((acc, quotation) => {
      return {
        hotel: acc.hotel + parseFloat(quotation.hotel.roomPrice || 0),
        car: acc.car + 0, // Add car price when available
        services: acc.services + parseFloat(quotation.services.price || 0),
        commission: acc.commission + 
          parseFloat(quotation.hotel.commission || 0) +
          parseFloat(quotation.car.commission || 0) +
          parseFloat(quotation.services.commission || 0),
      }
    }, { hotel: 0, car: 0, services: 0, commission: 0 })

    setTotals(newTotals)
  }

  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-4rem)] gap-4 p-8">
        <div className="flex-grow ">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Quotations/Invoices</h2>
          <Tabs defaultValue="quotations" className="space-y-4">
            <TabsList>
              <TabsTrigger value="quotations">Quotations</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
            <TabsContent value="quotations">
              <QuotationsTab onQuotationsChange={calculateTotals} />
            </TabsContent>
            <TabsContent value="invoices">
              <InvoicesTab />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Price Summary Section */}
        <Card className="w-1/4 h-full">
          <CardHeader>
            <CardTitle>Price Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Total Hotel Charges:</span>
                <span className="font-semibold">${totals.hotel.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Total Car Charges:</span>
                <span className="font-semibold">${totals.car.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Total Services:</span>
                <span className="font-semibold">${totals.services.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Total Commission:</span>
                <span className="font-semibold">${totals.commission.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-t-2 mt-4">
                <span className="text-lg font-bold">Grand Total:</span>
                <span className="text-lg font-bold">
                  ${(totals.hotel + totals.car + totals.services + totals.commission).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

