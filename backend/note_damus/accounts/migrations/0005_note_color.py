# Generated by Django 3.2.9 on 2021-12-09 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20211209_2116'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='color',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
