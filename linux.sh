
#!/bin/bash

# Configuración
PROJECT_NAME="Paradigma"
ELECTRON_VERSION=$(cat .electron-version)
DIST_DIR="dist"

# Mensajes
echo "Construyendo $PROJECT_NAME para Linux..."

# Construcción
npx electron-packager . $PROJECT_NAME --platform=linux --arch=x64 --electron-version=$ELECTRON_VERSION --out=$DIST_DIR

# Resultado
echo "Construcción completada. Los archivos de distribución se encuentran en $DIST_DIR"
