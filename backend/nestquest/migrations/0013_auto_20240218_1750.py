# Generated by Django 3.1.4 on 2024-02-18 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nestquest', '0012_auto_20240218_1748'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='housingrequest',
            name='id',
        ),
        migrations.RemoveField(
            model_name='message',
            name='id',
        ),
        migrations.AddField(
            model_name='housingrequest',
            name='_id',
            field=models.AutoField(default=1, editable=False, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='_id',
            field=models.AutoField(default=1, editable=False, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]