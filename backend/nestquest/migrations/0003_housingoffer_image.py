# Generated by Django 3.1.4 on 2024-02-14 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nestquest', '0002_housingrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='housingoffer',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
