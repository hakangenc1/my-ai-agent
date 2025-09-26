import React from "react";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center py-12 px-4 gap-8">
      <Card className="max-w-xl w-full text-center mb-4 p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to My AI Agent</h1>
        <p className="text-lg text-muted-foreground">
          Create AI agents and talk to them in real-time meetings. Effortlessly manage, schedule, and interact with your custom AI assistants.
        </p>
      </Card>

      {/* Upcoming Meetings Placeholder */}
      <Card className="max-w-xl w-full mb-4 p-6 text-left">
        <h2 className="text-xl font-semibold mb-2">Upcoming Meetings</h2>
        <p className="text-muted-foreground">No upcoming meetings. Schedule one to get started!</p>
      </Card>

      {/* How It Works Section */}
      <Card className="max-w-xl w-full p-6 text-left">
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-1">
          <li>Create your own AI agent with custom settings.</li>
          <li>Schedule or join a real-time meeting.</li>
          <li>Interact with your AI agent and others live.</li>
        </ol>
      </Card>
    </main>
  );
}
