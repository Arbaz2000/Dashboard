import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";

interface NewLeadFormProps {
  onAddLead: (lead: {
    name: string;
    source: string;
    dateCreated: string;
  }) => void;
}

export function NewLeadForm({ onAddLead }: NewLeadFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setName("");
    setSource("");
    setIsSubmitting(false);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsOpen(false);
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(() => {
    if (isSubmitting) return; // Prevent multiple submissions

    if (name.trim() && source) {
      setIsSubmitting(true);

      // Create the new lead
      onAddLead({
        name: name.trim(),
        source,
        dateCreated: new Date().toLocaleString(),
      });

      // Close dialog and reset form
      handleDialogClose();
    }
  }, [name, source, isSubmitting, onAddLead, handleDialogClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Lead</Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={handleKeyDown}
        onInteractOutside={handleDialogClose}
      >
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Lead Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            onKeyDown={handleKeyDown}
          />
          <Select
            value={source}
            onValueChange={setSource}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="external">External</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !source || isSubmitting}
          >
            Create Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
