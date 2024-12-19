import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: { label: string; value: string }[];
}

interface Filter {
  field: string;
  operator: string;
  value: string;
}

interface AdvancedFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: FilterField[];
  onApplyFilters: (filters: Filter[]) => void;
}

const operators = {
  text: [
    { label: 'Contains', value: 'contains' },
    { label: 'Equals', value: 'equals' },
    { label: 'Starts with', value: 'startsWith' },
    { label: 'Ends with', value: 'endsWith' },
  ],
  number: [
    { label: 'Equals', value: 'equals' },
    { label: 'Greater than', value: 'gt' },
    { label: 'Less than', value: 'lt' },
    { label: 'Between', value: 'between' },
  ],
  date: [
    { label: 'Equals', value: 'equals' },
    { label: 'After', value: 'after' },
    { label: 'Before', value: 'before' },
    { label: 'Between', value: 'between' },
  ],
  select: [
    { label: 'Equals', value: 'equals' },
    { label: 'Not equals', value: 'notEquals' },
  ],
};

export function AdvancedFilterDialog({
  open,
  onOpenChange,
  fields,
  onApplyFilters,
}: AdvancedFilterDialogProps) {
  const [filters, setFilters] = useState<Filter[]>([{ field: '', operator: '', value: '' }]);

  const addFilter = () => {
    setFilters([...filters, { field: '', operator: '', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, key: keyof Filter, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [key]: value };
    setFilters(newFilters);
  };

  const handleApply = () => {
    const validFilters = filters.filter(f => f.field && f.operator && f.value);
    onApplyFilters(validFilters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Advanced Filter</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {filters.map((filter, index) => {
            const selectedField = fields.find(f => f.id === filter.field);
            const fieldType = selectedField?.type || 'text';

            return (
              <div key={index} className="flex items-start space-x-2">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  <Select
                    value={filter.field}
                    onValueChange={(value) => updateFilter(index, 'field', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => (
                        <SelectItem key={field.id} value={field.id}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filter.operator}
                    onValueChange={(value) => updateFilter(index, 'operator', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators[fieldType].map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedField?.type === 'select' ? (
                    <Select
                      value={filter.value}
                      onValueChange={(value) => updateFilter(index, 'value', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedField.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={fieldType}
                      value={filter.value}
                      onChange={(e) => updateFilter(index, 'value', e.target.value)}
                      placeholder="Enter value"
                    />
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFilter(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={addFilter}>
              Add Filter
            </Button>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleApply}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}