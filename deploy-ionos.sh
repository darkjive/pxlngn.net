#!/bin/bash

###############################################################################
# IONOS Deployment Script
#
# Dieses Script automatisiert das Deployment einer Astro-Website zu IONOS
# via FTP oder SFTP.
#
# Verwendung:
#   1. Kopieren Sie .env.deploy.example zu .env.deploy
#   2. Tragen Sie Ihre IONOS-Zugangsdaten in .env.deploy ein
#   3. Führen Sie aus: ./deploy-ionos.sh
#
# Voraussetzungen:
#   - lftp (für FTP/SFTP) oder curl (fallback)
#   - Node.js und npm
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Configuration file
CONFIG_FILE="${SCRIPT_DIR}/.env.deploy"

###############################################################################
# Helper Functions
###############################################################################

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_command() {
    if ! command -v "$1" &> /dev/null; then
        return 1
    fi
    return 0
}

###############################################################################
# Pre-flight Checks
###############################################################################

log_info "🚀 IONOS Deployment Script gestartet"
echo ""

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    log_error "Konfigurationsdatei nicht gefunden: $CONFIG_FILE"
    log_info "Bitte kopieren Sie .env.deploy.example zu .env.deploy und tragen Sie Ihre Zugangsdaten ein:"
    log_info "  cp .env.deploy.example .env.deploy"
    log_info "  nano .env.deploy"
    exit 1
fi

# Load configuration
log_info "Lade Konfiguration aus $CONFIG_FILE"
# shellcheck disable=SC1090
source "$CONFIG_FILE"

# Validate required variables
REQUIRED_VARS=("DEPLOY_HOST" "DEPLOY_USER" "DEPLOY_REMOTE_PATH")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    log_error "Fehlende Konfigurationsvariablen:"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    exit 1
fi

# Set defaults
DEPLOY_PORT="${DEPLOY_PORT:-21}"
DEPLOY_PROTOCOL="${DEPLOY_PROTOCOL:-ftp}"
BUILD_DIR="${BUILD_DIR:-dist}"
DRY_RUN="${DRY_RUN:-false}"

# Check for required commands
log_info "Überprüfe erforderliche Befehle..."

if ! check_command "npm"; then
    log_error "npm ist nicht installiert. Bitte installieren Sie Node.js."
    exit 1
fi

DEPLOY_METHOD=""
if check_command "lftp"; then
    DEPLOY_METHOD="lftp"
    log_success "lftp gefunden - verwende lftp für Deployment"
elif check_command "curl"; then
    DEPLOY_METHOD="curl"
    log_warning "lftp nicht gefunden - verwende curl (langsamer)"
    log_info "Für bessere Performance installieren Sie lftp: sudo apt-get install lftp"
else
    log_error "Weder lftp noch curl gefunden. Bitte installieren Sie eines davon."
    exit 1
fi

###############################################################################
# Build
###############################################################################

log_info "📦 Installiere Dependencies..."
npm ci --silent

log_info "🏗️  Erstelle Production Build..."
npm run build

# Verify build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    log_error "Build-Verzeichnis nicht gefunden: $BUILD_DIR"
    log_error "Build fehlgeschlagen?"
    exit 1
fi

# Check if build directory is empty
if [ -z "$(ls -A "$BUILD_DIR")" ]; then
    log_error "Build-Verzeichnis ist leer: $BUILD_DIR"
    exit 1
fi

log_success "Build erfolgreich erstellt in $BUILD_DIR/"

# Show build size
BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
log_info "Build-Größe: $BUILD_SIZE"

###############################################################################
# Deployment
###############################################################################

if [ "$DRY_RUN" = "true" ]; then
    log_warning "DRY RUN Modus aktiviert - keine Dateien werden hochgeladen"
    log_info "Dateien die hochgeladen würden:"
    find "$BUILD_DIR" -type f
    exit 0
fi

log_info "🌐 Starte Upload zu IONOS..."
log_info "  Host: $DEPLOY_HOST"
log_info "  User: $DEPLOY_USER"
log_info "  Port: $DEPLOY_PORT"
log_info "  Protocol: $DEPLOY_PROTOCOL"
log_info "  Remote Path: $DEPLOY_REMOTE_PATH"
echo ""

###############################################################################
# Deploy with lftp
###############################################################################

if [ "$DEPLOY_METHOD" = "lftp" ]; then
    log_info "Verwende lftp für Deployment..."

    # Create lftp script
    LFTP_SCRIPT=$(cat <<EOF
set ftp:ssl-allow no
set ssl:verify-certificate no
set net:timeout 10
set net:max-retries 2
set net:reconnect-interval-base 5

open -u "$DEPLOY_USER","$DEPLOY_PASSWORD" -p $DEPLOY_PORT $DEPLOY_PROTOCOL://$DEPLOY_HOST

lcd "$BUILD_DIR"
cd "$DEPLOY_REMOTE_PATH"

# Mirror local to remote
# -R = reverse (local to remote)
# -e = delete files not present on source
# -v = verbose
# -n = only newer files
# --parallel=3 = upload 3 files in parallel
mirror -R -e -v -n --parallel=3 ./ ./

bye
EOF
)

    # Execute lftp
    if echo "$LFTP_SCRIPT" | lftp; then
        log_success "✅ Deployment erfolgreich!"
    else
        log_error "❌ Deployment fehlgeschlagen!"
        exit 1
    fi

###############################################################################
# Deploy with curl (fallback)
###############################################################################

elif [ "$DEPLOY_METHOD" = "curl" ]; then
    log_warning "Verwende curl für Deployment (kann langsam sein)..."

    # Determine protocol URL
    if [ "$DEPLOY_PROTOCOL" = "sftp" ]; then
        PROTOCOL_URL="sftp"
    else
        PROTOCOL_URL="ftp"
    fi

    # Upload files
    cd "$BUILD_DIR"

    FILE_COUNT=$(find . -type f | wc -l)
    CURRENT=0

    while IFS= read -r -d '' file; do
        CURRENT=$((CURRENT + 1))
        RELATIVE_PATH="${file#./}"
        REMOTE_FILE="${DEPLOY_REMOTE_PATH}/${RELATIVE_PATH}"

        # Create remote directory if needed
        REMOTE_DIR=$(dirname "$REMOTE_FILE")

        log_info "[$CURRENT/$FILE_COUNT] Uploading: $RELATIVE_PATH"

        # Upload with curl
        if [ -n "$DEPLOY_PASSWORD" ]; then
            curl -s --ftp-create-dirs \
                -T "$file" \
                -u "$DEPLOY_USER:$DEPLOY_PASSWORD" \
                "${PROTOCOL_URL}://${DEPLOY_HOST}:${DEPLOY_PORT}${REMOTE_FILE}"
        else
            curl -s --ftp-create-dirs \
                -T "$file" \
                -u "$DEPLOY_USER" \
                "${PROTOCOL_URL}://${DEPLOY_HOST}:${DEPLOY_PORT}${REMOTE_FILE}"
        fi

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}  ✓${NC}"
        else
            echo -e "${RED}  ✗ Fehler beim Upload${NC}"
        fi

    done < <(find . -type f -print0)

    cd "$SCRIPT_DIR"

    log_success "✅ Deployment abgeschlossen!"
fi

###############################################################################
# Post-Deployment
###############################################################################

echo ""
log_info "📊 Deployment-Statistik:"
log_info "  Hochgeladene Dateien: $(find "$BUILD_DIR" -type f | wc -l)"
log_info "  Build-Größe: $BUILD_SIZE"
echo ""

# Optional: Ping website to check if it's up
if check_command "curl"; then
    if [ -n "$DEPLOY_SITE_URL" ]; then
        log_info "🔍 Überprüfe Website..."
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_SITE_URL" || echo "000")

        if [ "$HTTP_CODE" = "200" ]; then
            log_success "✅ Website ist erreichbar: $DEPLOY_SITE_URL (HTTP $HTTP_CODE)"
        elif [ "$HTTP_CODE" = "000" ]; then
            log_warning "⚠️  Website nicht erreichbar (Timeout oder DNS-Problem)"
        else
            log_warning "⚠️  Website antwortet mit HTTP $HTTP_CODE"
        fi
    fi
fi

echo ""
log_success "🎉 Deployment erfolgreich abgeschlossen!"

# Optional: Show next steps
if [ -n "$DEPLOY_SITE_URL" ]; then
    log_info "🌍 Ihre Website ist verfügbar unter: $DEPLOY_SITE_URL"
fi

echo ""
