import random

import pytest

from mesterx.cli import DEFAULT_MESSAGES, GreetingOptions, build_message, parse_args


def test_build_message_default():
    message = build_message(GreetingOptions(name="Turing"))
    assert message == "Hello, Turing!"


def test_build_message_inspiration_uses_rng_choice():
    rng = random.Random(0)
    message = build_message(GreetingOptions(name="Turing", inspiration=True), rng=rng)
    assert message == f"Hello, Turing! {DEFAULT_MESSAGES[3]}"


def test_build_message_respects_no_excited():
    message = build_message(GreetingOptions(name="Grace", excited=False))
    assert message == "Hello, Grace."


def test_parse_args_defaults_and_flags():
    args = parse_args(["Ada", "--no-excited", "--punctuation", "?", "--inspiration"])
    assert args == GreetingOptions(
        name="Ada",
        inspiration=True,
        excited=False,
        punctuation="?",
    )


def test_cli_help_text_runs(capsys):
    # Ensure argparse is configured without throwing.
    with pytest.raises(SystemExit):
        parse_args(["-h"])

    captured = capsys.readouterr()
    assert "Command-line tool" in captured.out
