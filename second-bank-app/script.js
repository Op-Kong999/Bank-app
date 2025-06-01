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