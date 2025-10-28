"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon, Loader2, AlertCircle } from "lucide-react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { cn } from "@/lib/utils";

export const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const debouncedSearch = useDebounce(searchInput, 400);

  const trpc = useTRPC();

  // Fetch agents based on search input
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions({
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

  const handleSelectAgent = (agentName: string) => {
    setSearchInput(agentName);
    setFilters({ search: agentName });
    setOpen(false);
  };

  const agents = data?.items ?? [];
  const showDropdown = open && (isLoading || isError || agents.length > 0 || searchInput.length > 0);

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
            Error loading agents
          </div>
        ) : agents.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
            {searchInput ? "No agents found" : "No recent agents"}
          </div>
        ) : (
          <div className="py-1">
            {!searchInput && (
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Recent agents
              </div>
            )}
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleSelectAgent(agent.name)}
                className={cn(
                  "w-full flex items-center gap-x-2 px-2 py-1.5 text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  "cursor-pointer transition-colors"
                )}
              >
                <GeneratedAvatar
                  seed={agent.name}
                  variant="botttsNeutral"
                  className="size-4 flex-shrink-0"
                />
                <span className="truncate">{agent.name}</span>
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
