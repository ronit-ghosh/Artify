"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, BrainCircuit, MessageSquare, Wallet } from "lucide-react";

interface TrainingSession {
  id: string;
  title: string;
  timeAgo: string;
  status: "Completed" | "In Progress" | "Failed";
}

const trainingSessions: TrainingSession[] = [
  { id: "1", title: "Training Session #1", timeAgo: "2 hours ago", status: "Completed" },
  { id: "2", title: "Training Session #2", timeAgo: "2 hours ago", status: "Completed" },
  { id: "3", title: "Training Session #3", timeAgo: "2 hours ago", status: "Completed" },
];

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <Card className="p-6 space-y-2 bg-card">
    <div className="flex items-center space-x-2 text-muted-foreground">
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </div>
    <div className="text-3xl font-bold text-card-foreground">{value}</div>
  </Card>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Images Generated" value="1,234" icon={ImageIcon} />
        <StatCard title="Models" value="12" icon={BrainCircuit} />
        <StatCard title="Prompts" value="456" icon={MessageSquare} />
        <StatCard title="Balance" value="$789" icon={Wallet} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-4">Training History</h2>
            <div className="space-y-4">
              {trainingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted"
                >
                  <div>
                    <h3 className="font-medium text-foreground">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.timeAgo}</p>
                  </div>
                  <span className="text-primary">{session.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-4">Save prompt for later</h2>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your prompt here..."
                className=" bg-muted border-input resize-none"
              />
              <Button className="w-full">
                Save Prompt
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-8 p-6 bg-card border-border">
        <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted flex items-center justify-center"
            >
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}