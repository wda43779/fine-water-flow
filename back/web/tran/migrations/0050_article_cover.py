# Generated by Django 2.2.3 on 2020-10-08 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tran', '0049_auto_20201007_1218'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='cover',
            field=models.CharField(blank=True, max_length=256),
        ),
    ]
