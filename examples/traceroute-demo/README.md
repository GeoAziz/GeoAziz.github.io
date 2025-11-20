# Traceroute demo — quick walkthrough

This tiny example shows how to run `traceroute` (or `tracert` on Windows) to inspect the path packets take from your machine to a remote server.

Files:

- `trace.sh` — a small script that runs `traceroute` (or `mtr` if available) and prints tips for interpreting the output.

How to run (Linux/macOS):

```bash
# make executable once
chmod +x trace.sh

# run traceroute to google.com (you can use any hostname)
./trace.sh google.com
```

Notes:

- Each line is a hop — usually a router or network boundary. Times are round-trip latencies to that hop.
- If you see `* * *`, the hop is not responding to traceroute probes (firewall or rate-limiting).
- Long latencies early in the trace usually indicate a local problem; long latencies later usually indicate distance or backbone congestion.

This README is intentionally short — run the script and read the inline hints.
