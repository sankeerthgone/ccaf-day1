# app_streamlit.py
#
# Optional browser UI that runs the same three prompt versions from
# prompt_examples.py side by side, so you can visually compare their output
# for any ticket text you type in.

import streamlit as st
# `streamlit` builds the interactive web UI (text areas, buttons, code blocks)
# using pure Python — no HTML/CSS/JS needed.

from setup import client, MODEL
# Same shared Anthropic client and model as the other scripts.

SYSTEM_PROMPT_V1 = "Summarize the ticket."
# Loose prompt — see prompt_examples.py for the full explanation of each version.

SYSTEM_PROMPT_V2 = """
You are a support triage assistant.
Summarize the ticket in one line as: issue + urgency.
Do not include any preamble or extra text.
"""
# Role + one-line requirement + "no preamble" constraint.

SYSTEM_PROMPT_V3 = """
You are a support triage assistant.
Use exactly this format when you respond:

issue - [issue text]; urgency - [urgency text]

Rules:
- Output must be a single line.
- Do not include any explanation, preamble, or extra sentences.
- Replace [issue text] and [urgency text] with the appropriate content.
"""
# Role + primed exact output template — the most constrained version.


def call_claude(system_prompt: str, ticket_content: str) -> str:
    response = client.messages.create(
        model=MODEL,
        # Same call shape as prompt_examples.py: model, token limit, system
        # prompt, and a single user message containing the ticket text.
        max_tokens=150,
        system=system_prompt,
        messages=[{"role": "user", "content": ticket_content}],
    )
    return response.content[0].text
    # Extracts the plain text from the first response block, same as before.


st.title("Prompt Lever Demo – Support Ticket Summaries")
# Renders the page's main heading at the top of the browser tab.

ticket_input = st.text_area(
    "Enter a support ticket:",
    "My monitor is not working since morning. My work is halted. Please fix it urgently."
)
# Creates a multi-line text box pre-filled with a sample ticket. Whatever the
# user types is stored in `ticket_input` on every rerun of the script.

if st.button("Run All Prompt Versions"):
    # Streamlit reruns this whole script top-to-bottom on every interaction;
    # this `if` block only executes the API calls when the button is clicked.
    with st.spinner("Calling Claude..."):
        # Shows a loading spinner in the UI while the three blocking API
        # calls below are in progress.
        v1 = call_claude(SYSTEM_PROMPT_V1, ticket_input)
        v2 = call_claude(SYSTEM_PROMPT_V2, ticket_input)
        v3 = call_claude(SYSTEM_PROMPT_V3, ticket_input)

    st.subheader("Version 1 – Loose Prompt")
    st.code(v1)
    # `st.code` renders the text in a monospace, copyable code block so
    # formatting differences between versions are easy to see.

    st.subheader("Version 2 – Role + One-line + No Preamble")
    st.code(v2)

    st.subheader("Version 3 – Primed Format (issue - ...; urgency - ...)")
    st.code(v3)
