import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { DJCard } from "@/components/DJCard";
import { Plus } from "lucide-react";

const Index = () => {
  // Sample data - in a real app, this would come from a backend
  const events = [
    { title: "Summer Night Party", date: "2024-06-15", time: "22:00", dj: "DJ Max" },
    { title: "Retro Classics", date: "2024-06-16", time: "21:00", dj: "DJ Sarah" },
    { title: "Electronic Dreams", date: "2024-06-17", time: "23:00" },
  ];

  const djs = [
    { name: "DJ Max", genre: "House, Techno", available: false },
    { name: "DJ Sarah", genre: "Hip-Hop, R&B", available: false },
    { name: "DJ Alex", genre: "EDM, Pop", available: true },
  ];

  return (
    <div className="min-h-screen bg-venue-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-venue-text">Venue Dashboard</h1>
          <Button className="bg-venue-accent hover:bg-venue-accent/90">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
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
            <h2 className="text-xl font-semibold text-venue-text mb-4">DJ Roster</h2>
            <div className="space-y-4">
              {djs.map((dj, index) => (
                <DJCard key={index} {...dj} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;