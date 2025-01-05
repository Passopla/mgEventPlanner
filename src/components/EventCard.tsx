import { CalendarDays, Clock, Music } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  dj?: string;
}

export const EventCard = ({ title, date, time, dj }: EventCardProps) => {
  return (
    <Card className="bg-venue-card p-6 hover:shadow-lg transition-all duration-300 border-none">
      <h3 className="text-venue-text text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex items-center text-venue-muted">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-venue-muted">
          <Clock className="w-4 h-4 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-venue-accent">
          <Music className="w-4 h-4 mr-2" />
          <span>{dj || "No DJ Assigned"}</span>
        </div>
      </div>
    </Card>
  );
};