let display = document.getElementById('input');
let buttons = document.querySelectorAll('button');
let del = document.getElementById('del');
let d = document.getElementById('d');
let c = document.getElementById('c');
let ac = document.getElementById('ac');
let string = '';
let buttonsArray = Array.from(buttons);

// Add event listener for keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Find the button corresponding to the key pressed
    const button = Array.from(buttons).find(
        (btn) => btn.innerText === key || (btn.id === 'del' && key === 'Backspace') || (btn.id === 'ac' && (key === 'Delete' || key === 'Escape'))
    );

    if (button) {
        // Add hover effect class
        button.classList.add('active');

        // Remove hover effect after a short delay
        setTimeout(() => {
            button.classList.remove('active');
        }, 200);
    }

    if (key === 'Enter' || key === 'Done' || key === 'Go' || key === 'Return') {
        // Handle "Enter" or equivalent keys
        try {
            string = eval(string);
            display.value = string;
        } catch {
            display.value = 'Error';
        }
    } else if (key === 'Backspace') {
        string = string.substring(0, string.length - 1);
        display.value = string;
    } else if (key === 'Delete' || key === 'Escape') {
        string = '';
        display.value = string;
    } else if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        string += key;
        display.value = string;
    }

    // Add vibration on keyboard input
    if (navigator.vibrate) {
        navigator.vibrate(100); // Vibrate for 100ms
    }
});

// Add event listener for button clicks
buttonsArray.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        // Add vibration on button click
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrate for 100ms
        }

        const btnValue = e.target.innerText;

        // Handle "del" button
        if (e.target.id === 'del' || e.target.id === 'd') {
            string = string.substring(0, string.length - 1);
            display.value = string;
        }
        // Handle "ac" button
        else if (e.target.id === 'ac' || e.target.id === 'c') {
            string = '';
            display.value = string;
        }
        // Handle "=" button
        else if (btnValue === '=') {
            try {
                string = eval(string);
                display.value = string;
            } catch {
                display.value = 'Error';
            }
        }
        // Handle numbers and operators
        else if (!isNaN(btnValue) || ['+', '-', '*', '/', '.', '%'].includes(btnValue)) {
            string += btnValue;
            display.value = string;
        }
    });
});
