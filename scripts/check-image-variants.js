#!/usr/bin/env node
/**
 * Image Variants Checker
 *
 * Prüft ob alle benötigten Bildvarianten für BackgroundImage-Komponenten existieren.
 * Zeigt an welche Dateien fehlen und generiert eine Übersicht.
 *
 * Usage:
 *   node scripts/check-image-variants.js
 *
 * Die BackgroundImage-Komponente erwartet folgende Varianten:
 * - Basis: /images/background.webp
 * - Light Mobile: /images/background_m.webp
 * - Light Desktop: /images/background_d.webp
 * - Dark Mobile: /images/background_dark_m.webp
 * - Dark Desktop: /images/background_dark_d.webp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

/**
 * Generiert alle erwarteten Bildvarianten für einen Basis-Pfad
 */
function generateImageVariants(baseSrc) {
  const lastSlashIndex = baseSrc.lastIndexOf('/');
  const lastDotIndex = baseSrc.lastIndexOf('.');

  const pathPart = baseSrc.substring(0, lastSlashIndex + 1);
  const name = baseSrc.substring(lastSlashIndex + 1, lastDotIndex);
  const ext = baseSrc.substring(lastDotIndex);

  return {
    lightMobile: `${pathPart}${name}_m${ext}`,
    lightDesktop: `${pathPart}${name}_d${ext}`,
    darkMobile: `${pathPart}${name}_dark_m${ext}`,
    darkDesktop: `${pathPart}${name}_dark_d${ext}`,
    fallback: baseSrc,
  };
}

/**
 * Prüft ob eine Datei existiert
 */
function fileExists(filePath) {
  const fullPath = path.join(publicDir, filePath);
  return fs.existsSync(fullPath);
}

/**
 * Findet alle BackgroundImage-Verwendungen in index.astro
 */
function findBackgroundImages() {
  const indexPath = path.join(projectRoot, 'src/pages/index.astro');
  const content = fs.readFileSync(indexPath, 'utf-8');

  // Regex zum Finden von BackgroundImage src-Props
  const regex = /<BackgroundImage[^>]*src=["']([^"']+)["']/g;
  const matches = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]);
  }

  return [...new Set(matches)]; // Deduplizieren
}

/**
 * Hauptfunktion
 */
function main() {
  console.log('🔍 BackgroundImage Variants Checker\n');
  console.log('═'.repeat(80) + '\n');

  const backgroundImages = findBackgroundImages();

  if (backgroundImages.length === 0) {
    console.log('⚠️  Keine BackgroundImage-Komponenten gefunden.');
    return;
  }

  console.log(`📸 Gefundene Hintergrundbilder: ${backgroundImages.length}\n`);

  let totalVariants = 0;
  let existingVariants = 0;
  let missingVariants = 0;

  backgroundImages.forEach((imageSrc, index) => {
    console.log(`${index + 1}. ${imageSrc}`);
    console.log('─'.repeat(80));

    const variants = generateImageVariants(imageSrc);

    // Prüfe jede Variante
    Object.entries(variants).forEach(([key, variantPath]) => {
      totalVariants++;
      const exists = fileExists(variantPath);

      if (exists) {
        existingVariants++;
        console.log(`   ✅ ${key.padEnd(15)} ${variantPath}`);
      } else {
        missingVariants++;
        console.log(`   ❌ ${key.padEnd(15)} ${variantPath} (FEHLT)`);
      }
    });

    console.log('');
  });

  // Zusammenfassung
  console.log('═'.repeat(80));
  console.log('\n📊 Zusammenfassung:\n');
  console.log(`   Gesamt Varianten:    ${totalVariants}`);
  console.log(`   ✅ Vorhanden:        ${existingVariants} (${Math.round((existingVariants / totalVariants) * 100)}%)`);
  console.log(`   ❌ Fehlend:          ${missingVariants} (${Math.round((missingVariants / totalVariants) * 100)}%)`);

  if (missingVariants > 0) {
    console.log('\n💡 Hinweis:');
    console.log('   Die BackgroundImage-Komponente verwendet automatisch Fallback zum Original-Bild,');
    console.log('   wenn Varianten fehlen. Für optimale Performance sollten aber alle Varianten');
    console.log('   erstellt werden:\n');
    console.log('   - _m = Mobile (bis 767px Breite)');
    console.log('   - _d = Desktop (ab 768px Breite)');
    console.log('   - _dark_m = Dark Mode Mobile');
    console.log('   - _dark_d = Dark Mode Desktop');
  } else {
    console.log('\n🎉 Alle Bildvarianten sind vorhanden!');
  }

  console.log('');
}

main();
