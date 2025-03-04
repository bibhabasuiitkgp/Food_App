document.addEventListener('DOMContentLoaded', () => {
    const foodInput = document.getElementById('foodInput');
    const addBtn = document.getElementById('addBtn');
    const foodList = document.getElementById('foodList');
    const summary = document.getElementById('summary');

    // Initialize foods array from localStorage or empty array if nothing stored
    let foods = JSON.parse(localStorage.getItem('foodItems')) || [];

    // Function to update localStorage
    function updateLocalStorage() {
        localStorage.setItem('foodItems', JSON.stringify(foods));
    }

    // Add new food item with timestamp and user info
    function addFood() {
        const foodName = foodInput.value.trim();
        if (foodName) {
            const food = {
                id: Date.now(),
                name: foodName,
                quantity: 1,
                addedBy: 'bibhabasuiitkgp',
                timestamp: new Date().toISOString(),
            };
            foods.push(food);
            updateLocalStorage();
            renderFoodList();
            renderSummary();
            foodInput.value = '';
            foodInput.focus();
        }
    }

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    // Render food list
    function renderFoodList() {
        foodList.innerHTML = '';
        foods.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.innerHTML = `
                <div class="food-info">
                    <span class="food-name">${food.name}</span>
                    <small class="food-meta">Added by ${food.addedBy} on ${formatDate(food.timestamp)}</small>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" onclick="decreaseQuantity(${food.id})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${food.quantity}</span>
                    <button class="quantity-btn increase-btn" onclick="increaseQuantity(${food.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteFood(${food.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            foodList.appendChild(foodItem);
        });
    }

    // Render summary
    function renderSummary() {
        summary.innerHTML = '';
        foods.forEach(food => {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
                <div class="summary-info">
                    <span>${food.name}</span>
                    <small>Added: ${formatDate(food.timestamp)}</small>
                </div>
                <span class="summary-quantity">Quantity: ${food.quantity}</span>
            `;
            summary.appendChild(summaryItem);
        });
    }

    // Event listeners
    addBtn.addEventListener('click', addFood);
    foodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addFood();
        }
    });

    // Make functions available globally
    window.increaseQuantity = (id) => {
        const food = foods.find(f => f.id === id);
        if (food) {
            food.quantity++;
            updateLocalStorage();
            renderFoodList();
            renderSummary();
        }
    };

    window.decreaseQuantity = (id) => {
        const food = foods.find(f => f.id === id);
        if (food && food.quantity > 1) {
            food.quantity--;
            updateLocalStorage();
            renderFoodList();
            renderSummary();
        }
    };

    window.deleteFood = (id) => {
        foods = foods.filter(f => f.id !== id);
        updateLocalStorage();
        renderFoodList();
        renderSummary();
    };

    // Initial render
    renderFoodList();
    renderSummary();
});