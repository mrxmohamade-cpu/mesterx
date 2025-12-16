"""Command-line tool for producing short greeting messages.

Examples
--------
>>> build_message(GreetingOptions(name="Ada"))
'Hello, Ada!'
>>> build_message(GreetingOptions(name="Ada", inspiration=True), rng=random.Random(1))
'Hello, Ada! Keep exploring new ideas.'
"""
from __future__ import annotations

import argparse
import random
from dataclasses import dataclass
from typing import Iterable, Sequence

DEFAULT_MESSAGES: Sequence[str] = (
    "Keep exploring new ideas.",
    "Your curiosity fuels progress.",
    "Small steps lead to big results.",
    "Consistency beats intensity.",
)


@dataclass
class GreetingOptions:
    """Configuration used to assemble a greeting."""

    name: str
    inspiration: bool = False
    excited: bool = True
    punctuation: str = "!"


def build_message(options: GreetingOptions, *, rng: random.Random | None = None) -> str:
    """Return a greeting for the configured options.

    Parameters
    ----------
    options:
        The ``GreetingOptions`` instance describing how to build the message.
    rng:
        Optional random number generator used when selecting inspirational
        messages. If omitted, :mod:`random` is used.
    """

    rng = rng or random
    punctuation = options.punctuation if options.punctuation is not None else ""
    base = f"Hello, {options.name}{punctuation}"

    if options.inspiration:
        inspiration = rng.choice(DEFAULT_MESSAGES)
        return f"{base} {inspiration}"

    if not options.excited and punctuation.endswith("!"):
        base = base[:-1] + "."

    return base


def parse_args(args: Iterable[str] | None = None) -> GreetingOptions:
    """Parse command line arguments into a :class:`GreetingOptions` instance."""

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("name", help="Name to greet")
    parser.add_argument(
        "-i",
        "--inspiration",
        action="store_true",
        help="Include an inspirational message",
    )
    parser.add_argument(
        "--no-excited",
        dest="excited",
        action="store_false",
        help="Use a calmer tone instead of an exclamation point",
    )
    parser.add_argument(
        "-p",
        "--punctuation",
        default="!",
        help="Custom punctuation used after the greeting",
    )

    parsed = parser.parse_args(args=args)
    return GreetingOptions(**vars(parsed))


def main(argv: Iterable[str] | None = None) -> None:
    """Entry point used by ``python -m mesterx.cli``."""

    options = parse_args(argv)
    print(build_message(options))


if __name__ == "__main__":  # pragma: no cover - convenience entry point
    main()
