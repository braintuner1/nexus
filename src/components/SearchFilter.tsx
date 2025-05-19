
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps<T> {
  placeholder?: string;
  data: T[];
  filterOptions?: {
    field: keyof T;
    options: FilterOption[];
  }[];
  onFilterChange: (filteredData: T[]) => void;
  searchFields: (keyof T)[];
}

function SearchFilter<T>({
  placeholder = 'Search...',
  data,
  filterOptions = [],
  onFilterChange,
  searchFields,
}: SearchFilterProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    // Filter data based on search term and filters
    const filteredData = data.filter((item) => {
      // Check search term
      if (searchTerm) {
        const searchMatch = searchFields.some((field) => {
          const value = String(item[field] || '').toLowerCase();
          return value.includes(searchTerm.toLowerCase());
        });

        if (!searchMatch) return false;
      }

      // Check filters
      for (const [key, value] of Object.entries(filters)) {
        if (value && String(item[key as keyof T]).toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      }

      return true;
    });

    onFilterChange(filteredData);
  }, [searchTerm, filters, data, searchFields, onFilterChange]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value || '',
    }));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filterOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <div key={String(option.field)} className="w-40">
              <Select
                onValueChange={(value) => handleFilterChange(String(option.field), value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Filter by ${String(option.field)}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {option.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
