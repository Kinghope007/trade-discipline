// Function to validate login form
function validateLoginForm(email, password) {
    if (!email || !password) {
        alert('Please fill in both email and password.');
        return false;
    }
    return true;
}

// Login button event listener
document.getElementById('login-button').addEventListener('click', async function () {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!validateLoginForm(email, password)) return;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful, token:', data.token);
        localStorage.setItem('token', data.token);

        // Hide login and register forms
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('register-container').style.display = 'none';

        // Show dashboard
        document.getElementById('dashboard-container').style.display = 'block';
    } catch (err) {
        console.error('Login error:', err.message);
        alert('Login error: ' + err.message);
    }
});

// Register button event listener
document.getElementById('register-button').addEventListener('click', async function () {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (!name || !email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        alert('Registration successful. Please login.');

        // After successful registration, switch to login view
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    } catch (err) {
        console.error('Registration error:', err.message);
        alert('Registration error: ' + err.message);
    }
});

// Token handling during requests
async function fetchTrades() {
    const token = localStorage.getItem('token');


    try {
        const response = await fetch('http://localhost:3000/daily/trades', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('Unauthorized access. Please login again.');
                localStorage.removeItem('token');
                window.location.href = 'index.html';
                return;
            }
            throw new Error('Failed to fetch trades');
        }

        const trades = await response.json();
        displayTrades(trades);

    } catch (err) {
        console.error('Error fetching trades:', err.message);
        alert('Error fetching trades: ' + err.message);
    }
}

// Function to display trades on the dashboard
function displayTrades(trades) {
    const tradesList = document.getElementById('trades-list');
    tradesList.innerHTML = ''; // Clear existing content

    trades.forEach(trade => {
        const tradeItem = document.createElement('div');
        tradeItem.className = 'trade-item';

        tradeItem.innerHTML = `
            <p><strong>Strategy:</strong> ${trade.tradingStrategy}</p>
            <p><strong>Plan:</strong> ${trade.tradingPlan}</p>
            <p><strong>Amount Traded:</strong> ${trade.amountTraded}</p>
            <p><strong>Risk Management:</strong> ${trade.riskManagement}</p>
            <p><strong>Entry Point:</strong> ${trade.entryPoint}</p>
            <p><strong>Exit Point:</strong> ${trade.exitPoint}</p>
            <p><strong>Indicators Used:</strong> ${trade.indicatorsUsed.join(', ')}</p>
            <p><strong>Time Frame:</strong> ${trade.timeFrame}</p>
            <p><strong>Trade Date:</strong> ${new Date(trade.tradeDate).toLocaleDateString()}</p>
            <img src="${trade.screenshotUrl}" alt="Trade Screenshot" style="max-width: 100%; display: block; width: 70px; height: 70px;">
        `;
        tradesList.appendChild(tradeItem);
    });
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    document.getElementById('dashboard-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

// Load trades on page load if token exists
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('token')) {
        fetchTrades();
    }
});

// Add new trade event listener
document.getElementById('add-trade-button').addEventListener('click', async function() {
    const token = localStorage.getItem('token'); // Get token from local storage

    const formData = new FormData();
    formData.append('tradingStrategy', document.getElementById('trading-strategy').value);
    formData.append('tradingPlan', document.getElementById('trading-plan').value);
    formData.append('amountTraded', document.getElementById('amount-traded').value);
    formData.append('riskManagement', document.getElementById('risk-management').value);
    formData.append('entryPoint', document.getElementById('entry-point').value);
    formData.append('exitPoint', document.getElementById('exit-point').value);
    formData.append('indicatorsUsed', document.getElementById('indicators-used').value);
    formData.append('timeFrame', document.getElementById('time-frame').value);
    formData.append('tradeDate', document.getElementById('trade-date').value);
    formData.append('screenshot', document.getElementById('screenshotUrl').files[0]); // Attach file

    try {
        const response = await fetch('http://localhost:3000/daily/trades', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData // Send FormData instead of JSON
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Failed to add trade:', error);
            alert('Error adding trade: ' + error);
            return;
        }

        // Fetch trades again to refresh the list
        fetchTrades();

    } catch (err) {
        console.error('Error adding trade:', err.message);
        alert('Error adding trade: ' + err.message);
    }
});
