# mortest_stores
bulk/retail store management system.


# Generate requirements :
    pip freeze > .\mortest_stores\requirements.txt

# Make migrations scripts :
    python manage.py makemigrations

# Migrate models to database :
    python manage.py migrate

# Run django server :
    python manage.py runserver