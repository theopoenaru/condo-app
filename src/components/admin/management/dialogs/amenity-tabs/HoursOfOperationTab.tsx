import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Amenity } from '@/types/management';

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return {
    value: `${hour.toString().padStart(2, '0')}:${minute}`,
    label: `${displayHour}:${minute} ${period}`,
  };
});

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

const formSchema = z.object({
  operatingHours: z.object(
    Object.fromEntries(
      daysOfWeek.map(day => [
        day,
        z.object({
          enabled: z.boolean(),
          start: z.string(),
          end: z.string(),
        }),
      ])
    )
  ),
  holidayHours: z.object({
    useSpecialHours: z.boolean(),
    start: z.string(),
    end: z.string(),
  }),
});

interface HoursOfOperationTabProps {
  defaultValues?: Amenity;
  onSaveData: (data: Partial<Amenity>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function HoursOfOperationTab({
  defaultValues,
  onSaveData,
  onNext,
  onBack,
}: HoursOfOperationTabProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operatingHours: Object.fromEntries(
        daysOfWeek.map(day => [
          day,
          {
            enabled: true,
            start: '09:00',
            end: '22:00',
          },
        ])
      ),
      holidayHours: {
        useSpecialHours: false,
        start: '10:00',
        end: '20:00',
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSaveData({
      hours: values,
    });
    onNext();
  };

  const formatDayLabel = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <div className="w-[100px]">Day</div>
                  <div className="w-[100px]">Open</div>
                  <div className="w-[120px]">Start Time</div>
                  <div className="w-[120px]">End Time</div>
                </div>

                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center justify-between space-x-4">
                    <div className="w-[100px] text-sm font-medium">
                      {formatDayLabel(day)}
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`operatingHours.${day}.enabled`}
                      render={({ field }) => (
                        <FormItem className="w-[100px]">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`operatingHours.${day}.start`}
                      render={({ field }) => (
                        <FormItem className="w-[120px]">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!form.watch(`operatingHours.${day}.enabled`)}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Start time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`operatingHours.${day}.end`}
                      render={({ field }) => (
                        <FormItem className="w-[120px]">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!form.watch(`operatingHours.${day}.enabled`)}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="End time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <FormLabel className="flex items-center gap-2">
                    Holiday Hours
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Special operating hours for holidays</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>

                  <FormField
                    control={form.control}
                    name="holidayHours.useSpecialHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch('holidayHours.useSpecialHours') && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="holidayHours.start"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Start time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="holidayHours.end"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="End time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}