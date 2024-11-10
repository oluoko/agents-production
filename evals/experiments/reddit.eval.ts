import { runLLM } from "../../src/llm";
import { reddit, redditToolDefinition } from "../../src/tools/reddit";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";

const createToolCallMessage = (toolName: string) => ({
  role: "assistant",
  tool_calls: [
    {
      type: "function",
      function: {
        name: toolName,
      },
    },
  ],
});

runEval("reddit", {
  task: (input) =>
    runLLM({
      messages: [{ role: "user", content: input }],
      tools: [redditToolDefinition],
    }),
  data: [
    {
      input: "Find me something interesting on Reddit",
      expected: createToolCallMessage(redditToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
});
