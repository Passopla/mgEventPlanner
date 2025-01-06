import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { VenueSection } from "./EventCard";
import { useToast } from "@/hooks/use-toast";

interface DJ {
  name: string;
  genre: string;
  available: boolean;
}

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreate: (eventData: any) => void;
  djs: DJ[];
}

export const EventDialog = ({ open, onOpenChange, onEventCreate, djs }: EventDialogProps) => {
  const { toast } = useToast();
  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedSection, setSelectedSection] = useState<string>();
  const [selectedDJs, setSelectedDJs] = useState<string[]>([]);

  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = (i + 12) % 24;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  });

  const handleDJSelection = (djName: string) => {
    setSelectedDJs(prev => {
      if (prev.includes(djName)) {
        return prev.filter(dj => dj !== djName);
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

  const handleCreateEvent = () => {
    if (!eventName || !selectedDate || !selectedTime || !selectedSection) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onEventCreate({
      title: eventName,
      date: selectedDate,
      time: selectedTime,
      section: selectedSection as VenueSection,
      djs: selectedDJs,
    });

    // Reset form
    setEventName("");
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSelectedSection(undefined);
    setSelectedDJs([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
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
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
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
                <SelectItem value="Budfathers">Budfathers</SelectItem>
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
          <Button 
            className="w-full mt-6" 
            onClick={handleCreateEvent}
          >
            Create Event
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};