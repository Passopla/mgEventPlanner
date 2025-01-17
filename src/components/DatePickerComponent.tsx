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
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              console.log("Date selected in DatePicker:", date);
              if (date) {
                // Ensure we're working with a Date object
                const newDate = new Date(date);
                onDateChange(newDate);
              }
            }}
            initialFocus
            fromDate={new Date()}
            className="rounded-md border shadow-md"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            fixedWeeks
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};