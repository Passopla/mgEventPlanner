import { Button } from "@/components/ui/button";
import { DJCard } from "@/components/DJCard";
import { Plus, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { EventDialog } from "@/components/EventDialog";
import { EventsList } from "@/components/EventsList";
import { VenueSection } from "@/components/EventCard";

const Index = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([
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
  ]);

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

  const handleCreateEvent = (eventData: any) => {
    setEvents(prev => [...prev, eventData]);
    toast({
      title: "Event Created",
      description: "The event has been successfully added to the calendar.",
    });
  };

  return (
    <div className="min-h-screen bg-venue-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-venue-text">Venue Dashboard</h1>
          <Button 
            className="bg-venue-accent hover:bg-venue-accent/90"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <EventsList events={events} />
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

        <EventDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onEventCreate={handleCreateEvent}
          djs={djs}
        />
      </div>
    </div>
  );
};

export default Index;