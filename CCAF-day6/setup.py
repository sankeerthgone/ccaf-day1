# setup.py
#
# Central configuration module for the whole project.
# Every other script imports `client` and `MODEL` from here instead of
# re-reading the .env file or re-creating the Anthropic client itself.

import os
# `os` gives access to environment variables via os.getenv() after dotenv loads them.

from dotenv import load_dotenv
# `load_dotenv` reads the key=value pairs from a local .env file and injects
# them into the process environment (os.environ) so os.getenv() can see them.

from anthropic import Anthropic
# `Anthropic` is the official SDK client class used to call Claude's API.

# Load environment variables from .env
load_dotenv()
# Executes immediately on import: finds the .env file in the current working
# directory (or parent directories) and loads its variables into os.environ.

# Read API key & model from environment
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
# Reads the ANTHROPIC_API_KEY variable. Returns None if it isn't set anywhere.

DEFAULT_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-3-5-sonnet-20240620")
# Reads ANTHROPIC_MODEL; the second argument is the fallback value used only
# if the environment variable is missing, so the app still has a sane default.

if not ANTHROPIC_API_KEY:
    raise ValueError("ANTHROPIC_API_KEY is not set in .env")
# Fail fast: if there is no API key at all, stop immediately with a clear
# error instead of letting every later API call fail with a confusing message.

# Initialize Anthropic client (SDK)
client = Anthropic(api_key=ANTHROPIC_API_KEY)
# Creates one shared client instance, authenticated with our key. This object
# is what actually sends HTTP requests to Anthropic's API.

# Convenient access to model name
MODEL = DEFAULT_MODEL
# Re-exported under a shorter name so other files can just do:
#   from setup import client, MODEL
