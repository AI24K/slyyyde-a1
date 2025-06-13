"use client";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Code, Key, Zap, ExternalLink } from "lucide-react";

export function ComposioUsageGuide() {
  return (
    <div className="space-y-6">
      <Alert>
        <BookOpen className="size-4" />
        <AlertTitle>Composio Documentation Access</AlertTitle>
        <AlertDescription className="mt-2">
          Once Composio MCP is configured, you can prompt the AI to:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              "Read the Composio documentation from
              https://docs.composio.dev/getting-started/welcome"
            </li>
            <li>"Help me set up a GitHub integration using Composio"</li>
            <li>"Show me how to send emails through Gmail with Composio"</li>
            <li>"Connect to Slack using Composio and send a message"</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="size-5" />
              API Key Setup
            </CardTitle>
            <CardDescription>Get your Composio API key</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <p className="text-sm">
                1. Visit{" "}
                <a
                  href="https://app.composio.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  app.composio.dev
                </a>
              </p>
              <p className="text-sm">2. Sign up or log in to your account</p>
              <p className="text-sm">3. Navigate to API Keys section</p>
              <p className="text-sm">4. Generate a new API key</p>
              <p className="text-sm">5. Copy the key (starts with "comp_")</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5" />
              Quick Usage
            </CardTitle>
            <CardDescription>How to use with your LLM</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <p className="text-sm">1. Configure the Composio MCP server</p>
              <p className="text-sm">
                2. Add your API key to the configuration
              </p>
              <p className="text-sm">3. Save and activate the server</p>
              <p className="text-sm">
                4. Ask the AI to access any of 250+ integrations
              </p>
              <p className="text-sm">
                5. The AI will read documentation and execute actions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5" />
            Example Prompts
          </CardTitle>
          <CardDescription>
            Try these prompts after setting up Composio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-muted p-3 rounded-lg">
              <Badge variant="outline" className="mb-2">
                Gmail Integration
              </Badge>
              <p className="text-sm font-mono">
                "Use Composio to read my latest Gmail messages and summarize
                them"
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <Badge variant="outline" className="mb-2">
                GitHub Integration
              </Badge>
              <p className="text-sm font-mono">
                "Connect to my GitHub repository using Composio and create a new
                issue"
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <Badge variant="outline" className="mb-2">
                Documentation Access
              </Badge>
              <p className="text-sm font-mono">
                "Read the Composio documentation from https://docs.composio.dev
                and help me understand how to set up Slack integration"
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <Badge variant="outline" className="mb-2">
                Multiple Services
              </Badge>
              <p className="text-sm font-mono">
                "Use Composio to get my calendar events from Google Calendar and
                create a summary in a new Notion page"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <ExternalLink className="size-4" />
        <AlertTitle>Additional Resources</AlertTitle>
        <AlertDescription className="mt-2">
          <div className="space-y-1">
            <p>
              •{" "}
              <a
                href="https://docs.composio.dev/resources/model-context-protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Composio MCP Documentation
              </a>
            </p>
            <p>
              •{" "}
              <a
                href="https://docs.composio.dev/introduction/foundations/components/integrations/supported-apps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                All 250+ Supported Integrations
              </a>
            </p>
            <p>
              •{" "}
              <a
                href="https://docs.composio.dev/getting-started/welcome"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Getting Started Guide
              </a>
            </p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
