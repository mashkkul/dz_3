// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts;
    if (filter === 'passed') {
        return attempts.filter(item => item.passed);
    }
    if (filter === 'failed') {
        return attempts.filter(item => !item.passed);
    }
    return attempts;
}


function renderAttempts(attempts) {
  let html = '';
    const questionCount = window.reportData.questionCount;
    attempts.forEach(item => {
        html += `<li class="result-item"><span class="result-name">${escapeHtml(item.name)}</span> - ${item.score} из ${questionCount} (${item.percentage}%)</li>`;
    });
    return html;
}


function startFilter() {
  const form = document.querySelector('#filter-form');
    const select = document.querySelector('#filter');
    const countElement = document.querySelector('#result-count');
    const listElement = document.querySelector('#result-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const filterValue = select.value;
        const filteredAttempts = selectAttempts(filterValue);
        
        countElement.textContent = `Показано: ${filteredAttempts.length} из ${window.reportData.attempts.length}`;
        listElement.innerHTML = renderAttempts(filteredAttempts);
    });
}

startFilter();

