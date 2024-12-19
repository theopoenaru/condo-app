import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, 
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Amenity } from '@/types/management';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  description: z.string().optional(),
  status: z.enum(['available', 'maintenance', 'reserved']),
  rules: z.string().optional(),
  photos: z.array(z.any()).optional(),
});

interface BasicInfoTabProps {
  defaultValues?: Amenity;
  onSaveData: (data: Partial<Amenity>) => void;
  onNext: () => void;
}

export function BasicInfoTab({ defaultValues, onSaveData, onNext }: BasicInfoTabProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? {
      name: defaultValues.name,
      location: defaultValues.location,
      capacity: defaultValues.capacity,
      description: defaultValues.description || '',
      status: defaultValues.status,
      rules: defaultValues.rules || '',
    } : {
      name: '',
      location: '',
      capacity: 0,
      description: '',
      status: 'available',
      rules: '',
      photos: [],
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
    const currentPhotos = form.getValues('photos') || [];
    form.setValue('photos', [...currentPhotos, ...files]);
  };

  const removePhoto = (index: number) => {
    const currentPhotos = form.getValues('photos') || [];
    const newPhotos = currentPhotos.filter((_, i) => i !== index);
    form.setValue('photos', newPhotos);
    
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSaveData(values);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter amenity name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter capacity" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter description"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules & Policies</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter rules and policies"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photos</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={url}
                          alt={`Amenity photo ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <label className="relative aspect-video rounded-lg overflow-hidden bg-muted hover:bg-muted/80 cursor-pointer flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <ImagePlus className="h-8 w-8" />
                        <span className="text-xs">Add Photo</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                  <FormDescription>
                    Upload photos of the amenity. Recommended size: 1920x1080px
                  </FormDescription>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}