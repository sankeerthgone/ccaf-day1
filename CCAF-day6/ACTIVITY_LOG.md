# CCAF-day6 — Activity Log

Record of everything implemented in this folder, for future reference.

## Date: 2026-08-15

## Objective

Reproduce the "Prompt Lever" demo from the CCAF prompt-engineering session:
a small project that calls Anthropic's Claude API with three progressively
stricter system prompts and compares the results, to show how prompt
structure affects output consistency.

## Files created

- **`.gitignore`** — ignores `.env`, `.venv/`, `__pycache__/`, `*.pyc` so
  secrets and local environment files never get committed.
- **`.env`** — template with `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL`
  placeholders. Must be filled in with a real API key before running anything.
- **`requirements.txt`** — lists the three Python dependencies needed:
  `anthropic`, `python-dotenv`, `streamlit`.
- **`setup.py`** — central config module. Loads `.env` via `python-dotenv`,
  validates that `ANTHROPIC_API_KEY` exists (raises `ValueError` if missing),
  and creates one shared `Anthropic` client plus a `MODEL` constant that
  every other script imports.
- **`prompt_examples.py`** — defines three system prompts:
  - `SYSTEM_PROMPT_V1`: bare instruction, no structure.
  - `SYSTEM_PROMPT_V2`: adds a role, a one-line output requirement, and a
    "no preamble" constraint.
  - `SYSTEM_PROMPT_V3`: adds an explicit output template
    (`issue - [...]; urgency - [...]`) that Claude fills in verbatim.
  Also defines `call_claude()` (wraps `client.messages.create(...)` and
  extracts `.text` from the first response block) and `demo_all_versions()`
  (runs all three versions against one sample ticket and prints the results).
  Runs automatically via `if __name__ == "__main__":` when executed directly.
- **`app_streamlit.py`** — optional browser UI (Streamlit) that duplicates the
  three prompt versions and `call_claude()` logic, but lets the user type a
  custom ticket into a text area and click a button to run all three versions,
  displaying each result in its own code block.
- **`README.md`** — setup and run instructions, file-purpose table, and a
  summary of what each prompt version demonstrates.

## Key concepts implemented

1. **Centralized client/config pattern** (`setup.py`) — avoids repeating
   API-key loading and client creation in every script.
2. **System prompt escalation** — same task (ticket summarization), three
   prompts of increasing structure/specificity, to demonstrate that priming
   Claude with an explicit output format produces the most consistent result.
3. **Secrets hygiene** — `.env` for credentials, `.gitignore` to keep it out
   of version control.
4. **Two ways to run the demo** — CLI script for quick terminal output, and
   a Streamlit app for an interactive browser-based comparison.

## Verification performed

- Reviewed each file's content for correctness against the requested
  specification (folder structure, file contents, dependencies).
- No live API calls were made as part of file creation (requires a real
  `ANTHROPIC_API_KEY` in `.env`, which the user must supply).

## Not yet implemented (documented as "next step" only)

- Structured JSON output version (`{"issue": "...", "urgency": "..."}`) and
  the corresponding `json.loads(...)` parsing change. Left as future work
  per the original instructions.
