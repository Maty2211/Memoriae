1) Primero van a tener que hacerse un entorno virtual para que todas las dependencias se guarden allí y no en sus pc's.
Dentro de la carpeta donde clonen el repositorio, ejecuten:

- python -m venv env


2) Luego de crearlo:

- .\env\Scripts\activate (Windows)
- source env/bin/activate (Linux)


3) Ahora instalar Django y django rest framework:

- pip install Django djangorestframework

verifico la instalacion
- python -m django --version
- pip show djangorestframework

4) Para correr la aplicación:

- python manage.py runserver

5) Instalar react y dependencias: (instalarlo dentro de la carpeta del front)

- sudo apt install nodejs npm -y

6) Ejecucion del front con vite:

- npm run dev

Cada vez que realicen cambios en la estructura de datos, hay que ejecutar:

- python manage.py runserver



