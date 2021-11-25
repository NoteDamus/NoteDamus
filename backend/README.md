# Note Damus - Note Application
Note Damus enables you to create your own notes in one click without navigating away from the browser.

## Installation
In order to run the backend application in local environment follow instructions below:

1. Copy the public repo's URL
2. Create virtual environment for the Python application and activate it
  1. On Linux/Mac: python3 -m venv env and source env/bin/activate
  2. On Windows: py -m venv env and .\env\Scripts\activate
3. Clone the repository using git clone <https-URL> command.
4. Install pip (Python package manager) if you haven’t already
5. Navigate to the backend directory and install all dependencies using the pip install -r requirements.txt command.
7. Run `python manage.py migrate` to migrate the database
8. Run `python manage.py runserver` to start the backend in the 8000 port

  
## Testing
  Follow the steps for the installation, and run `python manage.py test`. All the tests inside of the subdirectories will run.
