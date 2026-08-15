# Prompt Lever Demo — Support Ticket Triage

Small project demonstrating how the **structure of a system prompt** changes
Claude's output for the same task: summarizing a support ticket.

## What's in this folder

| File | Purpose |
|---|---|
| `.env` | Your Anthropic API key and model name (never committed). |
| `.gitignore` | Keeps `.env`, `.venv/`, and Python cache files out of git. |
| `requirements.txt` | Python dependencies: `anthropic`, `python-dotenv`, `streamlit`. |
| `setup.py` | Loads `.env`, creates the shared `Anthropic` client, exposes `client` and `MODEL`. |
| `prompt_examples.py` | Defines 3 system prompt versions and runs all of them against a sample ticket from the terminal. |
| `app_streamlit.py` | Same 3 prompt versions, but in a browser UI where you can type your own ticket text. |

## Setup

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

Edit `.env` and put your real key in place of `your_real_api_key_here`.

## Run

Terminal demo (prints all 3 versions for one hardcoded ticket):

```bash
python prompt_examples.py
```

Browser demo (type your own ticket, compare all 3 versions live):

```bash
streamlit run app_streamlit.py
```

Then open the printed URL, usually `http://localhost:8501`.

## The three prompt versions

1. **V1 — Loose prompt**: `"Summarize the ticket."` No role, no format, no
   constraints. Output shape/length varies run to run.
2. **V2 — Role + one-line + constraint**: Adds a role and a "one line:
   issue + urgency" requirement, plus "no preamble". More focused, still
   not exactly consistent in wording.
3. **V3 — Primed format**: Gives Claude the literal template to fill in
   (`issue - [...]; urgency - [...]`). Most consistent and parseable output.

## Next step (not implemented here)

Move from the free-text `issue - ...; urgency - ...` format to structured
JSON (`{"issue": "...", "urgency": "..."}`) by:
- Updating the system prompt to ask for JSON with keys `issue` and `urgency`.
- Parsing the response with `json.loads(response.content[0].text)`.

Everything else (`setup.py`, project structure) stays the same.
