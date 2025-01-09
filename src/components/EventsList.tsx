import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard, VenueSection } from "./EventCard";
import { EventDialog } from "./EventDialog";

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  section: VenueSection;
  djs: string[];
}

interface EventsListProps {
  events: Event[];
  djs: { name: string; genre: string; available: boolean }[]; // Add DJs prop
}

export const EventsList = ({ events, djs }: EventsListProps) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const handleEditEvent = (id: string) => {
    setSelectedEventId(id);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = (updatedEvent: any) => {
    if (selectedEventId) {
      // Update the existing event
      const updatedEvents = events.map((event) =>
        event.id === selectedEventId ? { ...event, ...updatedEvent } : event
      );
      // Update the events state (or pass the updated events to the parent)
      setSelectedEventId(null);
      setIsDialogOpen(false);
    } else {
      // Add new event
      const newEvent = { ...updatedEvent, id: String(events.length + 1) };
      // Update events state with the new event
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="space-y-4">
            {events
              .filter((event) => new Date(event.date) >= new Date())
              .map((event) => (
                <EventCard key={event.id} {...event} onEdit={handleEditEvent} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="space-y-4">
            {events
              .filter((event) => new Date(event.date) < new Date())
              .map((event) => (
                <EventCard key={event.id} {...event} onEdit={handleEditEvent} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <EventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onEventSave={handleSaveEvent}
        djs={djs}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};
