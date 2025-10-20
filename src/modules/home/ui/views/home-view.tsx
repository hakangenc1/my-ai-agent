"use client";
import Link from 'next/link';

import { HomeHeader } from "../components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";


export const HomeView = () => {
  const trpc = useTRPC();
  const { data, isLoading, error } = useQuery(
    trpc.agents.getMany.queryOptions({ page: 1, pageSize: 6 })
  );
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HomeHeader />
      <main
        className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:px-8 md:py-12 lg:py-20 gap-8 w-full"
      >        
        <section className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              Your AI Agents
            </h2>
            <Link
              href="/agents"
              className="text-primary hover:underline text-sm sm:text-base"
            >
              View all
            </Link>
          </div>
          {isLoading && (
            <LoadingState title="Loading agents" description="Please wait while we fetch your agents." />
          )}
          {error && (
            <ErrorState
              title="Error loading agents"
              description={
                error instanceof Error ? error.message : "Failed to load agents."
              }
            />
          )}
          {!isLoading && !error && (
            <>
              {(data?.items?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {data?.items.map((agent) => (
                    <Link key={agent.id} href={`/agents/${agent.id}`} className="group">
                      <Card className="h-full transition-colors group-hover:border-primary">
                        <CardHeader>
                          <CardTitle className="text-lg sm:text-xl">
                            {agent.name}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {agent.instructions.length > 120
                              ? `${agent.instructions.slice(0, 120)}...`
                              : agent.instructions}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground text-base sm:text-lg">
                  No AI agent created.
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};
