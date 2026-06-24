#!/usr/bin/env bash
# Render build script for the Django backend.
# Runs from the "backend" directory (rootDir in render.yaml).
set -o errexit

pip install -r requirements.txt

cd backend_django
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py ensure_admin
