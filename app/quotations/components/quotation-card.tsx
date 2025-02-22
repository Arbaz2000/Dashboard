import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuotationCardProps {
  quotation: {
    id: string
    hotel: {
      roomPrice: string
      commission: string
    }
    car: {
      type: string
      pickupLocation: string
      dropLocation: string
      commission: string
    }
    services: {
      type: string
      price: string
      commission: string
    }
    extraNotes: string
  }
  onSameCarChange: (id: string, checked: boolean) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  isSelected: boolean
}

export function QuotationCard({ 
  quotation, 
  onSameCarChange, 
  onDelete, 
  onEdit,
  isSelected 
}: QuotationCardProps) {
  const total = parseFloat(quotation.hotel.roomPrice) +
    parseFloat(quotation.services.price)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <span>Quotation #{quotation.id}</span>
          <div className="flex items-center space-x-2">
            <span className="font-bold">Total: ${total.toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(quotation.id)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(quotation.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Car: {quotation.car.type}</p>
          <p>Services: {quotation.services.type}</p>
          <div className="flex items-center justify-end space-x-2 mt-4">
            <label className="text-sm text-muted-foreground">Same car service</label>
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSameCarChange(quotation.id, checked as boolean)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 