"use client";

import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ExternalLink,
  Globe,
  Mail,
  MessageCircle,
  Code,
  Database,
  Calendar,
  FileText,
  Users,
  Briefcase,
} from "lucide-react";

export const POPULAR_COMPOSIO_INTEGRATIONS = [
  {
    name: "Gmail",
    icon: Mail,
    description: "Send, read, and manage emails",
    category: "Communication",
  },
  {
    name: "GitHub",
    icon: Code,
    description: "Manage repositories, issues, and pull requests",
    category: "Development",
  },
  {
    name: "Slack",
    icon: MessageCircle,
    description: "Send messages and manage channels",
    category: "Communication",
  },
  {
    name: "Linear",
    icon: Briefcase,
    description: "Track issues and manage projects",
    category: "Project Management",
  },
  {
    name: "Google Calendar",
    icon: Calendar,
    description: "Schedule and manage events",
    category: "Productivity",
  },
  {
    name: "Notion",
    icon: FileText,
    description: "Create and manage documents",
    category: "Productivity",
  },
  {
    name: "HubSpot",
    icon: Users,
    description: "Manage CRM and customer data",
    category: "CRM",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    description: "Query and manage databases",
    category: "Database",
  },
];

export function ComposioIntegrationsShowcase() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="size-5" />
          Composio Integrations
        </CardTitle>
        <CardDescription>
          Popular apps and services available through Composio MCP server (250+
          total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {POPULAR_COMPOSIO_INTEGRATIONS.map((integration) => (
            <div
              key={integration.name}
              className="flex items-center gap-2 p-2 border rounded-lg"
            >
              <integration.icon className="size-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{integration.name}</div>
                <div className="text-xs text-muted-foreground">
                  {integration.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>+ 240 more integrations available</span>
          <a
            href="https://docs.composio.dev/introduction/foundations/components/integrations/supported-apps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            View all integrations
            <ExternalLink className="size-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
