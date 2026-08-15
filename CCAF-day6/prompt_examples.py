# prompt_examples.py
#
# Demonstrates three progressively stricter system prompts sent to Claude
# for the same task (summarizing a support ticket), so you can compare how
# prompt structure changes the quality and consistency of the output.

from setup import client, MODEL
# Reuses the single shared Anthropic client and model name created in setup.py
# instead of duplicating that setup logic here.

# Version 1: Very loose prompt
SYSTEM_PROMPT_V1 = "Summarize the ticket."
# No role, no format, no constraints. Claude has to guess what "summarize"
# means here, so the output shape and length will vary each time.

# Version 2: Role + one-line requirement + constraint
SYSTEM_PROMPT_V2 = """
You are a support triage assistant.
Summarize the ticket in one line as: issue + urgency.
Do not include any preamble or extra text.
"""
# Adds a role ("support triage assistant"), a goal ("one line: issue + urgency"),
# and a constraint ("no preamble"). This narrows the output but doesn't lock
# down the exact wording/format Claude must use.

# Version 3: Role + explicit output shape (priming)
SYSTEM_PROMPT_V3 = """
You are a support triage assistant.
Use exactly this format when you respond:

issue - [issue text]; urgency - [urgency text]

Rules:
- Output must be a single line.
- Do not include any explanation, preamble, or extra sentences.
- Replace [issue text] and [urgency text] with the appropriate content.
"""
# "Primes" Claude with the literal template it must fill in. This is the
# most reliable version because the model is shown the exact target shape
# instead of being asked to infer one from a description.


def call_claude(system_prompt: str, ticket_content: str) -> str:
    """
    Send a single-turn request to Claude using the given system prompt and ticket content.
    Returns the text of the first content block.
    """
    response = client.messages.create(
        # `model` selects which Claude model handles the request (from setup.py).
        model=MODEL,
        # `max_tokens` caps the length of Claude's reply; 150 is plenty for a
        # one-line summary and keeps the call fast/cheap.
        max_tokens=150,  # enough for our short summary
        # `system` is the instruction that shapes *how* Claude behaves/responds,
        # separate from the actual user message.
        system=system_prompt,
        # `messages` is the conversation history sent to the model; here it's
        # a single user turn containing the raw ticket text.
        messages=[
            {
                "role": "user",
                "content": ticket_content
            }
        ]
    )

    # response.content is an array of "blocks"; we want the first text block
    first_block = response.content[0]
    # Claude's replies are returned as a list of content blocks (it can mix
    # text, tool calls, etc.). For a plain text answer, index 0 is that text.

    # For simple calls, this will be a TextBlock with .text
    return first_block.text
    # `.text` extracts the actual string content from that block so callers
    # get a plain Python string back instead of an SDK object.


def demo_all_versions(ticket_content: str):
    print("=== INPUT TICKET ===")
    print(ticket_content)
    print()
    # Shows the raw input so the console output is self-explanatory when
    # comparing the three versions below it.

    print("=== VERSION 1 (Loose prompt) ===")
    print(call_claude(SYSTEM_PROMPT_V1, ticket_content))
    print()

    print("=== VERSION 2 (Role + one-line + no preamble) ===")
    print(call_claude(SYSTEM_PROMPT_V2, ticket_content))
    print()

    print("=== VERSION 3 (Primed format) ===")
    print(call_claude(SYSTEM_PROMPT_V3, ticket_content))
    print()
    # Each call reuses the same `call_claude` helper but swaps in a different
    # system prompt, isolating the prompt as the only variable being tested.


if __name__ == "__main__":
    # This guard means the demo only runs when the file is executed directly
    # (e.g. `python prompt_examples.py`), not when it's imported elsewhere.

    # Example ticket text from the session
    ticket = (
        "My monitor is not working since morning. "
        "My work is completely halted. Please get this fixed as soon as possible."
    )
    demo_all_versions(ticket)
