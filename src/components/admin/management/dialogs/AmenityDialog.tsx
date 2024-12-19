import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoTab } from './amenity-tabs/BasicInfoTab';
import { BookingDurationTab } from './amenity-tabs/BookingDurationTab';
import { BookingLimitsTab } from './amenity-tabs/BookingLimitsTab';
import { HoursOfOperationTab } from './amenity-tabs/HoursOfOperationTab';
import { BillingTab } from './amenity-tabs/BillingTab';
import { SecurityTab } from './amenity-tabs/SecurityTab';
import type { Amenity } from '@/types/management';

const tabs = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'hours', label: 'Hours' },
  { id: 'duration', label: 'Booking Duration' },
  { id: 'limits', label: 'Booking Limits' },
  { id: 'billing', label: 'Billing' },
  { id: 'security', label: 'Security' },
] as const;

interface AmenityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amenity?: Amenity;
  onSave: (amenity: Amenity) => void;
}

export function AmenityDialog({ 
  open, 
  onOpenChange, 
  amenity,
  onSave,
}: AmenityDialogProps) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('basic');
  const [formData, setFormData] = useState<Partial<Amenity>>({});

  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSave = () => {
    onSave({
      ...formData,
      id: amenity?.id || String(Date.now()),
      createdAt: amenity?.createdAt || new Date(),
      updatedAt: new Date(),
    } as Amenity);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {amenity ? 'Edit Amenity' : 'Add New Amenity'}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-4">
            <TabsContent value="basic">
              <BasicInfoTab
                defaultValues={amenity}
                onSaveData={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onNext={handleNext}
              />
            </TabsContent>
            <TabsContent value="hours">
              <HoursOfOperationTab
                defaultValues={amenity}
                onSaveData={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>
            <TabsContent value="duration">
              <BookingDurationTab
                defaultValues={amenity}
                onSaveData={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>
            <TabsContent value="limits">
              <BookingLimitsTab
                defaultValues={amenity}
                onSaveData={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>
            <TabsContent value="billing">
              <BillingTab
                defaultValues={amenity}
                onSaveData={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>
            <TabsContent value="security">
              <SecurityTab
                defaultValues={amenity}
                onSaveData={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onBack={handleBack}
                onSave={handleSave}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}