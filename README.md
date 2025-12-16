# mesterx

A tiny Python command-line tool that prints friendly greeting messages with
optional inspirational add-ons.

## Installation

The project uses only the Python standard library. Activate your virtual
environment of choice and install the optional development dependencies to run
tests:

```bash
pip install -r requirements-dev.txt
```

## Usage

Run the CLI with the name you want to greet. Use ``--inspiration`` to append an
extra nudge of encouragement, or ``--no-excited`` to avoid the default
exclamation point.

```bash
python -m mesterx.cli Ada
python -m mesterx.cli Ada --inspiration
python -m mesterx.cli Ada --no-excited --punctuation "?"
```

## Development

Run the automated tests with ``pytest``:

```bash
python -m pytest
```
