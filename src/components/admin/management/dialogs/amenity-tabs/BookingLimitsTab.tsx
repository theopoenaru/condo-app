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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Amenity } from '@/types/management';

const formSchema = z.object({
  simultaneousLimit: z.string(),
  accessLevel: z.enum(['all', 'residents', 'owners']),
  minAdvanceBooking: z.coerce.number().min(0),
  advanceBookingDuration: z.enum(['days', 'months']),
  advanceBookingLimit: z.coerce.number().min(1),
  dailyLimit: z.string(),
  weeklyLimit: z.string(),
  monthlyLimit: z.string(),
  consecutiveBookings: z.string(),
});

interface BookingLimitsTabProps {
  defaultValues?: Amenity;
  onSaveData: (data: Partial<Amenity>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BookingLimitsTab({ 
  defaultValues, 
  onSaveData, 
  onNext,
  onBack,
}: BookingLimitsTabProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      simultaneousLimit: '1',
      accessLevel: 'residents',
      minAdvanceBooking: 0,
      advanceBookingDuration: 'days',
      advanceBookingLimit: 30,
      dailyLimit: '1',
      weeklyLimit: '3',
      monthlyLimit: '10',
      consecutiveBookings: '2',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSaveData({
      bookingLimits: values,
    });
    onNext();
  };

  const simultaneousLimit = form.watch('simultaneousLimit');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="simultaneousLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Simultaneous Reservations
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Number of simultaneous bookings allowed per user</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select limit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Not Allowed</SelectItem>
                          <SelectItem value="1">1 Booking</SelectItem>
                          <SelectItem value="2">2 Bookings</SelectItem>
                          <SelectItem value="3">3 Bookings</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who can book this Amenity?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select access level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="residents">Residents Only</SelectItem>
                          <SelectItem value="owners">Property Owners Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="minAdvanceBooking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Advanced Booking</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        min="0"
                        placeholder="Enter minimum days in advance"
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum number of days required before booking
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="advanceBookingDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advanced Booking Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="advanceBookingLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advanced Booking Limit</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          min="1"
                          placeholder="Enter limit number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {simultaneousLimit !== '0' && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Booking Limit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                            <SelectItem value="1">1 Booking</SelectItem>
                            <SelectItem value="2">2 Bookings</SelectItem>
                            <SelectItem value="3">3 Bookings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weeklyLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekly Booking Limit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                            <SelectItem value="3">3 Bookings</SelectItem>
                            <SelectItem value="5">5 Bookings</SelectItem>
                            <SelectItem value="7">7 Bookings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {simultaneousLimit !== '0' && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="monthlyLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Booking Limit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                            <SelectItem value="10">10 Bookings</SelectItem>
                            <SelectItem value="15">15 Bookings</SelectItem>
                            <SelectItem value="20">20 Bookings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consecutiveBookings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consecutive Bookings</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                            <SelectItem value="2">2 Bookings</SelectItem>
                            <SelectItem value="3">3 Bookings</SelectItem>
                            <SelectItem value="4">4 Bookings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
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