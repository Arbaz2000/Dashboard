import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Service Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage additional services such as airport transfers, tours, and activities.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

