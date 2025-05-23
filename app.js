// German Language Drill App - Main JavaScript

// Data Storage
const appData = {
    genderWords: [],
    pluralWordsA: [],
    pluralWordsB: [],
    currentExercise: {
        gender: {
            currentWordIndex: 0,
            correctCount: 0,
            totalAttempts: 0
        },
        pluralA: {
            currentWordIndex: 0,
            correctCount: 0,
            totalAttempts: 0
        },
        pluralB: {
            currentWordIndex: 0,
            correctCount: 0,
            totalAttempts: 0
        }
    }
};

// DOM Elements
const elements = {
    // Navigation
    navButtons: document.querySelectorAll('.nav-button'),
    sections: document.querySelectorAll('.section'),
    
    // Tabs
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Gender Word Input
    genderForm: document.getElementById('gender-form'),
    genderWordInput: document.getElementById('gender-word'),
    genderArticleInput: document.getElementById('gender-article'),
    genderWordList: document.getElementById('gender-word-list'),
    clearGenderListBtn: document.getElementById('clear-gender-list'),
    exportGenderListBtn: document.getElementById('export-gender-list'),
    genderCsvUpload: document.getElementById('gender-csv-upload'),
    
    // Plural A Word Input
    pluralAForm: document.getElementById('plural-a-form'),
    pluralASingularInput: document.getElementById('plural-a-singular'),
    pluralAPluralInput: document.getElementById('plural-a-plural'),
    pluralACategoryInput: document.getElementById('plural-a-category'),
    pluralAWordList: document.getElementById('plural-a-word-list'),
    clearPluralAListBtn: document.getElementById('clear-plural-a-list'),
    exportPluralAListBtn: document.getElementById('export-plural-a-list'),
    pluralACsvUpload: document.getElementById('plural-a-csv-upload'),
    
    // Plural B Word Input
    pluralBForm: document.getElementById('plural-b-form'),
    pluralBSingularInput: document.getElementById('plural-b-singular'),
    pluralBPluralInput: document.getElementById('plural-b-plural'),
    pluralBCategoryInput: document.getElementById('plural-b-category'),
    pluralBWordList: document.getElementById('plural-b-word-list'),
    clearPluralBListBtn: document.getElementById('clear-plural-b-list'),
    exportPluralBListBtn: document.getElementById('export-plural-b-list'),
    pluralBCsvUpload: document.getElementById('plural-b-csv-upload'),
    
    // Gender Exercise
    currentGenderWord: document.getElementById('current-gender-word'),
    genderDropZones: document.querySelectorAll('#gender-exercise-section .drop-target'),
    genderFeedback: document.getElementById('gender-feedback'),
    genderFeedbackMessage: document.querySelector('#gender-feedback .feedback-message'),
    genderNextBtn: document.getElementById('gender-next'),
    genderProgress: document.getElementById('gender-progress'),
    genderScore: document.getElementById('gender-score'),
    genderProgressFill: document.getElementById('gender-progress-fill'),
    
    // Plural A Exercise
    currentPluralAWord: document.getElementById('current-plural-a-word'),
    pluralADropZones: document.querySelectorAll('#plural-exercise-a .drop-target'),
    pluralAFeedback: document.getElementById('plural-a-feedback'),
    pluralAFeedbackMessage: document.querySelector('#plural-a-feedback .feedback-message'),
    pluralANextBtn: document.getElementById('plural-a-next'),
    pluralAProgress: document.getElementById('plural-a-progress'),
    pluralAScore: document.getElementById('plural-a-score'),
    pluralAProgressFill: document.getElementById('plural-a-progress-fill'),
    
    // Plural B Exercise
    currentPluralBWord: document.getElementById('current-plural-b-word'),
    pluralBDropZones: document.querySelectorAll('#plural-exercise-b .drop-target'),
    pluralBFeedback: document.getElementById('plural-b-feedback'),
    pluralBFeedbackMessage: document.querySelector('#plural-b-feedback .feedback-message'),
    pluralBNextBtn: document.getElementById('plural-b-next'),
    pluralBProgress: document.getElementById('plural-b-progress'),
    pluralBScore: document.getElementById('plural-b-score'),
    pluralBProgressFill: document.getElementById('plural-b-progress-fill'),
    
    // Reset Data
    resetDataBtn: document.getElementById('reset-data')
};

// Initialize the application
function initApp() {
    // Load data from localStorage
    loadFromLocalStorage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial word lists
    renderWordLists();
    
    // Initialize exercises
    initializeExercises();
}
// Set up all event listeners
function setupEventListeners() {
    // Navigation
    elements.navButtons.forEach(button => {
        button.addEventListener('click', handleNavigation);
    });
    
    // Tabs
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', handleTabSwitch);
    });
    
    // Gender Word Input
    elements.genderForm.addEventListener('submit', handleGenderWordSubmit);
    elements.clearGenderListBtn.addEventListener('click', clearGenderWordList);
    elements.exportGenderListBtn.addEventListener('click', exportGenderWordList);
    elements.genderCsvUpload.addEventListener('change', handleGenderCsvUpload);
    
    // Plural A Word Input
    elements.pluralAForm.addEventListener('submit', handlePluralAWordSubmit);
    elements.clearPluralAListBtn.addEventListener('click', clearPluralAWordList);
    elements.exportPluralAListBtn.addEventListener('click', exportPluralAWordList);
    elements.pluralACsvUpload.addEventListener('change', handlePluralACsvUpload);
    
    // Plural B Word Input
    elements.pluralBForm.addEventListener('submit', handlePluralBWordSubmit);
    elements.clearPluralBListBtn.addEventListener('click', clearPluralBWordList);
    elements.exportPluralBListBtn.addEventListener('click', exportPluralBWordList);
    elements.pluralBCsvUpload.addEventListener('change', handlePluralBCsvUpload);
    
    // Gender Exercise
    elements.currentGenderWord.addEventListener('dragstart', handleDragStart);
    elements.genderDropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleGenderDrop);
    });
    elements.genderNextBtn.addEventListener('click', loadNextGenderWord);
    
    // Plural A Exercise
    elements.currentPluralAWord.addEventListener('dragstart', handleDragStart);
    elements.pluralADropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handlePluralADrop);
    });
    elements.pluralANextBtn.addEventListener('click', loadNextPluralAWord);
    
    // Plural B Exercise
    elements.currentPluralBWord.addEventListener('dragstart', handleDragStart);
    elements.pluralBDropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handlePluralBDrop);
    });
    elements.pluralBNextBtn.addEventListener('click', loadNextPluralBWord);
    
    // Reset Data
    elements.resetDataBtn.addEventListener('click', confirmResetData);
}

// Navigation between sections
function handleNavigation(event) {
    const targetId = event.target.id.replace('nav-', '');
    
    // Update active nav button
    elements.navButtons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show target section, hide others
    elements.sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Map the targetId to the correct section ID
    let sectionId;
    if (targetId === 'input') {
        sectionId = 'word-input-section';
    } else if (targetId === 'gender') {
        sectionId = 'gender-exercise-section';
    } else if (targetId === 'plural') {
        sectionId = 'plural-exercise-section';
    }
    
    document.getElementById(sectionId).classList.add('active');
    
    // Initialize exercise if navigating to an exercise section
    if (targetId === 'gender') {
        if (appData.genderWords.length > 0) {
            loadNextGenderWord();
        } else {
            elements.currentGenderWord.textContent = 'No words available';
            elements.genderFeedbackMessage.textContent = 'Please add words in the Word Lists section';
        }
    } else if (targetId === 'plural') {
        const activeTab = document.querySelector('#plural-exercise-section .tab-content.active');
        if (activeTab.id === 'plural-exercise-a') {
            if (appData.pluralWordsA.length > 0) {
                loadNextPluralAWord();
            } else {
                elements.currentPluralAWord.textContent = 'No words available';
                elements.pluralAFeedbackMessage.textContent = 'Please add words in the Word Lists section';
            }
        } else {
            if (appData.pluralWordsB.length > 0) {
                loadNextPluralBWord();
            } else {
                elements.currentPluralBWord.textContent = 'No words available';
                elements.pluralBFeedbackMessage.textContent = 'Please add words in the Word Lists section';
            }
        }
    }
}

// Tab switching
function handleTabSwitch(event) {
    const tabGroup = event.target.closest('.tabs');
    const targetTab = event.target.dataset.tab;
    
    // Update active tab button
    tabGroup.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show target tab content, hide others
    const tabContents = tabGroup.parentElement.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(targetTab).classList.add('active');
    
    // Initialize exercise if switching to a plural exercise tab
    if (targetTab === 'plural-exercise-a') {
        if (appData.pluralWordsA.length > 0) {
            loadNextPluralAWord();
        } else {
            elements.currentPluralAWord.textContent = 'No words available';
            elements.pluralAFeedbackMessage.textContent = 'Please add words in the Word Lists section';
        }
    } else if (targetTab === 'plural-exercise-b') {
        if (appData.pluralWordsB.length > 0) {
            loadNextPluralBWord();
        } else {
            elements.currentPluralBWord.textContent = 'No words available';
            elements.pluralBFeedbackMessage.textContent = 'Please add words in the Word Lists section';
        }
    }
}
// Gender Word Input
function handleGenderWordSubmit(event) {
    event.preventDefault();
    
    const word = elements.genderWordInput.value.trim();
    const gender = elements.genderArticleInput.value;
    
    if (word) {
        addGenderWord(word, gender);
        elements.genderWordInput.value = '';
        elements.genderWordInput.focus();
    }
}

function addGenderWord(word, gender) {
    appData.genderWords.push({ word, gender });
    saveToLocalStorage();
    renderGenderWordList();
}

function renderGenderWordList() {
    elements.genderWordList.innerHTML = '';
    
    appData.genderWords.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.gender} ${item.word}</span>
            <button type="button" data-index="${index}">×</button>
        `;
        
        li.querySelector('button').addEventListener('click', () => {
            appData.genderWords.splice(index, 1);
            saveToLocalStorage();
            renderGenderWordList();
        });
        
        elements.genderWordList.appendChild(li);
    });
}

function clearGenderWordList() {
    if (confirm('Are you sure you want to clear all gender words?')) {
        appData.genderWords = [];
        saveToLocalStorage();
        renderGenderWordList();
    }
}

function exportGenderWordList() {
    const csvContent = appData.genderWords.map(item => `${item.word},${item.gender}`).join('\n');
    downloadCSV(csvContent, 'gender-words.csv');
}

function handleGenderCsvUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const lines = content.split('\n');
            
            lines.forEach(line => {
                const [word, gender] = line.split(',').map(item => item.trim());
                if (word && gender && ['der', 'die', 'das'].includes(gender)) {
                    addGenderWord(word, gender);
                }
            });
        };
        reader.readAsText(file);
        event.target.value = '';
    }
}

// Plural A Word Input
function handlePluralAWordSubmit(event) {
    event.preventDefault();
    
    const singular = elements.pluralASingularInput.value.trim();
    const plural = elements.pluralAPluralInput.value.trim();
    const category = elements.pluralACategoryInput.value;
    
    if (singular && plural) {
        addPluralAWord(singular, plural, category);
        elements.pluralASingularInput.value = '';
        elements.pluralAPluralInput.value = '';
        elements.pluralASingularInput.focus();
    }
}

function addPluralAWord(singular, plural, category) {
    appData.pluralWordsA.push({ singular, plural, category });
    saveToLocalStorage();
    renderPluralAWordList();
}

function renderPluralAWordList() {
    elements.pluralAWordList.innerHTML = '';
    
    appData.pluralWordsA.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.singular} → ${item.plural} (${getCategoryLabel(item.category)})</span>
            <button type="button" data-index="${index}">×</button>
        `;
        
        li.querySelector('button').addEventListener('click', () => {
            appData.pluralWordsA.splice(index, 1);
            saveToLocalStorage();
            renderPluralAWordList();
        });
        
        elements.pluralAWordList.appendChild(li);
    });
}

function clearPluralAWordList() {
    if (confirm('Are you sure you want to clear all plural Group A words?')) {
        appData.pluralWordsA = [];
        saveToLocalStorage();
        renderPluralAWordList();
    }
}

function exportPluralAWordList() {
    const csvContent = appData.pluralWordsA.map(item => `${item.singular},${item.plural},${item.category}`).join('\n');
    downloadCSV(csvContent, 'plural-words-a.csv');
}

function handlePluralACsvUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const lines = content.split('\n');
            
            lines.forEach(line => {
                const [singular, plural, category] = line.split(',').map(item => item.trim());
                if (singular && plural && ['no-change', 'add-e', 'add-s'].includes(category)) {
                    addPluralAWord(singular, plural, category);
                }
            });
        };
        reader.readAsText(file);
        event.target.value = '';
    }
}

// Plural B Word Input
function handlePluralBWordSubmit(event) {
    event.preventDefault();
    
    const singular = elements.pluralBSingularInput.value.trim();
    const plural = elements.pluralBPluralInput.value.trim();
    const category = elements.pluralBCategoryInput.value;
    
    if (singular && plural) {
        addPluralBWord(singular, plural, category);
        elements.pluralBSingularInput.value = '';
        elements.pluralBPluralInput.value = '';
        elements.pluralBSingularInput.focus();
    }
}

function addPluralBWord(singular, plural, category) {
    appData.pluralWordsB.push({ singular, plural, category });
    saveToLocalStorage();
    renderPluralBWordList();
}

function renderPluralBWordList() {
    elements.pluralBWordList.innerHTML = '';
    
    appData.pluralWordsB.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.singular} → ${item.plural} (${getCategoryLabel(item.category)})</span>
            <button type="button" data-index="${index}">×</button>
        `;
        
        li.querySelector('button').addEventListener('click', () => {
            appData.pluralWordsB.splice(index, 1);
            saveToLocalStorage();
            renderPluralBWordList();
        });
        
        elements.pluralBWordList.appendChild(li);
    });
}

function clearPluralBWordList() {
    if (confirm('Are you sure you want to clear all plural Group B words?')) {
        appData.pluralWordsB = [];
        saveToLocalStorage();
        renderPluralBWordList();
    }
}

function exportPluralBWordList() {
    const csvContent = appData.pluralWordsB.map(item => `${item.singular},${item.plural},${item.category}`).join('\n');
    downloadCSV(csvContent, 'plural-words-b.csv');
}

function handlePluralBCsvUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const lines = content.split('\n');
            
            lines.forEach(line => {
                const [singular, plural, category] = line.split(',').map(item => item.trim());
                if (singular && plural && ['add-e-umlaut', 'add-er-umlaut', 'add-en'].includes(category)) {
                    addPluralBWord(singular, plural, category);
                }
            });
        };
        reader.readAsText(file);
        event.target.value = '';
    }
}

// Helper function to get human-readable category labels
function getCategoryLabel(category) {
    const labels = {
        'no-change': 'No Change',
        'add-e': 'Add -e',
        'add-s': 'Add -s',
        'add-e-umlaut': 'Add -e + umlaut',
        'add-er-umlaut': 'Add -er + umlaut',
        'add-en': 'Add -(e)n'
    };
    
    return labels[category] || category;
}
// Drag and Drop Functionality
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
    
    setTimeout(() => {
        event.target.classList.add('dragging');
    }, 0);
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.target.classList.remove('drag-over');
}

// Gender Exercise
function initializeExercises() {
    // Shuffle word arrays
    shuffleArray(appData.genderWords);
    shuffleArray(appData.pluralWordsA);
    shuffleArray(appData.pluralWordsB);
    
    // Reset exercise state
    appData.currentExercise.gender.currentWordIndex = 0;
    appData.currentExercise.gender.correctCount = 0;
    appData.currentExercise.gender.totalAttempts = 0;
    
    appData.currentExercise.pluralA.currentWordIndex = 0;
    appData.currentExercise.pluralA.correctCount = 0;
    appData.currentExercise.pluralA.totalAttempts = 0;
    
    appData.currentExercise.pluralB.currentWordIndex = 0;
    appData.currentExercise.pluralB.correctCount = 0;
    appData.currentExercise.pluralB.totalAttempts = 0;
    
    saveToLocalStorage();
}

function loadNextGenderWord() {
    // Reset UI
    elements.genderDropZones.forEach(zone => {
        zone.classList.remove('correct', 'incorrect', 'drag-over');
    });
    elements.genderFeedbackMessage.textContent = '';
    elements.genderFeedbackMessage.classList.remove('correct', 'incorrect');
    elements.genderNextBtn.style.display = 'none';
    
    // Check if we have words
    if (appData.genderWords.length === 0) {
        elements.currentGenderWord.textContent = 'No words available';
        elements.genderFeedbackMessage.textContent = 'Please add words in the Word Lists section';
        return;
    }
    
    // Check if we've gone through all words
    if (appData.currentExercise.gender.currentWordIndex >= appData.genderWords.length) {
        // Reshuffle and start over
        shuffleArray(appData.genderWords);
        appData.currentExercise.gender.currentWordIndex = 0;
    }
    
    // Get current word
    const currentWord = appData.genderWords[appData.currentExercise.gender.currentWordIndex];
    
    // Display word (without article)
    elements.currentGenderWord.textContent = currentWord.word.toUpperCase();
    elements.currentGenderWord.dataset.gender = currentWord.gender;
    
    // Update progress
    updateGenderProgress();
}

function handleGenderDrop(event) {
    event.preventDefault();
    
    // Remove drag-over class
    event.target.classList.remove('drag-over');
    
    // Get dropped element
    const draggedElementId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    
    // Get correct gender from data attribute
    const correctGender = draggedElement.dataset.gender;
    
    // Get selected gender from drop zone
    const selectedGender = event.target.parentElement.dataset.gender;
    
    // Check if correct
    const isCorrect = correctGender === selectedGender;
    
    // Update UI
    event.target.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.genderFeedbackMessage.textContent = isCorrect 
        ? 'Correct! 👍' 
        : `Incorrect. The correct answer is "${correctGender}".`;
    elements.genderFeedbackMessage.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.genderNextBtn.style.display = 'inline-block';
    
    // Update stats
    appData.currentExercise.gender.totalAttempts++;
    if (isCorrect) {
        appData.currentExercise.gender.correctCount++;
    }
    
    // Move to next word
    appData.currentExercise.gender.currentWordIndex++;
    
    // Save progress
    saveToLocalStorage();
    
    // Update progress display
    updateGenderProgress();
}

function updateGenderProgress() {
    const total = appData.genderWords.length;
    const current = Math.min(appData.currentExercise.gender.currentWordIndex + 1, total);
    const score = appData.currentExercise.gender.correctCount;
    const attempts = appData.currentExercise.gender.totalAttempts;
    const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
    
    elements.genderProgress.textContent = `${current}/${total}`;
    elements.genderScore.textContent = `Score: ${score}/${attempts} (${percentage}%)`;
    elements.genderProgressFill.style.width = `${(current / total) * 100}%`;
}

// Plural A Exercise
function loadNextPluralAWord() {
    // Reset UI
    elements.pluralADropZones.forEach(zone => {
        zone.classList.remove('correct', 'incorrect', 'drag-over');
    });
    elements.pluralAFeedbackMessage.textContent = '';
    elements.pluralAFeedbackMessage.classList.remove('correct', 'incorrect');
    elements.pluralANextBtn.style.display = 'none';
    
    // Check if we have words
    if (appData.pluralWordsA.length === 0) {
        elements.currentPluralAWord.textContent = 'No words available';
        elements.pluralAFeedbackMessage.textContent = 'Please add words in the Word Lists section';
        return;
    }
    
    // Check if we've gone through all words
    if (appData.currentExercise.pluralA.currentWordIndex >= appData.pluralWordsA.length) {
        // Reshuffle and start over
        shuffleArray(appData.pluralWordsA);
        appData.currentExercise.pluralA.currentWordIndex = 0;
    }
    
    // Get current word
    const currentWord = appData.pluralWordsA[appData.currentExercise.pluralA.currentWordIndex];
    
    // Display word
    elements.currentPluralAWord.textContent = currentWord.singular.toUpperCase();
    elements.currentPluralAWord.dataset.category = currentWord.category;
    
    // Update progress
    updatePluralAProgress();
}

function handlePluralADrop(event) {
    event.preventDefault();
    
    // Remove drag-over class
    event.target.classList.remove('drag-over');
    
    // Get dropped element
    const draggedElementId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    
    // Get correct category from data attribute
    const correctCategory = draggedElement.dataset.category;
    
    // Get selected category from drop zone
    const selectedCategory = event.target.parentElement.dataset.category;
    
    // Check if correct
    const isCorrect = correctCategory === selectedCategory;
    
    // Update UI
    event.target.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.pluralAFeedbackMessage.textContent = isCorrect 
        ? 'Correct! 👍' 
        : `Incorrect. The correct answer is "${getCategoryLabel(correctCategory)}".`;
    elements.pluralAFeedbackMessage.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.pluralANextBtn.style.display = 'inline-block';
    
    // Update stats
    appData.currentExercise.pluralA.totalAttempts++;
    if (isCorrect) {
        appData.currentExercise.pluralA.correctCount++;
    }
    
    // Move to next word
    appData.currentExercise.pluralA.currentWordIndex++;
    
    // Save progress
    saveToLocalStorage();
    
    // Update progress display
    updatePluralAProgress();
}

function updatePluralAProgress() {
    const total = appData.pluralWordsA.length;
    const current = Math.min(appData.currentExercise.pluralA.currentWordIndex + 1, total);
    const score = appData.currentExercise.pluralA.correctCount;
    const attempts = appData.currentExercise.pluralA.totalAttempts;
    const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
    
    elements.pluralAProgress.textContent = `${current}/${total}`;
    elements.pluralAScore.textContent = `Score: ${score}/${attempts} (${percentage}%)`;
    elements.pluralAProgressFill.style.width = `${(current / total) * 100}%`;
}

// Plural B Exercise
function loadNextPluralBWord() {
    // Reset UI
    elements.pluralBDropZones.forEach(zone => {
        zone.classList.remove('correct', 'incorrect', 'drag-over');
    });
    elements.pluralBFeedbackMessage.textContent = '';
    elements.pluralBFeedbackMessage.classList.remove('correct', 'incorrect');
    elements.pluralBNextBtn.style.display = 'none';
    
    // Check if we have words
    if (appData.pluralWordsB.length === 0) {
        elements.currentPluralBWord.textContent = 'No words available';
        elements.pluralBFeedbackMessage.textContent = 'Please add words in the Word Lists section';
        return;
    }
    
    // Check if we've gone through all words
    if (appData.currentExercise.pluralB.currentWordIndex >= appData.pluralWordsB.length) {
        // Reshuffle and start over
        shuffleArray(appData.pluralWordsB);
        appData.currentExercise.pluralB.currentWordIndex = 0;
    }
    
    // Get current word
    const currentWord = appData.pluralWordsB[appData.currentExercise.pluralB.currentWordIndex];
    
    // Display word
    elements.currentPluralBWord.textContent = currentWord.singular.toUpperCase();
    elements.currentPluralBWord.dataset.category = currentWord.category;
    
    // Update progress
    updatePluralBProgress();
}

function handlePluralBDrop(event) {
    event.preventDefault();
    
    // Remove drag-over class
    event.target.classList.remove('drag-over');
    
    // Get dropped element
    const draggedElementId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    
    // Get correct category from data attribute
    const correctCategory = draggedElement.dataset.category;
    
    // Get selected category from drop zone
    const selectedCategory = event.target.parentElement.dataset.category;
    
    // Check if correct
    const isCorrect = correctCategory === selectedCategory;
    
    // Update UI
    event.target.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.pluralBFeedbackMessage.textContent = isCorrect 
        ? 'Correct! 👍' 
        : `Incorrect. The correct answer is "${getCategoryLabel(correctCategory)}".`;
    elements.pluralBFeedbackMessage.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.pluralBNextBtn.style.display = 'inline-block';
    
    // Update stats
    appData.currentExercise.pluralB.totalAttempts++;
    if (isCorrect) {
        appData.currentExercise.pluralB.correctCount++;
    }
    
    // Move to next word
    appData.currentExercise.pluralB.currentWordIndex++;
    
    // Save progress
    saveToLocalStorage();
    
    // Update progress display
    updatePluralBProgress();
}

function updatePluralBProgress() {
    const total = appData.pluralWordsB.length;
    const current = Math.min(appData.currentExercise.pluralB.currentWordIndex + 1, total);
    const score = appData.currentExercise.pluralB.correctCount;
    const attempts = appData.currentExercise.pluralB.totalAttempts;
    const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
    
    elements.pluralBProgress.textContent = `${current}/${total}`;
    elements.pluralBScore.textContent = `Score: ${score}/${attempts} (${percentage}%)`;
    elements.pluralBProgressFill.style.width = `${(current / total) * 100}%`;
}
// Local Storage Functions
function saveToLocalStorage() {
    try {
        localStorage.setItem('germanDrillData', JSON.stringify(appData));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('germanDrillData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            
            // Update appData with saved data
            appData.genderWords = parsedData.genderWords || [];
            appData.pluralWordsA = parsedData.pluralWordsA || [];
            appData.pluralWordsB = parsedData.pluralWordsB || [];
            
            if (parsedData.currentExercise) {
                appData.currentExercise = parsedData.currentExercise;
            }
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

// Helper Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create download link
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderWordLists() {
    renderGenderWordList();
    renderPluralAWordList();
    renderPluralBWordList();
}

function confirmResetData() {
    if (confirm('Are you sure you want to reset all data? This will clear all word lists and progress.')) {
        localStorage.removeItem('germanDrillData');
        location.reload();
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);