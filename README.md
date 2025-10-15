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

5) Instalar react y dependencias: (instalarlo dentro de la carpeta del frontend)

- sudo apt install nodejs npm -y
- npm install 

6) Ejecucion del front con vite:

- npm run dev

Cada vez que realicen cambios en la estructura de datos, hay que ejecutar:

- python manage.py runserver

7) Luego de instalar postgreSQL, instalar el conector de python dentro del entorno virtual:

- pip install psycopg2-binary

8)Instalar la librería para leer datos de entorno:

- pip install python-decouple
- pip show python-decouple

9) Incluir un archivo llamado .env, a la altura de README.md, con la misma estructura de env.example. Reemplazar los valores de las variables por los datos de conexión de la base de datos local.

10)Instalar librerías para front en la carpeta frontend

- npm install react-bootstrap bootstrap
- npm install dayjs
- npm install gridstack
- npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
- npm install @fullcalendar/list
- npm install @fullcalendar/core @fullcalendar/multimonth
- npm install @mui/material @emotion/react @emotion/styled
- npm install @mui/icons-materia
- npm install @mui/x-date-pickers
- npm install recharts




