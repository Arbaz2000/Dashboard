import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HotelsPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Hotels</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Hotel Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here you can manage hotel listings, availability, and pricing.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

