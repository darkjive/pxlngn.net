---
publishDate: 2024-10-15T00:00:00Z
author: Alain Ritter
title: 'Tailwind-Klassen aus Figma exportieren'
excerpt: So exportierst du Tailwind-Klassen aus Figma mit dem Plugin "Figma to Code"
image: ~/assets/images/preview.jpg
category: Design
tags:
  - tutorial
  - tailwind
  - design
metadata:
  canonical: https://pxlngn.net/figma-nach-tailwind
---

Wenn ich ein Figma-Design in Code umsetzen möchte, nutze ich oft das Plugin **"Figma to Code (HTML, Tailwind, Flutter, SwiftUI)"**. Damit kann ich schnell und einfach **Tailwind CSS**-Klassen für mein Design generieren. Das spart Zeit und erleichtert die Umsetzung erheblich. In diesem Guide erkläre ich dir Schritt für Schritt, wie du das machen kannst.

---

## 1. Das Plugin installieren

Als Erstes müssen wir das Plugin in Figma installieren. So gehe ich dabei vor – und so kannst du es auch machen:

- Öffne dein Figma-Projekt.
- Klicke oben auf das **"Resources"**-Symbol (die drei Würfel) oder drücke `Shift + I`.
- Suche im Suchfeld nach **"Figma to Code"**.
- Wähle das Plugin **"Figma to Code (HTML, Tailwind, Flutter, SwiftUI)"** aus und klicke auf **"Install"**.

Jetzt ist das Plugin bereit, um loszulegen!

---

## 2. Das Design auswählen

Als Nächstes wähle ich das Design-Element oder den Frame aus, für den ich Tailwind-Klassen generieren möchte. Du kannst genau so vorgehen:

- Öffne dein Figma-Dokument.
- Klicke auf das Element, das du exportieren willst – das kann ein Button, ein Container oder sogar ein kompletter Frame sein.

Ein klar strukturiertes Design ist dabei wichtig, denn das Plugin kann damit besser arbeiten.

---

## 3. Das Plugin starten

Jetzt starte ich das Plugin. Das funktioniert so:

- Klicke mit der rechten Maustaste auf das ausgewählte Design-Element.
- Gehe im Menü zu **"Plugins"** > **"Figma to Code"**.
- Das Plugin öffnet sich in einem Fenster auf der rechten Seite.

Starte das Plugin einfach genauso, und du kannst direkt loslegen.

---

## 4. Export-Optionen auswählen

Im Plugin sehe ich mehrere Export-Optionen, darunter **HTML**, **Tailwind CSS**, **Flutter**, und **SwiftUI**. Da ich mit Tailwind arbeite, wähle ich **"Tailwind CSS"**. Du kannst diese Option ebenfalls auswählen, wenn du Tailwind verwenden möchtest.

---

## 5. Tailwind-Klassen generieren

Nachdem ich die Option **Tailwind CSS** ausgewählt habe, analysiert das Plugin mein Design und zeigt mir die passenden Tailwind-Klassen. Hier ein Beispiel, das ich für einen Button erhalten habe:

```html
<div class="rounded bg-blue-500 p-4 text-white shadow-md">Button Text</div>
```

[[Top]](#top)
