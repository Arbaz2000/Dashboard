import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuotationsPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Quotations/Invoices</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Quotation and Invoice Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create, manage, and track quotations and invoices for your travel packages.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

