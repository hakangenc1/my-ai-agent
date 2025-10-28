"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon, Loader2, AlertCircle, CalendarIcon } from "lucide-react";
import { useMeetingsFilters } from "../../hooks/use-meeting-filters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export const MeetingSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const debouncedSearch = useDebounce(searchInput, 400);

  const trpc = useTRPC();

  // Fetch meetings based on search input
  const { data, isLoading, isError } = useQuery(
    trpc.meetings.getMany.queryOptions({
      pageSize: 3,
      search: debouncedSearch,
    })
  );

  // Sync search input with filter
  useEffect(() => {
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilters({ search: value });
    setOpen(true);
  };

  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleSelectMeeting = (meetingName: string) => {
    setSearchInput(meetingName);
    setFilters({ search: meetingName });
    setOpen(false);
  };

  const meetings = data?.items ?? [];
  const showDropdown = open && (isLoading || isError || meetings.length > 0 || searchInput.length > 0);

  return (
    <Popover open={showDropdown} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Input
            placeholder="Filter by name"
            className="h-9 bg-white w-[200px] pl-7"
            value={searchInput}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </PopoverTrigger>
        <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
      </div>

      <PopoverContent
        className="w-[200px] p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin mr-2" />
            Loading...
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-6 text-sm text-destructive">
            <AlertCircle className="size-4 mr-2" />
            Error loading meetings
          </div>
        ) : meetings.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
            {searchInput ? "No meetings found" : "No recent meetings"}
          </div>
        ) : (
          <div className="py-1">
            {!searchInput && (
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Recent meetings
              </div>
            )}
            {meetings.map((meeting) => (
              <button
                key={meeting.id}
                onClick={() => handleSelectMeeting(meeting.name)}
                className={cn(
                  "w-full flex items-center gap-x-2 px-2 py-1.5 text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  "cursor-pointer transition-colors"
                )}
              >
                <CalendarIcon className="size-4 flex-shrink-0 text-muted-foreground" />
                <span className="truncate">{meeting.name}</span>
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
