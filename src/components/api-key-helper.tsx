"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Key, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

interface ApiKeyHelperProps {
  service: string;
  placeholder: string;
  signupUrl?: string;
  onApiKeyChange: (apiKey: string) => void;
  instructions?: string[];
}

export function ApiKeyHelper({
  service,
  placeholder,
  signupUrl,
  onApiKeyChange,
  instructions,
}: ApiKeyHelperProps) {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    onApiKeyChange(value);
  };

  return (
    <Alert>
      <Key className="size-4" />
      <AlertTitle className="flex items-center gap-2">
        {service} API Key Required
        <Badge variant="secondary" className="text-xs">
          Required
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-3">
        <div className="space-y-4">
          {instructions && (
            <div className="text-sm">
              <p className="font-medium mb-2">Setup instructions:</p>
              <ol className="list-decimal list-inside space-y-1">
                {instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-key">API Key</Label>
              {signupUrl && (
                <a
                  href={signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Get API Key
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder={placeholder}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {apiKey && (
              <p className="text-xs text-green-600">
                ✓ API key will be automatically inserted into the configuration
              </p>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
