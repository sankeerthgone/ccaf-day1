# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ccaf-day1** is a Python project using `uv` as the build system and package manager. It's a simple CLI application with minimal dependencies, currently in early development stages.

- **Build system**: `uv` (not pip/poetry)
- **Python version**: 3.14+
- **Package structure**: `src/ccaf_day1/` (src-layout)
- **CLI entry point**: `ccaf-day1` command (defined in `pyproject.toml`)

## Development Commands

### Initial Setup
```bash
# Install dependencies and set up the project
uv sync

# or update existing installation
uv sync --upgrade
```

### Running the Application
```bash
# Run the CLI entry point
uv run ccaf-day1

# Run a specific Python file
uv run python hello_claude.py

# Run with additional arguments
uv run ccaf-day1 [args]
```

### Python REPL
```bash
# Start Python interpreter with project dependencies loaded
uv run python
```

### Adding Dependencies
```bash
# Add a new package
uv add requests

# Add a dev dependency
uv add --dev pytest
```

## Architecture

The project follows a simple structure:

- **`src/ccaf_day1/`**: Main Python package
  - `__init__.py`: Exports the `main()` function for the CLI entry point
- **Root-level demo files**: `hello_claude.py`, `hello_pip.py`, `hello-npm.js` — example scripts exploring different package managers and HTTP requests
- **`pyproject.toml`**: Project metadata and configuration (defines CLI entry point, dependencies, build backend)
- **`.python-version`**: Specifies Python 3.14 for tool compatibility

### Current State
The `ccaf_day1` module exports a simple `main()` function that prints "Hello from ccaf-day1!". The `hello_claude.py` example demonstrates a more complex use case (fetching URLs and parsing HTML with `requests` and `re`).

## Key Notes

- The project is configured to use `uv_build` as its build backend, which is part of the `uv` ecosystem
- The main module has no production dependencies declared yet, though example files use `requests`
- The description in `pyproject.toml` is a placeholder and should be updated as the project evolves
- All commands should use `uv run` to ensure dependencies are available in the correct environment
