import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from backend_api.models import UserAddition


class Command(BaseCommand):
    help = 'Create or update an admin user from environment variables.'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_ADMIN_USERNAME')
        password = os.environ.get('DJANGO_ADMIN_PASSWORD')
        email = os.environ.get('DJANGO_ADMIN_EMAIL', '')
        name = os.environ.get('DJANGO_ADMIN_NAME', 'Administrator')
        phone = os.environ.get('DJANGO_ADMIN_PHONE', '')

        if not username or not password:
            self.stdout.write(
                self.style.WARNING(
                    'DJANGO_ADMIN_USERNAME or DJANGO_ADMIN_PASSWORD is not set; skipping admin creation.'
                )
            )
            return

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': email,
                'is_staff': True,
                'is_superuser': True,
            },
        )

        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        UserAddition.objects.update_or_create(
            user=user,
            defaults={
                'name': name,
                'phone': phone,
                'role': 'admin',
            },
        )

        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{action} admin user "{username}".'))
