import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardsPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Cards</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Card Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage travel cards, loyalty programs, and payment methods here.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

