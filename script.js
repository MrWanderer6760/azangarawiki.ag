let isTestMode = localStorage.getItem('azangara_test_mode') === 'true';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Azangara Wiki loaded. Test mode:', isTestMode);
    
    document.getElementById('englishBtn').addEventListener('click', function() {
        selectLanguage('english');
    });
    
    document.getElementById('russianBtn').addEventListener('click', function() {
        selectLanguage('russian');
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Backquote') { 
            e.preventDefault();
            toggleConsole();
        }
    });
    
    const consoleInput = document.getElementById('consoleInput');
    consoleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processCommand(this.value.trim());
            this.value = '';
        }
    });
    
    const title = document.querySelector('.title');
    setInterval(() => {
        title.style.textShadow = title.style.textShadow === 'none' 
            ? '0 0 10px #00ffff, 0 0 20px #00ffff' 
            : 'none';
    }, 1000);
});

function selectLanguage(language) {
    console.log('Language selected:', language, 'Test mode:', isTestMode);
    
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);

    if (!isTestMode) {
        showDevelopmentMessage(language);
    } else {
        redirectToLanguage(language);
    }
}

function showDevelopmentMessage(language) {
    const message = language === 'english' 
        ? 'The site is under development!' 
        : 'Сайт находится в разработке!';
    
    showPopup(message, '#ff0000');
}

function redirectToLanguage(language) {
    const message = language === 'english' 
        ? 'Redirecting to English version...' 
        : 'Перенаправление на русскую версию...';
    
    showPopup(message, '#00ff00');
    
    setTimeout(() => {
        if (language === 'english') {
            window.location.href = 'en/index.html';
        } else {
            window.location.href = 'ru/index.html';
        }
    }, 1500);
}

function showPopup(message, borderColor) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000080;
        border: 3px solid ${borderColor};
        padding: 30px;
        color: #ffffff;
        font-weight: bold;
        font-size: 1.2em;
        z-index: 1001;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 0 30px ${borderColor}80;
    `;
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 300);
    }, 3000);
}

function toggleConsole() {
    const console = document.getElementById('console');
    if (console.classList.contains('console-hidden')) {
        console.classList.remove('console-hidden');
        document.getElementById('consoleInput').focus();
    } else {
        console.classList.add('console-hidden');
    }
}

function hideConsole() {
    document.getElementById('console').classList.add('console-hidden');
}

function processCommand(command) {
    if (!command) return;

    const output = document.getElementById('consoleOutput');
    addToOutput(`> ${command}`, 'input');

    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case 'ed_enable':
            if (args.length === 2) {
                if (args[1] === '1') {
                    enableTestMode();
                } else if (args[1] === '0') {
                    disableTestMode();
                } else {
                    addToOutput('Error: Use "ed_enable 1" to enable or "ed_enable 0" to disable', 'error');
                }
            } else {
                addToOutput('Error: Usage: ed_enable <0|1>', 'error');
            }
            break;
            
        case 'help':
            addToOutput('Available commands:', 'info');
            addToOutput('ed_enable <0|1> - Enable/disable test mode', 'info');
            addToOutput('status - Show current status', 'info');
            addToOutput('clear - Clear console', 'info');
            break;
            
        case 'status':
            addToOutput(`Test Mode: ${isTestMode ? 'ENABLED' : 'DISABLED'}`, 
                       isTestMode ? 'success' : 'warning');
            addToOutput(`Storage: ${localStorage.getItem('azangara_test_mode')}`, 'info');
            break;
            
        case 'clear':
            output.innerHTML = `
                <div>Azangara Wiki Developer Console v1.0</div>
                <div>Type 'help' for available commands</div>
            `;
            break;
            
        default:
            addToOutput(`Unknown command: ${cmd}`, 'error');
            addToOutput('Type "help" for available commands', 'info');
    }
}

function enableTestMode() {
    isTestMode = true;
    localStorage.setItem('azangara_test_mode', 'true');
    addToOutput('Test mode ENABLED - Language buttons are now active!', 'success');
}

function disableTestMode() {
    isTestMode = false;
    localStorage.setItem('azangara_test_mode', 'false');
    addToOutput('Test mode DISABLED - Language buttons show development message', 'warning');
}

function addToOutput(message, type = 'normal') {
    const output = document.getElementById('consoleOutput');
    const div = document.createElement('div');
    div.textContent = message;
    
    switch (type) {
        case 'success': div.style.color = '#00ff00'; break;
        case 'error': div.style.color = '#ff0000'; break;
        case 'warning': div.style.color = '#ffff00'; break;
        case 'info': div.style.color = '#00ffff'; break;
        case 'input': div.style.color = '#ffffff'; div.style.fontWeight = 'bold'; break;
        default: div.style.color = '#cccccc';
    }
    
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}