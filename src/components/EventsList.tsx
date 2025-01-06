import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard, VenueSection } from "./EventCard";

interface Event {
  title: string;
  date: Date;
  time: string;
  section: VenueSection;
  djs: string[];
}

interface EventsListProps {
  events: Event[];
}

export const EventsList = ({ events }: EventsListProps) => {
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  const pastEvents = events.filter(event => new Date(event.date) < now);

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        <TabsTrigger value="past">Past Events</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="past">
        <div className="space-y-4">
          {pastEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};