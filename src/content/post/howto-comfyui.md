---
publishDate: 2024-12-05T00:00:00Z
author: Alain Ritter
title: Schritt-für-Schritt-Anleitung zur Installation von ComfyUI (NVIDIA)
excerpt: In diesem Blog-Beitrag erfährst du, wie du ComfyUI auf deinem System installierst. Folgen Sie unserer detaillierten Anleitung, um die Installation mühelos abzuschließen und sofort mit der Erstellung beeindruckender UI-Komponenten zu beginnen.
image: https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
category: Tutorials
tags:
  - ai
  - howto
metadata:
  canonical: https://pxlngn.net/howto-comfyui
---

# Schritt-für-Schritt-Anleitung zur Installation von ComfyUI

In dieser Anleitung zeige ich dir, wie du ComfyUI auf deinem System installieren kannst. ComfyUI ist ein benutzerfreundliches Framework, das es ermöglicht, benutzerdefinierte UI-Komponenten zu erstellen und nahtlos in deine Projekte zu integrieren. Folgen Sie den nachstehenden Schritten, um ComfyUI schnell und einfach zu installieren.

## Voraussetzungen

Bevor du mit der Installation von ComfyUI beginnst, stelle sicher, dass die folgenden Voraussetzungen auf deinem System erfüllt sind:

1. **Python 3.8 oder höher**: ComfyUI benötigt Python 3.8 oder höher. Du kannst die Version von Python überprüfen, indem du den folgenden Befehl in deinem Terminal ausführst:

    ```bash
    python --version
    ```

    Falls Python nicht installiert ist oder du eine ältere Version hast, kannst du die neueste Version von der [offiziellen Python-Website](https://www.python.org/downloads/) herunterladen und installieren.

2. **Git**: Stelle sicher, dass Git installiert ist, um das Repository zu klonen. Überprüfe dies mit:

    ```bash
    git --version
    ```

    Falls Git nicht installiert ist, lade es von der [offiziellen Git-Website](https://git-scm.com/) herunter und installiere es.

## ComfyUI installieren

Befolge diese Schritte, um ComfyUI zu installieren:

1. **Repository klonen**: Klone das ComfyUI-Repository von GitHub in ein Verzeichnis deiner Wahl:

    ```bash
    git clone https://github.com/comfyanonymous/ComfyUI.git
    ```

2. **In das Verzeichnis wechseln**: Wechsle in das Verzeichnis des geklonten Repositories:

    ```bash
    cd ComfyUI
    ```

3. **Abhängigkeiten installieren**: Installiere die benötigten Abhängigkeiten mit pip:

    ```bash
    pip install -r requirements.txt
    ```

## ComfyUI starten

Sobald alle Abhängigkeiten installiert sind, kannst du ComfyUI starten. Führe dazu den folgenden Befehl aus:

```bash
python main.py



