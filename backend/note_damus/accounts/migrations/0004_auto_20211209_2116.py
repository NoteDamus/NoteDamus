# Generated by Django 3.2.9 on 2021-12-09 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20211125_2132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='title',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='note',
            name='source',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='folder',
            unique_together={('user', 'title')},
        ),
        migrations.DeleteModel(
            name='Source',
        ),
    ]
