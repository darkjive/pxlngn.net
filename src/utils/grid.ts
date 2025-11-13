/**
 * Grid Utility Functions
 *
 * Wiederverwendbare Funktionen für Grid-Layouts
 */

/**
 * Grid-Columns Mapping
 * Definiert Tailwind-Klassen für verschiedene Spalten-Anzahlen
 */
const GRID_COLUMNS_MAP = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
} as const;

/**
 * Gibt die korrekten Tailwind Grid-Klassen für die gewünschte Spalten-Anzahl zurück
 *
 * @param columns - Anzahl der Spalten (1-4)
 * @returns Tailwind CSS-Klassen String
 *
 * @example
 * getGridColumns(3) // 'sm:grid-cols-2 lg:grid-cols-3'
 * getGridColumns(4) // 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
 */
export const getGridColumns = (columns: number = 2): string => {
  return GRID_COLUMNS_MAP[columns as keyof typeof GRID_COLUMNS_MAP] || GRID_COLUMNS_MAP[2];
};
