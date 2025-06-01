# Rockstar Bank 🎸

A dynamic, frontend-only simulation of a bank website with basic banking functionalities. This project showcases a modern user interface built with HTML, CSS, and JavaScript.

**Author:** Jeremiah Ayomide
**Email:** ayomidejeremiah99@gmail.com
**Contact:** 09023118327

## 🌟 Features

* **User Registration:** New users can create an account with an initial deposit.
* **User Login:** Registered users can log in to access their accounts.
* **Account Dashboard:** Displays the current user's name and account balance.
* **Deposit Funds:** Users can deposit funds into their account.
* **Withdraw Funds:** Users can withdraw funds, with a check for sufficient balance.
* **Transfer Funds:** Users can transfer funds to other registered users, with checks for recipient existence and sufficient balance.
* **Transaction History:** Displays a list of the user's recent transactions (deposits, withdrawals, transfers).
* **Responsive Design:** The interface is designed to be usable across different screen sizes.
* **Local Storage Persistence:** User data and transactions are persisted in the browser's local storage (for simulation purposes).

## 🛠️ Technologies Used

* **HTML5:** For the structure and content of the web pages.
* **CSS3:** For styling the user interface, including a dark theme with "rockstar" aesthetics.
    * Google Fonts (`Roboto`, `Montserrat`)
* **JavaScript (ES6+):** For all client-side logic, including:
    * DOM manipulation
    * Event handling
    * Simulated user authentication and data management
    * Banking operations logic

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository or download the files:**
    If this were a Git repository, you'd run:
    ```bash
    git clone <repository-url>
    ```
    Otherwise, simply download `index.html`, `style.css`, and `script.js`.

2.  **Place Files:**
    Ensure all three files (`index.html`, `style.css`, `script.js`) are in the same folder.

3.  **Open in Browser:**
    Open the `index.html` file in your preferred web browser (e.g., Chrome, Firefox, Edge).

    ```
    your-project-folder/
    ├── index.html
    ├── style.css
    └── script.js
    ```

4.  **(Optional) Font Awesome Icons:**
    * The project is set up to potentially use Font Awesome for icons. If you have a Font Awesome Kit:
        * Open `index.html`.
        * Find the line: `<script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>`
        * Replace `your-fontawesome-kit.js` with your actual Font Awesome kit ID.
    * If you don't wish to use icons, you can remove this line and the `<i>` tags from the HTML.

## ⚠️ Important Note

This project is a **frontend-only simulation** created for demonstration and learning purposes.

* **No Backend:** There is no server-side logic or database. All data (user accounts, balances, transactions) is stored in the browser's `localStorage` and will be cleared if the browser's cache/storage is cleared or if used in incognito mode without persistence.
* **No Real Security:** Passwords are stored as plain text in `localStorage`. **DO NOT use this for any real banking operations or with sensitive information.**
* **Educational Purposes:** This project demonstrates basic HTML, CSS, and JavaScript interactions for a banking application interface. For a real-world banking application, robust backend systems, databases, and extensive security measures are essential.

## 🤝 Contributing

As this is a conceptual project, contributions are not actively sought. However, feel free to fork it, experiment, and build upon it for your own learning.

## 📜 License

This project is unlicensed and free to use for educational purposes.