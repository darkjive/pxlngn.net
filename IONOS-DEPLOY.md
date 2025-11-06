# IONOS Deployment-Anleitung

Diese Anleitung beschreibt verschiedene Methoden, um die statische Astro-Website auf IONOS zu deployen.

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Methode 1: FTP/SFTP Deployment (Empfohlen)](#methode-1-ftpsftp-deployment-empfohlen)
- [Methode 2: IONOS Deploy Now](#methode-2-ionos-deploy-now)
- [Methode 3: SSH-Deployment (Erweitert)](#methode-3-ssh-deployment-erweitert)
- [Troubleshooting](#troubleshooting)

## Voraussetzungen

- Node.js (^18.17.1 oder ^20.3.0 oder >= 21.0.0)
- Ein IONOS Webhosting-Paket oder Deploy Now Account
- Zugriff auf IONOS Control Panel

## Methode 1: FTP/SFTP Deployment (Empfohlen)

Diese Methode eignet sich für alle IONOS Hosting-Pakete und ist am einfachsten einzurichten.

### 1. Build erstellen

Erstellen Sie zunächst einen Production-Build:

```bash
npm install
npm run build
```

Dies erstellt alle statischen Dateien im `dist/` Verzeichnis.

### 2. FTP/SFTP-Zugangsdaten ermitteln

1. Melden Sie sich im [IONOS Control Panel](https://my.ionos.de) an
2. Navigieren Sie zu: **Hosting → Webspace & Domains → Ihre Domain**
3. Klicken Sie auf **FTP-Zugang einrichten** oder **SSH/SFTP-Zugang**
4. Notieren Sie sich:
   - **Server/Host**: z.B. `your-domain.de` oder FTP-Server-Adresse
   - **Benutzername**: Ihr FTP-Benutzername
   - **Port**: 21 (FTP) oder 22 (SFTP)

### 3. Automatisches Deployment mit Script

Konfigurieren Sie das mitgelieferte Deploy-Script:

1. Kopieren Sie die Beispiel-Konfiguration:
   ```bash
   cp .env.deploy.example .env.deploy
   ```

2. Bearbeiten Sie `.env.deploy` und tragen Sie Ihre Zugangsdaten ein:
   ```bash
   # IONOS FTP/SFTP Zugangsdaten
   DEPLOY_HOST="your-ftp-server.ionos.de"
   DEPLOY_USER="your-username"
   DEPLOY_PASSWORD="your-password"
   DEPLOY_PORT=21
   DEPLOY_PROTOCOL="ftp"  # oder "sftp" für sichere Verbindung
   DEPLOY_REMOTE_PATH="/htdocs"  # Zielverzeichnis auf dem Server
   ```

3. Fügen Sie `.env.deploy` zur `.gitignore` hinzu (bereits enthalten)

4. Führen Sie das Deployment aus:
   ```bash
   chmod +x deploy-ionos.sh
   ./deploy-ionos.sh
   ```

Das Script führt automatisch folgende Schritte aus:
- Erstellt einen Production-Build
- Validiert die Build-Ausgabe
- Uploaded alle Dateien per FTP/SFTP
- Setzt korrekte Dateirechte

### 4. Manuelles FTP-Deployment

Falls Sie das Script nicht nutzen möchten:

1. Verwenden Sie einen FTP-Client wie [FileZilla](https://filezilla-project.org/)
2. Verbinden Sie sich mit Ihren IONOS-Zugangsdaten
3. Navigieren Sie zum Verzeichnis `/htdocs` (oder Ihr Document Root)
4. Laden Sie alle Dateien aus dem `dist/` Verzeichnis hoch
5. Stellen Sie sicher, dass die Ordnerstruktur erhalten bleibt

**Wichtig**: Die `index.html` muss sich im Root-Verzeichnis befinden (meist `/htdocs`).

### 5. .htaccess für Pretty URLs (Optional)

Für saubere URLs ohne `.html`-Endung:

```apache
# Bereits in public/_headers vorhanden, für IONOS als .htaccess:
RewriteEngine On
RewriteBase /

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Pretty URLs - Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^/]+)$ $1.html [L]

# Handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]
```

Speichern Sie dies als `.htaccess` im Root-Verzeichnis.

## Methode 2: IONOS Deploy Now

IONOS Deploy Now bietet automatische Deployments direkt aus GitHub.

### 1. Deploy Now einrichten

1. Besuchen Sie [IONOS Deploy Now](https://www.ionos.de/hosting/deploy-now)
2. Verbinden Sie Ihr GitHub-Repository
3. Wählen Sie den Branch (z.B. `main`)

### 2. Build-Konfiguration

Deploy Now sollte automatisch erkennen, dass es sich um ein Node.js-Projekt handelt. Falls nicht, konfigurieren Sie:

**Build Command:**
```bash
npm install && npm run build
```

**Output Directory:**
```
dist
```

**Node Version:**
```
20.x
```

### 3. Umgebungsvariablen (Optional)

Falls Sie Umgebungsvariablen benötigen, fügen Sie diese im Deploy Now Dashboard hinzu.

### 4. Deployment

Nach der Konfiguration erfolgen Deployments automatisch bei jedem Push zum konfigurierten Branch.

## Methode 3: SSH-Deployment (Erweitert)

Für IONOS-Pakete mit SSH-Zugang können Sie direkt auf dem Server bauen.

### Voraussetzungen

- SSH-Zugriff auf Ihrem IONOS-Paket aktiviert
- Node.js auf dem Server installiert (oder via NVM)

### 1. SSH-Verbindung einrichten

```bash
ssh username@your-domain.de
```

### 2. Repository klonen

```bash
cd /htdocs  # oder Ihr Document Root
git clone https://github.com/your-username/pxlngn.net.git .
```

### 3. Deployment-Script auf Server

Erstellen Sie ein Deployment-Script `deploy.sh` auf dem Server:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build
echo "🏗️  Building site..."
npm run build

# Move build files to web root (if needed)
# rsync -av --delete dist/ /htdocs/

echo "✅ Deployment complete!"
```

Machen Sie es ausführbar:
```bash
chmod +x deploy.sh
```

### 4. Git Hooks für Auto-Deploy (Optional)

Richten Sie einen Post-Receive-Hook ein für automatische Deployments bei Push.

## Troubleshooting

### Problem: 404-Fehler bei Unterseiten

**Lösung**: Überprüfen Sie, ob `.htaccess` korrekt konfiguriert ist und `mod_rewrite` aktiviert ist.

### Problem: CSS/JS-Dateien werden nicht geladen

**Lösung**:
1. Überprüfen Sie die `base`-Konfiguration in `src/config.yaml`
2. Stellen Sie sicher, dass alle Dateien hochgeladen wurden
3. Prüfen Sie Browser-Konsole auf 404-Fehler

### Problem: Bilder werden nicht angezeigt

**Lösung**:
1. Überprüfen Sie, ob das `public/`-Verzeichnis vollständig hochgeladen wurde
2. Prüfen Sie Dateiberechtigungen (sollten 644 für Dateien sein)

### Problem: FTP-Upload dauert sehr lange

**Lösungen**:
1. Verwenden Sie SFTP statt FTP (sicherer und oft schneller)
2. Nutzen Sie das Deploy-Script, das nur geänderte Dateien updated
3. Komprimieren Sie Assets mit `npm run build` (bereits aktiviert)

### Problem: Deploy-Script schlägt fehl

**Lösungen**:
1. Überprüfen Sie `.env.deploy` auf korrekte Zugangsdaten
2. Testen Sie FTP-Verbindung manuell mit FileZilla
3. Prüfen Sie, ob `lftp` oder `curl` installiert ist
4. Aktivieren Sie Debug-Modus im Script

### Problem: Website zeigt alte Version

**Lösung**:
1. Leeren Sie Browser-Cache (Strg+F5)
2. Leeren Sie ggf. CDN-Cache bei IONOS
3. Überprüfen Sie, ob Build korrekt erstellt wurde: `ls -la dist/`

## Performance-Optimierungen

### 1. Gzip-Kompression aktivieren

Fügen Sie zu `.htaccess` hinzu:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### 2. Browser-Caching

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>
```

### 3. Security Headers

Die `public/_headers` Datei enthält bereits Security Headers für Netlify/Vercel.
Für IONOS Apache-Server fügen Sie zu `.htaccess` hinzu:

```apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## Weitere Ressourcen

- [IONOS Hilfe Center](https://www.ionos.de/hilfe/)
- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [IONOS Deploy Now Dokumentation](https://docs.ionos.space/)

## Support

Bei Fragen oder Problemen:
1. Überprüfen Sie die IONOS-Dokumentation
2. Prüfen Sie die Astro-Deployment-Dokumentation
3. Erstellen Sie ein Issue im Repository
