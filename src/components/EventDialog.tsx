import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useMemo } from "react";
import { VenueSection } from "./EventCard";
import { useToast } from "@/hooks/use-toast";
import { DatePickerComponent } from "./DatePickerComponent";

interface DJ {
  name: string;
  genre: string;
  available: boolean;
}

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventSave: (eventData: EventData) => void;
  djs: DJ[];
  selectedEvent?: EventData; // For editing an existing event
}

export interface EventData {
  identifier?: string;
  title: string;
  date: Date;
  time: string;
  section: VenueSection;
  djs: string[];
}

const VENUE_SECTIONS = {
  MIAMI_GOLD: "Miami Gold",
  GREWV_LOUNGE: "Grewv Lounge",
  BUDFATHERS: "BudFathers",
  SONS_CUES: "Sons Cues"
} as const;

export const EventDialog = ({
  open,
  onOpenChange,
  onEventSave,
  djs,
  selectedEvent,
}: EventDialogProps) => {
  const { toast } = useToast();

  const [eventName, setEventName] = useState(selectedEvent?.title || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selectedEvent?.date || undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(selectedEvent?.time || "");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(selectedEvent?.section || "");
  const [selectedDJs, setSelectedDJs] = useState<string[]>(selectedEvent?.djs || []);

  useEffect(() => {
    if (selectedEvent) {
      setEventName(selectedEvent.title);
      setSelectedDate(selectedEvent.date);
      setSelectedTime(selectedEvent.time);
      setSelectedSection(selectedEvent.section);
      setSelectedDJs(selectedEvent.djs);
    }
  }, [selectedEvent]);

  const timeSlots = useMemo(() => Array.from({ length: 19 }, (_, i) => {
    const hour = (i + 12) % 24;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  }), []);

  const handleDJSelection = (djName: string) => {
    setSelectedDJs((prev) => {
      if (prev.includes(djName)) {
        return prev.filter((dj) => dj !== djName);
      }
      if (prev.length >= 8) {
        toast({
          title: "Maximum DJs reached",
          description: "You cannot add more than 8 DJs to an event.",
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, djName];
    });
  };

  const handleSaveEvent = () => {
    if (!eventName || !selectedDate || !selectedTime || !selectedSection) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (selectedDate < new Date()) {
      toast({
        title: "Invalid date",
        description: "Event date cannot be in the past",
        variant: "destructive"
      });
      return;
    }

    const updatedEvent = {
      identifier: `GLE- ${eventName}`,
      title: eventName,
      date: selectedDate,
      time: selectedTime,
      section: selectedSection as VenueSection,
      djs: selectedDJs,
    };

    onEventSave(updatedEvent); // Save event (either update or create)
    onOpenChange(false); // Close dialog after saving
  };
  
  useEffect(() => {
    if (!open) {
      setEventName("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedSection("");
      setSelectedDJs([]);
    }
  }, [open]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>Fill in the event details below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Event Name</label>
            <Input
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <DatePickerComponent
            selectedDate={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Time</label>
            <Select onValueChange={setSelectedTime} value={selectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Venue Section</label>
            <Select onValueChange={setSelectedSection} value={selectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Miami Gold">Miami Gold</SelectItem>
                <SelectItem value="Grewv Lounge">Grewv Lounge</SelectItem>
                <SelectItem value="BudFathers">BudFathers</SelectItem>
                <SelectItem value="Sons Cues">Sons Cues</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Select DJs ({selectedDJs.length}/8)</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select DJs" />
              </SelectTrigger>
              <SelectContent>
                {djs.map((dj) => (
                  <SelectItem
                    key={dj.name}
                    value={dj.name}
                    className={selectedDJs.includes(dj.name) ? "bg-primary/10" : ""}
                    onClick={() => handleDJSelection(dj.name)}
                  >
                    {dj.name} - {dj.genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDJs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDJs.map((dj) => (
                  <div key={dj} className="bg-primary/10 px-2 py-1 rounded-md text-sm">
                    {dj}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button className="w-full mt-6" onClick={handleSaveEvent}>
            {selectedEvent ? "Save Changes" : "Create Event"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


