import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  To reset your password, go to the login page and click on the "Forgot Password" link. Follow the
                  instructions sent to your email to create a new password.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I update my profile information?</AccordionTrigger>
                <AccordionContent>
                  You can update your profile information by navigating to the Settings page. There, you'll find options
                  to edit your personal details, contact information, and preferences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What should I do if I encounter an error?</AccordionTrigger>
                <AccordionContent>
                  If you encounter an error, try refreshing the page first. If the issue persists, please contact our
                  support team with details about the error and steps to reproduce it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

