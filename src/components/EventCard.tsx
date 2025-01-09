import { CalendarDays, Clock, Music, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns/format";

export type VenueSection = "Miami Gold" | "Grewv Lounge" | "BudFathers" | "Sons Cues";

interface EventCardProps {
  id: string;
  title: string;
  date: Date;
  time: string;
  section: VenueSection;
  djs: string[];
  onEdit: (id: string) => void; // Callback to handle event edit
}

export const EventCard = ({ id, title, date, time, section, djs = [], onEdit }: EventCardProps) => {
  return (
    <Card className="bg-venue-card p-6 hover:shadow-lg transition-all duration-300 border-none" onClick={() => onEdit(id)}>
      <h3 className="text-venue-text text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex items-center text-venue-muted">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>{format(date, 'PPP')}</span>
        </div>
        <div className="flex items-center text-venue-muted">
          <Clock className="w-4 h-4 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-venue-accent">
          <Users className="w-4 h-4 mr-2" />
          <span>{section}</span>
        </div>
        <div className="mt-4">
          <h4 className="text-venue-text font-medium mb-2 flex items-center">
            <Music className="w-4 h-4 mr-2" />
            DJs ({djs.length}/8)
          </h4>
          <div className="space-y-1">
            {djs.length > 0 ? (
              djs.map((dj, index) => (
                <div key={index} className="text-sm text-venue-muted">
                  {index + 1}. {dj}
                </div>
              ))
            ) : (
              <div className="text-sm text-venue-muted italic">No DJs assigned</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
