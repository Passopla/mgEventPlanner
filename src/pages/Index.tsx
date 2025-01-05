import { Button } from "@/components/ui/button";
import { EventCard, VenueSection } from "@/components/EventCard";
import { DJCard } from "@/components/DJCard";
import { Plus, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format } from "date-fns";

const Index = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [eventName, setEventName] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>();
  const [selectedDJs, setSelectedDJs] = useState<string[]>([]);
  
  // Generate time slots from 12 PM to 6 AM
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = (i + 12) % 24;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  });
  
  // Sample data - in a real app, this would come from a backend
  const events = [
    { 
      title: "Summer Night Party", 
      date: new Date('2024-06-15'), 
      time: "22:00", 
      section: "Miami Gold" as VenueSection,
      djs: ["DJ Max", "DJ Sarah", "DJ Alex"]
    },
    { 
      title: "Retro Classics", 
      date: new Date('2024-06-16'), 
      time: "21:00", 
      section: "Grewv Lounge" as VenueSection,
      djs: ["DJ Sarah"]
    },
    { 
      title: "Electronic Dreams", 
      date: new Date('2024-06-17'), 
      time: "23:00", 
      section: "Budfathers" as VenueSection,
      djs: []
    },
  ];

  const djs = [
    { name: "DJ Max", genre: "House, Techno", available: false },
    { name: "DJ Sarah", genre: "Hip-Hop, R&B", available: false },
    { name: "DJ Alex", genre: "EDM, Pop", available: true },
  ];

  const handleAddDJ = () => {
    if (djs.length >= 30) {
      toast({
        title: "Maximum DJ limit reached",
        description: "You cannot add more than 30 DJs to the roster.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Add DJ",
      description: "This would open a form to add a new DJ in a real application.",
    });
  };

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

  return (
    <div className="min-h-screen bg-venue-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-venue-text">Venue Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-venue-accent hover:bg-venue-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
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
                      <Button variant="outline">
                        {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select onValueChange={setSelectedTime}>
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
                  <Select onValueChange={setSelectedSection}>
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
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold text-venue-text mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-venue-text">DJ Roster</h2>
              <span className="text-sm text-venue-muted">
                {djs.length}/30 DJs
              </span>
            </div>
            <div className="space-y-4">
              {djs.map((dj, index) => (
                <DJCard key={index} {...dj} />
              ))}
              <Button 
                onClick={handleAddDJ} 
                variant="outline" 
                className="w-full mt-4"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add DJ
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;