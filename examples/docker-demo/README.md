# Docker Demo

A tiny FastAPI demo to accompany the "Why I Love Docker" blog post.

Quick start (requires Docker):

```bash
# build the image
docker build -t docker-demo .

# run the container and publish port 8000
docker run -p 8000:8000 docker-demo

# visit http://localhost:8000
```

Files:
- `app.py` — simple FastAPI app
- `Dockerfile` — minimal production-ready-ish Dockerfile
- `requirements.txt` — pinned dependencies
