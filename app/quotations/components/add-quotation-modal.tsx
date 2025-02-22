import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"

const formSchema = z.object({
  hotel: z.object({
    roomPrice: z.string(),
    commission: z.string(),
  }),
  car: z.object({
    type: z.string(),
    pickupLocation: z.string(),
    dropLocation: z.string(),
    commission: z.string(),
  }),
  services: z.object({
    type: z.string(),
    price: z.string(),
    commission: z.string(),
  }),
  extraNotes: z.string(),
})

interface AddQuotationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  editingQuotation?: z.infer<typeof formSchema> & { id: string }
}

export function AddQuotationModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingQuotation 
}: AddQuotationModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotel: { roomPrice: "", commission: "" },
      car: { type: "", pickupLocation: "", dropLocation: "", commission: "" },
      services: { type: "", price: "", commission: "" },
      extraNotes: "",
    },
  })

  // Reset form with editing data when available
  useEffect(() => {
    if (editingQuotation) {
      form.reset({
        hotel: {
          roomPrice: editingQuotation.hotel.roomPrice,
          commission: editingQuotation.hotel.commission,
        },
        car: {
          type: editingQuotation.car.type,
          pickupLocation: editingQuotation.car.pickupLocation,
          dropLocation: editingQuotation.car.dropLocation,
          commission: editingQuotation.car.commission,
        },
        services: {
          type: editingQuotation.services.type,
          price: editingQuotation.services.price,
          commission: editingQuotation.services.commission,
        },
        extraNotes: editingQuotation.extraNotes,
      })
    } else {
      form.reset({
        hotel: { roomPrice: "", commission: "" },
        car: { type: "", pickupLocation: "", dropLocation: "", commission: "" },
        services: { type: "", price: "", commission: "" },
        extraNotes: "",
      })
    }
  }, [editingQuotation, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingQuotation ? 'Edit Quotation' : 'Add New Quotation'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Hotel Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Hotel Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hotel.roomPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hotel.commission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Car Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Car Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="car.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="car.commission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="car.pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="car.dropLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drop Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Services Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Services Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="services.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="services.price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="services.commission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Extra Notes */}
            <div className="space-y-4">
              <h3 className="font-semibold">Extra Notes</h3>
              <FormField
                control={form.control}
                name="extraNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">{editingQuotation ? 'Update' : 'Add'} Quotation</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 