"""Fetch https://example.com and print its status code and page title."""

import re
import requests


def main() -> None:
    url = "https://example.com"
    response = requests.get(url, timeout=10)

    match = re.search(r"<title>(.*?)</title>", response.text, re.IGNORECASE | re.DOTALL)
    title = match.group(1).strip() if match else "(no title found)"

    print(f"Status code: {response.status_code}")
    print(f"Page title: {title}")


if __name__ == "__main__":
    main()
