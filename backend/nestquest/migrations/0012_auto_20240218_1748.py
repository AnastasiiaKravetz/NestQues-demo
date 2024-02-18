# Generated by Django 3.1.4 on 2024-02-18 16:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('nestquest', '0011_auto_20240218_1716'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='housingrequest',
            name='sender',
        ),
        migrations.RemoveField(
            model_name='message',
            name='sender',
        ),
        migrations.AddField(
            model_name='housingrequest',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='message',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='housingrequest',
            name='housing_offer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='nestquest.housingoffer'),
        ),
        migrations.AlterField(
            model_name='message',
            name='request',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='nestquest.housingrequest'),
        ),
    ]