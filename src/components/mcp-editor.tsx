"use client";
import { useState, useMemo } from "react";
import {
  MCPServerConfig,
  MCPSseConfigZodSchema,
  MCPStdioConfigZodSchema,
} from "app-types/mcp";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import JsonView from "./ui/json-view";
import { toast } from "sonner";
import { safe, watchOk } from "ts-safe";
import { useRouter } from "next/navigation";
import { createDebounce, isNull, safeJSONParse } from "lib/utils";
import { handleErrorWithToast } from "ui/shared-toast";
import { mutate } from "swr";
import { Loader } from "lucide-react";
import {
  isMaybeMCPServerConfig,
  isMaybeSseConfig,
} from "lib/ai/mcp/is-mcp-config";
import { updateMcpClientAction } from "@/app/api/mcp/actions";
import { insertMcpClientAction } from "@/app/api/mcp/actions";

import { Alert, AlertDescription, AlertTitle } from "ui/alert";
import { z } from "zod";
import { MCPPresetSelector } from "./mcp-preset-selector";
import { ApiKeyHelper } from "./api-key-helper";
import { Separator } from "./ui/separator";
import { getMCPPresetByName } from "@/lib/mcp-presets";

interface MCPEditorProps {
  initialConfig?: MCPServerConfig;
  name?: string;
}

const STDIO_ARGS_ENV_PLACEHOLDER = `/** STDIO Example */
{
  "command": "node",
  "args": ["index.js"],
  "env": {
    "OPENAI_API_KEY": "sk-...",
  }
}

/** SSE Example */
{
  "url": "https://api.example.com",
  "headers": {
    "Authorization": "Bearer sk-..."
  }
}`;

export default function MCPEditor({
  initialConfig,
  name: initialName,
}: MCPEditorProps) {
  const shouldInsert = useMemo(() => isNull(initialName), [initialName]);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [selectedPresetName, setSelectedPresetName] = useState<string | null>(
    null,
  );

  const errorDebounce = useMemo(() => createDebounce(), []);

  // State for form fields
  const [name, setName] = useState<string>(initialName ?? "");
  const router = useRouter();
  const [config, setConfig] = useState<MCPServerConfig>(
    initialConfig as MCPServerConfig,
  );
  const [jsonString, setJsonString] = useState<string>(
    initialConfig ? JSON.stringify(initialConfig, null, 2) : "",
  );

  // Name validation schema
  const nameSchema = z.string().regex(/^[a-zA-Z0-9\-]+$/, {
    message: "Name must contain only alphanumeric characters and hyphens",
  });

  const validateName = (nameValue: string): boolean => {
    const result = nameSchema.safeParse(nameValue);
    if (!result.success) {
      setNameError(
        "Name must contain only alphanumeric characters (A-Z, a-z, 0-9) and hyphens (-)",
      );
      return false;
    }
    setNameError(null);
    return true;
  };

  const saveDisabled = useMemo(() => {
    return (
      name.trim() === "" ||
      isLoading ||
      !!jsonError ||
      !!nameError ||
      !isMaybeMCPServerConfig(config)
    );
  }, [isLoading, jsonError, nameError, config, name]);

  // Validate
  const validateConfig = (jsonConfig: unknown): boolean => {
    const result = isMaybeSseConfig(jsonConfig)
      ? MCPSseConfigZodSchema.safeParse(jsonConfig)
      : MCPStdioConfigZodSchema.safeParse(jsonConfig);
    if (!result.success) {
      handleErrorWithToast(result.error, "mcp-editor-error");
    }
    return result.success;
  };

  // Handle save button click
  const handleSave = async () => {
    // Perform validation
    if (!validateConfig(config)) return;
    if (!name) {
      return handleErrorWithToast(
        new Error("Name is required"),
        "mcp-editor-error",
      );
    }

    if (!validateName(name)) {
      return handleErrorWithToast(
        new Error(
          "Name must contain only alphanumeric characters (A-Z, a-z, 0-9) and hyphens (-)",
        ),
        "mcp-editor-error",
      );
    }

    safe(() => setIsLoading(true))
      .map(() =>
        shouldInsert
          ? insertMcpClientAction(name, config)
          : updateMcpClientAction(name, config),
      )
      .watch(() => setIsLoading(false))
      .ifOk(() => toast.success("Configuration saved successfully"))
      .watch(watchOk(() => mutate("mcp-list")))
      .ifOk(() => router.push("/mcp"))
      .ifFail(handleErrorWithToast);
  };

  const handleConfigChange = (data: string) => {
    setJsonString(data);
    const result = safeJSONParse(data);
    errorDebounce.clear();
    if (result.success) {
      setConfig(result.value as MCPServerConfig);
      setJsonError(null);
    } else if (data.trim() !== "") {
      errorDebounce(() => {
        setJsonError(
          (result.error as Error)?.message ??
            JSON.stringify(result.error, null, 2),
        );
      }, 1000);
    }
  };

  const handlePresetSelect = (
    presetName: string,
    presetConfig: MCPServerConfig,
  ) => {
    setName(presetName);
    setConfig(presetConfig);
    setJsonString(JSON.stringify(presetConfig, null, 2));
    setJsonError(null);
    setNameError(null);
    setSelectedPresetName(presetName);
  };

  const handleApiKeyChange = (apiKey: string) => {
    if (!selectedPresetName) return;

    const preset = getMCPPresetByName(selectedPresetName);
    if (!preset || !preset.requiresApiKey) return;

    // Update the config with the new API key
    let updatedConfig = { ...config };

    if (selectedPresetName === "composio") {
      updatedConfig = {
        ...updatedConfig,
        env: {
          ...updatedConfig.env,
          COMPOSIO_API_KEY: apiKey,
        },
      };
    } else if (selectedPresetName === "composio-sse") {
      updatedConfig = {
        ...updatedConfig,
        headers: {
          ...updatedConfig.headers,
          "X-API-Key": apiKey,
        },
      };
    } else if (selectedPresetName === "github-mcp") {
      updatedConfig = {
        ...updatedConfig,
        env: {
          ...updatedConfig.env,
          GITHUB_PERSONAL_ACCESS_TOKEN: apiKey,
        },
      };
    } else if (selectedPresetName === "brave-search") {
      updatedConfig = {
        ...updatedConfig,
        env: {
          ...updatedConfig.env,
          BRAVE_API_KEY: apiKey,
        },
      };
    } else if (selectedPresetName === "slack-mcp") {
      updatedConfig = {
        ...updatedConfig,
        env: {
          ...updatedConfig.env,
          SLACK_BOT_TOKEN: apiKey,
        },
      };
    }

    setConfig(updatedConfig);
    setJsonString(JSON.stringify(updatedConfig, null, 2));
  };

  const selectedPreset = selectedPresetName
    ? getMCPPresetByName(selectedPresetName)
    : null;

  return (
    <div className="flex flex-col space-y-6">
      {/* Preset Selector - only show when creating new */}
      {shouldInsert && (
        <>
          <MCPPresetSelector onSelectPreset={handlePresetSelect} />
          <Separator />
        </>
      )}

      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          value={name}
          disabled={!shouldInsert}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value) validateName(e.target.value);
          }}
          placeholder="Enter mcp server name"
          className={nameError ? "border-destructive" : ""}
        />
        {nameError && <p className="text-xs text-destructive">{nameError}</p>}
      </div>

      {/* API Key Helper */}
      {selectedPreset && selectedPreset.requiresApiKey && (
        <ApiKeyHelper
          service={selectedPreset.displayName}
          placeholder={selectedPreset.apiKeyPlaceholder || "Enter API key..."}
          signupUrl={
            selectedPreset.name === "composio"
              ? "https://app.composio.dev"
              : selectedPreset.name === "github-mcp"
                ? "https://github.com/settings/tokens"
                : selectedPreset.name === "brave-search"
                  ? "https://api.search.brave.com/"
                  : selectedPreset.name === "slack-mcp"
                    ? "https://api.slack.com/apps"
                    : undefined
          }
          onApiKeyChange={handleApiKeyChange}
          instructions={selectedPreset.setupInstructions}
        />
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="config">Config</Label>
        </div>

        {/* Split view for config editor */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left side: Textarea for editing */}
          <div className="space-y-2">
            <Textarea
              id="config-editor"
              value={jsonString}
              onChange={(e) => handleConfigChange(e.target.value)}
              className="font-mono h-[40vh] resize-none overflow-y-auto"
              placeholder={STDIO_ARGS_ENV_PLACEHOLDER}
            />
          </div>

          {/* Right side: JSON view */}
          <div className="space-y-2">
            <div className="border border-input rounded-md p-4 h-[40vh] overflow-auto relative">
              <Label
                htmlFor="config-view"
                className="text-xs text-muted-foreground mb-2"
              >
                preview
              </Label>
              <JsonView data={config} initialExpandDepth={3} />
              {jsonError && jsonString && (
                <div className="absolute w-full bottom-0 right-0 px-2 pb-2 animate-in fade-in-0 duration-300">
                  <Alert variant="destructive" className="border-destructive">
                    <AlertTitle className="text-xs font-semibold">
                      Parsing Error
                    </AlertTitle>
                    <AlertDescription className="text-xs">
                      {jsonError}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <Button onClick={handleSave} className="w-full" disabled={saveDisabled}>
        {isLoading ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <span className="font-bold">Save Configuration</span>
        )}
      </Button>
    </div>
  );
}
