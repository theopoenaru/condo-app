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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Amenity } from '@/types/management';

const formSchema = z.object({
  requirePayment: z.enum(['yes', 'no']),
  damageDeposit: z.object({
    required: z.enum(['yes', 'no']),
    amount: z.string().optional(),
  }),
  cleaningFee: z.object({
    required: z.enum(['yes', 'no']),
    amount: z.string().optional(),
  }),
  cancellationPenalty: z.object({
    enabled: z.enum(['yes', 'no']),
    amount: z.string().optional(),
  }),
  cancellationPolicy: z.object({
    time: z.coerce.number().min(0),
    unit: z.enum(['minutes', 'hours', 'days']),
  }),
});

interface BillingTabProps {
  defaultValues?: Amenity;
  onSaveData: (data: Partial<Amenity>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BillingTab({ 
  defaultValues, 
  onSaveData, 
  onNext,
  onBack,
}: BillingTabProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirePayment: 'no',
      damageDeposit: {
        required: 'no',
        amount: '',
      },
      cleaningFee: {
        required: 'no',
        amount: '',
      },
      cancellationPenalty: {
        enabled: 'no',
        amount: '',
      },
      cancellationPolicy: {
        time: 24,
        unit: 'hours',
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSaveData({
      billing: values,
    });
    onNext();
  };

  const watchDamageDeposit = form.watch('damageDeposit.required');
  const watchCleaningFee = form.watch('cleaningFee.required');
  const watchCancellationPenalty = form.watch('cancellationPenalty.enabled');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="requirePayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Residents are Required to Pay
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enable payment requirement for bookings</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="payment-yes" />
                          <label htmlFor="payment-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="payment-no" />
                          <label htmlFor="payment-no">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="damageDeposit.required"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Damage Deposit Required</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="deposit-yes" />
                            <label htmlFor="deposit-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="deposit-no" />
                            <label htmlFor="deposit-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchDamageDeposit === 'yes' && (
                  <FormField
                    control={form.control}
                    name="damageDeposit.amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deposit Amount ($)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cleaningFee.required"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cleaning Fee Required</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="cleaning-yes" />
                            <label htmlFor="cleaning-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="cleaning-no" />
                            <label htmlFor="cleaning-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchCleaningFee === 'yes' && (
                  <FormField
                    control={form.control}
                    name="cleaningFee.amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cleaning Fee Amount ($)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cancellationPenalty.enabled"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Late Cancellation Penalty</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="penalty-yes" />
                            <label htmlFor="penalty-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="penalty-no" />
                            <label htmlFor="penalty-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchCancellationPenalty === 'yes' && (
                  <FormField
                    control={form.control}
                    name="cancellationPenalty.amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penalty Amount ($)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cancellationPolicy.time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cancellation Policy</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cancellationPolicy.unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>&nbsp;</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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