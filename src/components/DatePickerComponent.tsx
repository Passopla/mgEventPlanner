import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const DatePickerComponent = ({ selectedDate, onDateChange }: DatePickerProps) => {
  return (
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
            onSelect={onDateChange}
            initialFocus
            fromDate={new Date()}
            className="rounded-md border shadow-md"
            disabled={(date) => date < new Date()}
            fixedWeeks
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};