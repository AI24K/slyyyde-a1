import { MCPServerConfig } from "app-types/mcp";

export interface MCPPreset {
  name: string;
  displayName: string;
  description: string;
  documentation?: string;
  config: MCPServerConfig;
  requiresApiKey?: boolean;
  apiKeyPlaceholder?: string;
  setupInstructions?: string[];
}

export const MCP_PRESETS: MCPPreset[] = [
  {
    name: "composio",
    displayName: "Composio MCP Server",
    description:
      "Connect to 250+ apps and services including Gmail, GitHub, Slack, Linear, and more through Composio's unified API interface.",
    documentation: "https://docs.composio.dev/resources/model-context-protocol",
    config: {
      command: "npx",
      args: ["composio-core@latest", "mcp"],
      env: {
        COMPOSIO_API_KEY: "comp_*********",
      },
    },
    requiresApiKey: true,
    apiKeyPlaceholder: "comp_*********",
    setupInstructions: [
      "Sign up at https://app.composio.dev to get your API key",
      "Replace 'comp_*********' with your actual Composio API key",
      "The server will provide access to 250+ integrations including Gmail, GitHub, Slack, Linear, and more",
      "Supports OAuth, API keys, JWT and other authentication methods",
    ],
  },
  {
    name: "composio-sse",
    displayName: "Composio MCP Server (SSE)",
    description:
      "Server-Sent Events version of Composio MCP for web-based clients like Cursor.",
    documentation: "https://docs.composio.dev/resources/model-context-protocol",
    config: {
      url: "https://backend.composio.dev/api/v1/mcp/sse",
      headers: {
        "X-API-Key": "comp_*********",
      },
    },
    requiresApiKey: true,
    apiKeyPlaceholder: "comp_*********",
    setupInstructions: [
      "Sign up at https://app.composio.dev to get your API key",
      "Replace 'comp_*********' with your actual Composio API key",
      "This SSE version is ideal for web-based integrations",
      "Provides real-time communication for all 250+ supported apps",
    ],
  },
  {
    name: "github-mcp",
    displayName: "GitHub MCP Server",
    description:
      "Official GitHub MCP server for repository management and GitHub API access.",
    documentation:
      "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_*********",
      },
    },
    requiresApiKey: true,
    apiKeyPlaceholder: "ghp_*********",
    setupInstructions: [
      "Create a GitHub Personal Access Token at https://github.com/settings/tokens",
      "Replace 'ghp_*********' with your GitHub token",
      "Provides access to repositories, issues, pull requests, and more",
    ],
  },
  {
    name: "filesystem-mcp",
    displayName: "Filesystem MCP Server",
    description:
      "Official filesystem MCP server for file and directory operations.",
    documentation:
      "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    config: {
      command: "npx",
      args: [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory",
      ],
    },
    setupInstructions: [
      "Replace '/path/to/allowed/directory' with the directory you want to give access to",
      "The server will only have access to the specified directory and its subdirectories",
      "Provides file reading, writing, and directory listing capabilities",
    ],
  },
  {
    name: "brave-search",
    displayName: "Brave Search MCP Server",
    description: "Search the web using Brave Search API.",
    documentation:
      "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-brave-search"],
      env: {
        BRAVE_API_KEY: "BSA*********",
      },
    },
    requiresApiKey: true,
    apiKeyPlaceholder: "BSA*********",
    setupInstructions: [
      "Get a Brave Search API key at https://api.search.brave.com/",
      "Replace 'BSA*********' with your Brave Search API key",
      "Provides web search capabilities with Brave's independent search index",
    ],
  },
  {
    name: "slack-mcp",
    displayName: "Slack MCP Server",
    description:
      "Connect to Slack workspaces for reading and sending messages.",
    documentation:
      "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-slack"],
      env: {
        SLACK_BOT_TOKEN: "xoxb-*********",
        SLACK_TEAM_ID: "T*********",
      },
    },
    requiresApiKey: true,
    apiKeyPlaceholder: "xoxb-*********",
    setupInstructions: [
      "Create a Slack app at https://api.slack.com/apps",
      "Add Bot Token Scopes: channels:read, chat:write, users:read",
      "Install the app to your workspace",
      "Replace 'xoxb-*********' with your Bot User OAuth Token",
      "Replace 'T*********' with your Slack Team ID",
    ],
  },
];

export function getMCPPresetByName(name: string): MCPPreset | undefined {
  return MCP_PRESETS.find((preset) => preset.name === name);
}

export function getMCPPresetsForDisplay() {
  return MCP_PRESETS.map((preset) => ({
    value: preset.name,
    label: preset.displayName,
    description: preset.description,
  }));
}
