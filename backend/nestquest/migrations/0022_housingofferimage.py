# Generated by Django 3.1.4 on 2024-02-25 21:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nestquest', '0021_auto_20240223_1934'),
    ]

    operations = [
        migrations.CreateModel(
            name='HousingOfferImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='housing_offer_images/')),
                ('housing_offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='nestquest.housingoffer')),
            ],
        ),
    ]
