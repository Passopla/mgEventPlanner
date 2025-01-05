import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DJCardProps {
  name: string;
  genre: string;
  available: boolean;
}

export const DJCard = ({ name, genre, available }: DJCardProps) => {
  return (
    <Card className="bg-venue-card p-6 hover:shadow-lg transition-all duration-300 border-none">
      <div className="flex items-center space-x-4">
        <div className="bg-venue-accent rounded-full p-3">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-venue-text text-lg font-semibold">{name}</h3>
          <p className="text-venue-muted text-sm">{genre}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className={`px-2 py-1 rounded-full text-sm ${available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {available ? 'Available' : 'Booked'}
        </span>
      </div>
    </Card>
  );
};