import { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/ui/enhanced-data-table';
import { columns } from './tables/amenities-columns';
import { AmenityDialog } from './dialogs/AmenityDialog';
import { useAmenities } from '@/hooks/useAmenities';
import type { FilterField } from '@/types/table';
import type { Amenity } from '@/types/management';
import { useToast } from '@/hooks/use-toast';

const filterFields: FilterField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Available', value: 'available' },
      { label: 'Maintenance', value: 'maintenance' },
      { label: 'Reserved', value: 'reserved' },
    ],
  },
  {
    id: 'capacity',
    label: 'Capacity',
    type: 'number',
  },
];

export function AmenitiesManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const { amenities, isLoading, updateAmenity, deleteAmenity, addAmenity } = useAmenities();
  const { toast } = useToast();

  const handleEdit = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setShowAddDialog(true);
  };

  const handleDelete = (amenity: Amenity) => {
    deleteAmenity(amenity.id);
    toast({
      title: "Amenity deleted",
      description: `${amenity.name} has been deleted successfully.`,
    });
  };

  const handleSave = useCallback((amenity: Amenity) => {
    if (selectedAmenity) {
      updateAmenity(amenity);
    } else {
      addAmenity(amenity);
    }
    toast({
      title: selectedAmenity ? "Amenity updated" : "Amenity created",
      description: `${amenity.name} has been ${selectedAmenity ? 'updated' : 'created'} successfully.`,
    });
    setShowAddDialog(false);
    setSelectedAmenity(null);
  }, [updateAmenity, selectedAmenity, toast]);

  const handleDialogClose = useCallback(() => {
    setShowAddDialog(false);
    setSelectedAmenity(null);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Amenities</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Amenity
        </Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={amenities}
        isLoading={isLoading}
        filterFields={filterFields}
        enableFilters
        enableColumnDragging
        enableExport
        meta={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      <AmenityDialog
        open={showAddDialog}
        onOpenChange={handleDialogClose}
        amenity={selectedAmenity}
        onSave={handleSave}
      />
    </div>
  );
}