"""
Configuración local para el módulo cultivos.
Carga variables de entorno desde el archivo .env en esta carpeta.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar .env desde la carpeta cultivos
CULTIVOS_DIR = Path(__file__).resolve().parent
ENV_FILE = CULTIVOS_DIR / '.env'

if ENV_FILE.exists():
    load_dotenv(ENV_FILE)
else:
    print(f"Advertencia: No se encontró el archivo .env en {CULTIVOS_DIR}")

# Variables de configuración
CULTIVOS_API_KEY = os.getenv('CULTIVOS_API_KEY', '')
CULTIVOS_DEBUG = os.getenv('CULTIVOS_DEBUG', 'False') == 'True'

# Puedes agregar más variables aquí
# CULTIVOS_MAX_RESULTS = int(os.getenv('CULTIVOS_MAX_RESULTS', '100'))
# CULTIVOS_TIMEOUT = int(os.getenv('CULTIVOS_TIMEOUT', '30'))
