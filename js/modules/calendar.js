import {getButton, getInput, getDiv, getP} from './ui.js';
import {getWorkoutHistory, showHistory} from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFrom').setAttribute('max', today);
    document.getElementById('dateTo').setAttribute('max', today);
});

document.getElementById('searchButton').addEventListener('click', () => {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    console.log(dateFrom, dateTo);
    getWorkoutHistory(dateFrom, dateTo);
});