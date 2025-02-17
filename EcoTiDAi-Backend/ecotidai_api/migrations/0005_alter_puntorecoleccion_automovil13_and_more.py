# Generated by Django 4.2.2 on 2023-08-28 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecotidai_api', '0004_remove_puntorecoleccion_total_llantas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='automovil13',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='automovil14',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='automovil15',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='bicicleta',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='camioneta16',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='camioneta17',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='camioneta18',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='camioneta19',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='especiales',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='puntorecoleccion',
            name='motocicleta',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
