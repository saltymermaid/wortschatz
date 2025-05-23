# Wortschatz

A Progressive Web App (PWA) for practicing German language gender and plural forms using drag-and-drop exercises.

## Features

- **Gender Exercise**: Practice identifying the correct gender article (der, die, das) for German nouns
- **Plural Exercise**: Practice identifying the correct plural formation pattern for German nouns
- **Word Management**: Add, edit, and organize your own word lists
- **CSV Import/Export**: Import and export word lists for easy sharing and backup
- **Progress Tracking**: Track your performance with scores and progress indicators
- **Offline Support**: Works without an internet connection after initial load
- **Installable**: Can be added to your home screen on desktop or mobile devices

## Getting Started

### Running Locally

1. Clone or download this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. Start adding words to your lists or import existing CSV files

### Installation as PWA

1. Open the app in Chrome or another compatible browser
2. Click the install icon in the address bar (or use the browser's menu)
3. Follow the prompts to add the app to your home screen

## Word List Format

### Gender Words CSV Format
```
word,gender
Hund,der
Katze,die
Haus,das
```

### Plural Words CSV Format
```
singular,plural,category
Computer,Computer,no-change
Tisch,Tische,add-e
Auto,Autos,add-s
```

## Plural Categories

### Group A
- **no-change**: The plural form is the same as the singular (e.g., der Computer → die Computer)
- **add-e**: The plural adds -e to the singular (e.g., der Tisch → die Tische)
- **add-s**: The plural adds -s to the singular (e.g., das Auto → die Autos)

### Group B
- **add-e-umlaut**: The plural adds -e and changes the vowel (e.g., der Ball → die Bälle)
- **add-er-umlaut**: The plural adds -er and changes the vowel (e.g., das Haus → die Häuser)
- **add-(e)n**: The plural adds -n or -en (e.g., die Frau → die Frauen, der Student → die Studenten)

## Data Storage

All word lists and progress are stored in your browser's localStorage. To back up your data:
1. Use the Export buttons to download your word lists as CSV files
2. Keep these files safe for future import

## Browser Compatibility

This app works best in modern browsers that support:
- HTML5 Drag and Drop API
- CSS Grid and Flexbox
- ES6+ JavaScript
- Web Storage API
- Service Workers (for offline functionality)

## License

This project is open source and available for personal and educational use.