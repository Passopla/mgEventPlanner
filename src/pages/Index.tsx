import { Button } from "@/components/ui/button";
import { DJCard } from "@/components/DJCard";
import { Plus, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { EventDialog } from "@/components/EventDialog";
import { EventsList } from "@/components/EventsList";
import { VenueSection } from "@/components/EventCard";
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

const Index = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const supabase = useSupabaseClient();
  const session = useSession();

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

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar',
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully logged in with Google!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  const handleCreateEvent = async (eventData: any) => {
    if (!session) {
      toast({
        title: "Login Required",
        description: "Please login with Google to create events in your calendar.",
        variant: "destructive",
      });
      return;
    }

    try {
      setEvents(prev => [...prev, eventData]);
      
      // Add event to Google Calendar
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: eventData.title,
          start: {
            dateTime: new Date(eventData.date).toISOString(),
          },
          end: {
            dateTime: new Date(new Date(eventData.date).getTime() + 3600000).toISOString(),
          },
          description: `Venue Section: ${eventData.section}\nDJs: ${eventData.djs.join(', ')}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to create Google Calendar event');

      toast({
        title: "Event Created",
        description: "The event has been added to your calendar.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event in Google Calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-venue-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-venue-text">Venue Dashboard</h1>
          <div className="flex gap-4">
            {!session && (
              <Button 
                variant="outline"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            )}
            <Button 
              className="bg-venue-accent hover:bg-venue-accent/90"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
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
