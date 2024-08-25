document.getElementById('login-button').addEventListener('click', async function () {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

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
      localStorage.setItem('token', data.token);
      // Hide login and register forms
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('register-container').style.display = 'none';
      // Show dashboard
      document.getElementById('dashboard-container').style.display = 'block';
  } catch (err) {
      console.error(err);
      alert('Login error: ' + err.message);
  }
});

document.getElementById('register-button').addEventListener('click', async function () {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

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
      console.error(err);
      alert('Registration error: ' + err.message);
  }
});

function logout() {
  // Clear token from local storage and redirect to login page
  localStorage.removeItem('token');
  document.getElementById('dashboard-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
}

// Fetch and display trades on page load
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }

        try {
            const response = await fetch('http://localhost:3000/daily/trades', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}` // Ensure the token is sent correctly
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch trades');
            }

            const trades = await response.json();
            const tradesList = document.getElementById('trades-list');

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
                `;
                tradesList.appendChild(tradeItem);
            });
        } catch (err) {
            console.error(err);
            alert('Error fetching trades: ' + err.message);
        }
    }

    fetchTrades();
});

// Add new trade
document.getElementById('add-trade-button').addEventListener('click', async function() {
    const token = localStorage.getItem('token'); // Get token from local storage
    const trade = {
        tradingStrategy: document.getElementById('trading-strategy').value,
        tradingPlan: document.getElementById('trading-plan').value,
        amountTraded: document.getElementById('amount-traded').value,
        riskManagement: document.getElementById('risk-management').value,
        entryPoint: document.getElementById('entry-point').value,
        exitPoint: document.getElementById('exit-point').value,
        indicatorsUsed: document.getElementById('indicators-used').value.split(','),
        timeFrame: document.getElementById('time-frame').value,
        tradeDate: document.getElementById('trade-date').value
    };

    try {
        const response = await fetch('http://localhost:3000/daily/trades', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add 'Bearer' prefix
            },
            body: JSON.stringify(trade)
        });

        if (!response.ok) {
            throw new Error('Failed to add trade');
        }

        // Fetch trades again to refresh the list
        fetchTrades();

    } catch (err) {
        console.error(err);
        alert('Error adding trade: ' + err.message);
    }
});
