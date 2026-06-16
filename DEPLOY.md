# Деплой проекта masterico на Render

Проект состоит из трёх частей, которые поднимаются одним Blueprint-файлом (`render.yaml`):

- **masterico-db** — PostgreSQL (бесплатный план)
- **masterico-api** — Django backend (web service)
- **masterico-web** — React frontend (static site)

Всё настроено так, чтобы развернуться автоматически. От тебя нужно только залить код на GitHub и подключить репозиторий в Render.

---

## Шаг 1. Залить проект на GitHub

Из корневой папки проекта (`Diplom`):

```bash
git init
git add .
git commit -m "Prepare for Render deploy"
git branch -M main
git remote add origin https://github.com/<твой-логин>/<репозиторий>.git
git push -u origin main
```

> Папка должна содержать `render.yaml`, папки `backend/` и `masterico/`.

---

## Шаг 2. Создать Blueprint в Render

1. Зайди на https://dashboard.render.com и войди через GitHub.
2. Нажми **New → Blueprint**.
3. Выбери свой репозиторий. Render найдёт `render.yaml` и покажет 3 ресурса
   (`masterico-db`, `masterico-api`, `masterico-web`).
4. Нажми **Apply**. Render сам:
   - создаст базу PostgreSQL;
   - установит зависимости бэкенда, выполнит `collectstatic` и `migrate`;
   - соберёт фронтенд и опубликует статику;
   - выпустит HTTPS-сертификаты.

Первый деплой занимает 5–10 минут.

---

## Шаг 3. Проверить адрес API (важно!)

Фронтенд собирается с зашитым адресом API: `https://masterico-api.onrender.com`
(переменная `REACT_APP_API_URL` в `render.yaml`).

Если Render по какой-то причине дал бэкенду другой адрес (например, имя было занято
и добавился суффикс), нужно:

1. Открыть сервис **masterico-api** в дашборде и скопировать его реальный URL.
2. В сервисе **masterico-web** → **Environment** заменить значение `REACT_APP_API_URL`
   на этот URL.
3. Нажать **Manual Deploy → Deploy latest commit** для `masterico-web`.

---

## Шаг 4. Создать админа Django (опционально)

Чтобы зайти в `/admin/` на бэкенде:

1. Открой **masterico-api → Shell** в дашборде Render.
2. Выполни:
   ```bash
   cd backend_django
   python manage.py createsuperuser
   ```

---

## Локальный запуск (для проверки перед деплоем)

**Бэкенд:**
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
cd backend_django
python manage.py migrate         # нужен локальный PostgreSQL (см. settings.py)
python manage.py runserver       # http://localhost:8000
```

**Фронтенд:**
```bash
cd masterico
npm install
npm start                        # http://localhost:3000, обращается к localhost:8000
```

---

## Что было изменено для деплоя

- `backend/requirements.txt` — добавлены `whitenoise`, `gunicorn`, `dj-database-url`;
  убраны неиспользуемые и несовместимые пакеты (`django-mongodb-engine`,
  `djangotoolbox`, `mercurial`, `hg`, `pymongo`).
- `backend/backend_django/backend_django/settings.py` — `SECRET_KEY`, `DEBUG`,
  `ALLOWED_HOSTS`, база данных теперь читаются из переменных окружения
  (с локальными значениями по умолчанию).
- `backend/render-build.sh` — build-скрипт для Render.
- `masterico/src/index.js` — адрес API берётся из `REACT_APP_API_URL`.
  Все вызовы к `https://api.masterico.ru` заменены на относительные пути.
- `render.yaml` — Blueprint, разворачивающий все три сервиса.

## Бесплатный тариф: нюанс

Бесплатный web service на Render «засыпает» после ~15 минут без запросов.
Первый запрос после простоя грузится 30–60 секунд (бэкенд просыпается).
Для демонстрации/диплома это нормально.
