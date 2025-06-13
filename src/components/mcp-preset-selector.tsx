"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Key, FileText, Lightbulb } from "lucide-react";
import { MCP_PRESETS, MCPPreset } from "@/lib/mcp-presets";
import { MCPServerConfig } from "app-types/mcp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface MCPPresetSelectorProps {
  onSelectPreset: (name: string, config: MCPServerConfig) => void;
}

export function MCPPresetSelector({ onSelectPreset }: MCPPresetSelectorProps) {
  const [selectedPreset, setSelectedPreset] = useState<MCPPreset | null>(null);

  const handleUsePreset = () => {
    if (selectedPreset) {
      onSelectPreset(selectedPreset.name, selectedPreset.config);
      setSelectedPreset(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Quick Start with Presets</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose from popular MCP servers to get started quickly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MCP_PRESETS.map((preset) => (
          <Card
            key={preset.name}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => setSelectedPreset(preset)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {preset.displayName}
                </CardTitle>
                <div className="flex gap-1">
                  {preset.requiresApiKey && (
                    <Badge variant="secondary" className="text-xs">
                      <Key className="size-3 mr-1" />
                      API Key
                    </Badge>
                  )}
                  {preset.documentation && (
                    <Badge variant="outline" className="text-xs">
                      <FileText className="size-3 mr-1" />
                      Docs
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription className="text-sm">
                {preset.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Preset Details Dialog */}
      <Dialog
        open={!!selectedPreset}
        onOpenChange={() => setSelectedPreset(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedPreset?.displayName}
              {selectedPreset?.requiresApiKey && (
                <Badge variant="secondary" className="text-xs">
                  <Key className="size-3 mr-1" />
                  Requires API Key
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>{selectedPreset?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedPreset?.setupInstructions && (
              <Alert>
                <Lightbulb className="size-4" />
                <AlertTitle>Setup Instructions</AlertTitle>
                <AlertDescription className="mt-2">
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {selectedPreset.setupInstructions.map(
                      (instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ),
                    )}
                  </ol>
                </AlertDescription>
              </Alert>
            )}

            {selectedPreset?.documentation && (
              <div className="flex items-center gap-2">
                <FileText className="size-4" />
                <a
                  href={selectedPreset.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View Documentation
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}

            <div className="bg-muted rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">
                Configuration Preview:
              </h4>
              <pre className="text-xs bg-background rounded p-2 overflow-auto">
                {JSON.stringify(selectedPreset?.config, null, 2)}
              </pre>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setSelectedPreset(null)}>
                Cancel
              </Button>
              <Button onClick={handleUsePreset}>Use This Preset</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
