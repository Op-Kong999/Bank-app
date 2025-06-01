document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const allSections = [loginSection, registerSection, dashboardSection];

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    const welcomeMessage = document.getElementById('welcomeMessage');
    const loggedInUserSpan = document.getElementById('loggedInUser');
    const balanceSpan = document.getElementById('balance');

    const depositForm = document.getElementById('depositForm');
    const withdrawForm = document.getElementById('withdrawForm');
    const transferForm = document.getElementById('transferForm');

    const transactionList = document.getElementById('transactionList');
     // --- Application State (Simulated Database) ---
    let users = JSON.parse(localStorage.getItem('rockstarUsers')) || {};
    /*
    users = {
        "username1": {
            password: "password123",
            balance: 1000,
            transactions: [
                { type: "deposit", amount: 1000, date: "...", details: "Initial deposit" }
            ]
        },
        ...
    }
    */
    let currentUser = null;

    // --- Utility Functions ---
    function saveUsers() {
        localStorage.setItem('rockstarUsers', JSON.stringify(users));
    }

    function updateUI() {
        if (currentUser && users[currentUser]) {
            loggedInUserSpan.textContent = currentUser;
            balanceSpan.textContent = users[currentUser].balance.toFixed(2);
            renderTransactions();
            showSection(dashboardSection);
            logoutBtn.style.display = 'inline-block';
        } else {
            showSection(loginSection);
            logoutBtn.style.display = 'none';
        }
    }

    function showSection(sectionToShow) {
        allSections.forEach(section => {
            if (section === sectionToShow) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });
    }

    function addTransaction(username, type, amount, details) {
        if (!users[username]) return;
        const transaction = {
            type,
            amount,
            date: new Date().toLocaleString(),
            details
        };
        users[username].transactions.unshift(transaction); // Add to the beginning
        if (users[username].transactions.length > 20) { // Keep last 20 transactions
            users[username].transactions.pop();
        }
        saveUsers();
    }

    function renderTransactions() {
        transactionList.innerHTML = ''; // Clear existing list
        if (currentUser && users[currentUser] && users[currentUser].transactions) {
            users[currentUser].transactions.forEach(tx => {
                const li = document.createElement('li');
                li.classList.add(tx.type.toLowerCase().replace(' ', '-')); // e.g., transfer-out

                const typeSpan = document.createElement('span');
                typeSpan.classList.add('transaction-type');
                typeSpan.textContent = tx.type.charAt(0).toUpperCase() + tx.type.slice(1);

                const amountSpan = document.createElement('span');
                amountSpan.classList.add('transaction-amount');
                amountSpan.textContent = `${tx.type.includes('out') || tx.type === 'withdrawal' ? '-' : '+'} $${tx.amount.toFixed(2)}`;
                if (tx.type.includes('out') || tx.type === 'withdrawal') {
                    amountSpan.style.color = '#cf6679';
                } else {
                    amountSpan.style.color = '#03dac6';
                }


                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('transaction-details');
                detailsDiv.innerHTML = `<span>${tx.details}</span><br><small>${tx.date}</small>`;

                li.appendChild(typeSpan);
                li.appendChild(detailsDiv); // Details in middle
                li.appendChild(amountSpan); // Amount on the right
                transactionList.appendChild(li);
            });
        }
    }

    // --- Event Listeners ---

    // Navigation between Login and Register
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.reset();
        showSection(registerSection);
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.reset();
        showSection(loginSection);
    });

    // Registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value.trim();
        const newPassword = document.getElementById('newPassword').value;
        const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);

        if (users[newUsername]) {
            alert('Username already exists. Please choose another.');
            return;
        }
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        if (isNaN(initialDeposit) || initialDeposit < 0) {
            alert('Invalid initial deposit amount.');
            return;
        }

        users[newUsername] = {
            password: newPassword, // In a real app, HASH THIS PASSWORD!
            balance: initialDeposit,
            transactions: []
        };
        addTransaction(newUsername, 'deposit', initialDeposit, 'Initial account deposit');
        saveUsers();
        alert('Registration successful! Please log in.');
        registerForm.reset();
        showSection(loginSection);
    });

    // Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (users[username] && users[username].password === password) {
            currentUser = username;
            updateUI();
            loginForm.reset();
        } else {
            alert('Invalid username or password.');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        updateUI();
    });

    // Deposit
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('depositAmount').value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid deposit amount.');
            return;
        }
        users[currentUser].balance += amount;
        addTransaction(currentUser, 'deposit', amount, 'Funds deposited');
        updateUI();
        depositForm.reset();
        alert(`$${amount.toFixed(2)} deposited successfully!`);
    });

    // Withdraw
    withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('withdrawAmount').value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid withdrawal amount.');
            return;
        }
        if (amount > users[currentUser].balance) {
            alert('Insufficient funds.');
            return;
        }
        users[currentUser].balance -= amount;
        addTransaction(currentUser, 'withdrawal', amount, 'Funds withdrawn');
        updateUI();
        withdrawForm.reset();
        alert(`$${amount.toFixed(2)} withdrawn successfully!`);
    });

    // Transfer
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('transferAmount').value);
        const recipient = document.getElementById('recipientAccount').value.trim();

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid transfer amount.');
            return;
        }
        if (!recipient) {
            alert('Please enter a recipient username.');
            return;
        }
        if (recipient === currentUser) {
            alert('You cannot transfer funds to yourself.');
            return;
        }
        if (!users[recipient]) {
            alert('Recipient account does not exist.');
            return;
        }
        if (amount > users[currentUser].balance) {
            alert('Insufficient funds for this transfer.');
            return;
        }

        // Perform transfer
        users[currentUser].balance -= amount;
        users[recipient].balance += amount;

        addTransaction(currentUser, 'transfer out', amount, `To ${recipient}`);
        addTransaction(recipient, 'transfer in', amount, `From ${currentUser}`);

        updateUI(); // Update for current user
        transferForm.reset();
        alert(`$${amount.toFixed(2)} transferred successfully to ${recipient}!`);
    });


    // --- Initial Page Load ---
    // Check if a user was logged in previously (very basic persistence)
    // For a real app, use tokens and more secure session management
    const lastUser = localStorage.getItem('lastRockstarUser');
    if (lastUser && users[lastUser]) {
        currentUser = lastUser;
    }
    updateUI();
    // Default to login section if no user
    if (!currentUser) {
        showSection(loginSection);
        logoutBtn.style.display = 'none';
    } else {
        logoutBtn.style.display = 'inline-block';
    }

});