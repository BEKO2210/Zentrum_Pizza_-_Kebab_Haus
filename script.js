document.addEventListener('DOMContentLoaded', function() {
    // Menu tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-items');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and hide all menu items
            tabBtns.forEach(b => b.classList.remove('active'));
            menuItems.forEach(item => item.classList.add('hidden'));
            
            // Add active class to clicked button and show corresponding menu items
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            document.getElementById(category).classList.remove('hidden');
        });
    });

    // Modal functionality
    const modal = document.getElementById('addItemModal');
    const addItemBtn = document.getElementById('addItem');
    const closeBtn = document.querySelector('.close');

    addItemBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Add click event to all menu items to open modal
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.closest('.menu-items').id;
            const itemName = this.querySelector('h3').textContent;
            const price = parseFloat(this.querySelector('.item-price').textContent);
            
            // Set the modal form values
            document.getElementById('itemCategory').value = category;
            
            // Trigger change event to load the item names
            const event = new Event('change');
            document.getElementById('itemCategory').dispatchEvent(event);
            
            // Set the selected item
            setTimeout(() => {
                const itemNameSelect = document.getElementById('itemName');
                for (let i = 0; i < itemNameSelect.options.length; i++) {
                    if (itemNameSelect.options[i].text.startsWith(itemName)) {
                        itemNameSelect.selectedIndex = i;
                        
                        // If it's a Seele item, prepare to display custom extras
                        if (category === 'seele') {
                            // Trigger a change event on itemName to load custom extras
                            const nameChangeEvent = new Event('change');
                            itemNameSelect.dispatchEvent(nameChangeEvent);
                        }
                        
                        break;
                    }
                }
            }, 10);
            
            openModal();
        });
    });

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.getElementById('addItemForm').reset();
        document.getElementById('itemName').disabled = true;
        document.getElementById('itemName').innerHTML = '<option value="">Bitte zuerst Kategorie wählen</option>';
        
        // Clear any custom extras
        const customExtrasContainer = document.getElementById('customExtrasContainer');
        if (customExtrasContainer) {
            customExtrasContainer.innerHTML = '';
            customExtrasContainer.style.display = 'none';
        }
    }

    // Dynamic menu items based on category selection
    const itemCategory = document.getElementById('itemCategory');
    const itemName = document.getElementById('itemName');
    const extraOptionsContainer = document.getElementById('extraOptionsContainer');

    // Menu items by category
    const menuData = {
        pizza: [
            { name: 'Pizzabrot', price: 6.00 },
            { name: 'Margherita', price: 7.00 },
            { name: 'Salami', price: 8.00 },
            { name: 'Schinken', price: 8.00 },
            { name: 'Funghi', price: 8.00 },
            { name: 'Broccoli', price: 8.00 },
            { name: 'Prosciutto mit Salami und Schinken', price: 9.00 },
            { name: 'Sucuk', price: 8.00 },
            { name: 'Hackfleisch', price: 8.00 },
            { name: 'Hähnchendrehspieß', price: 9.00 },
            { name: 'Hawaii mit Schinken und Ananas', price: 9.00 },
            { name: 'Artischocken', price: 8.00 },
            { name: 'Zentrum: Salami, Schinken und Pilze', price: 9.00 },
            { name: 'Thunfisch', price: 9.00 },
            { name: 'Thunfisch-Zwiebel', price: 9.00 },
            { name: 'Gamfort mit Salami, Schinken, Papanero, Paprika, Versuchmischung', price: 10.00 },
            { name: 'Champignons', price: 8.00 },
            { name: 'Meeresfrüchte', price: 9.00 },
            { name: 'Vegetarisch mit Spinat, Paprika, Oliven, Pilze und Peperoni', price: 10.00 },
            { name: 'Vier Käse mit Edamer, Mozzarella, Weichkäse und Gorgonzola', price: 10.00 }
        ],
        kebab: [
            { name: 'Döner im Brot', price: 6.50 },
            { name: 'Dürüm Döner', price: 7.50 },
            { name: 'Dönerteller', price: 11.00 },
            { name: 'Dönerbox', price: 7.00 },
            { name: 'Lahmacun', price: 5.00 },
            { name: 'Lahmacun mit Salat', price: 6.00 },
            { name: 'Lahmacun mit Dönerfleisch', price: 7.50 },
            { name: 'Lahmacun mit Salat und Dönerfleisch', price: 8.00 },
            { name: 'Köfte im Brot', price: 6.50 },
            { name: 'Dürüm Köfte', price: 7.50 },
            { name: 'Köfteteller', price: 11.00 },
            { name: 'Pommes', price: 3.50 },
            { name: 'Pommes mit Dönerfleisch', price: 6.50 },
            { name: 'Currywurst mit Pommes', price: 6.50 },
            { name: 'Portion Reis', price: 3.50 },
            { name: 'Portion Dönerfleisch', price: 5.00 },
            { name: 'Portion Knoblauchsoße', price: 1.00 },
            { name: 'Beilagensalat', price: 4.00 },
            { name: 'Tzatziki', price: 3.50 },
            { name: 'Cacık', price: 3.50 },
            { name: 'Falafel (6 Stück)', price: 4.50 },
            { name: 'Halloumi', price: 5.00 }
        ],
        salate: [
            { name: 'Gemischter Salat', price: 5.50 },
            { name: 'Gemischter Salat mit Weichkäse und Oliven', price: 6.50 },
            { name: 'Thunfischsalat', price: 7.00 }
        ],
        chicken: [
            { name: 'Pommes', price: 4.50 },
            { name: 'Chicken Nuggets 5 Stück Box mit Pommes/Salat/Reis', price: 7.00 },
            { name: 'Chicken Nuggets Teller mit Pommes/Salat/Reis mit zwei Beilagen', price: 11.00 },
            { name: 'Chicken Nuggets 6 Stück', price: 4.50 },
            { name: 'Chicken Nuggets 12 Stück', price: 8.00 }
        ],
        vegetarisch: [
            { name: 'Fladenbrot mit Salat und Weichkäse', price: 6.00 },
            { name: 'Yufka mit Salat und Weichkäse', price: 7.00 },
            { name: 'Reisbox mit Soße', price: 5.00 },
            { name: 'Falafelteller mit Salat', price: 7.00 },
            { name: 'Halloumi Yufka mit Salat', price: 8.00 },
            { name: 'Halloumi Box mit Salat/Pommes/Reis', price: 7.00 },
            { name: 'Halloumi Teller mit Salat und Pommes/Reis', price: 11.00 },
            { name: 'Halloumi 6 Stück', price: 4.50 },
            { name: 'Halloumi 12 Stück', price: 8.00 },
            { name: 'Falafel Brot mit Salat', price: 7.00 },
            { name: 'Falafel Yufka mit Salat', price: 8.00 },
            { name: 'Falafel Box mit Salat/Pommes/Reis', price: 7.00 },
            { name: 'Falafel Teller mit Salat und Pommes/Reis', price: 11.00 },
            { name: 'Falafel 6 Stück', price: 4.50 },
            { name: 'Falafel 12 Stück', price: 8.00 }
        ],
        lahmacun: [
            { name: 'Lahmacun', price: 6.00 },
            { name: 'Lahmacun mit Salat', price: 6.50 },
            { name: 'Lahmacun mit Fleisch und Salat', price: 8.00 },
            { name: 'Lahmacun Teller mit Fleisch und Salat', price: 11.00 }
        ],
        schülerangebote: [
            { name: 'Box mit einer Beilage Pommes/Reis/Salat', price: 6.00 },
            { name: 'Yufka', price: 7.00 },
            { name: 'Fladenbrot (Döner)', price: 6.00 },
            { name: 'Schülerpizza mit einer Zutat', price: 5.00 },
            { name: 'Pommes', price: 4.00 }
        ],
        pide: [
            { name: 'Pide mit Weichkäse', price: 8.00 },
            { name: 'Pide mit Hackfleisch', price: 8.00 },
            { name: 'Pide mit Hackfleisch und Weichkäse', price: 8.50 },
            { name: 'Pide mit Kebap', price: 9.00 },
            { name: 'Pide mit Sucuk', price: 9.00 },
            { name: 'Pide mit Spinat und Weichkäse', price: 8.00 },
            { name: 'Pide mit Spinat, Weichkäse und Ei', price: 8.50 },
            { name: 'Pide mit Sucuk und Ei', price: 8.50 },
            { name: 'Vegetarisch mit Spinat, Käse, Paprika, Pilz, Ei', price: 10.00 }
        ],
        beilagen: [
            { name: 'Pommes', price: 3.50 },
            { name: 'Reis', price: 3.50 },
            { name: 'Beilagensalat', price: 4.00 },
            { name: 'Tzatziki', price: 3.50 },
            { name: 'Cacık', price: 3.50 },
            { name: 'Falafel (6 Stück)', price: 4.50 },
            { name: 'Halloumi', price: 5.00 }
        ],
        seele: [
            { name: 'Seele mit Weichkäse', price: 8.50 },
            { name: 'Seele mit Spinat und Weichkäse', price: 9.00 },
            { name: 'Seele mit Spinat, Weichkäse und Ei', price: 9.50 },
            { name: 'Seele mit Hackfleischdrehspieß, Tomaten und Zwiebel', price: 10.00 }
        ],
        sonstiges: [
            { name: 'Ganzes Fladenbrot', price: 2.00 },
            { name: 'Halbes Fladenbrot', price: 1.00 },
            { name: 'Halbes Fladenbrot mit Soße', price: 1.50 },
            { name: 'Schale Soße', price: 0.50 }
        ],
        getraenke: [
            { name: 'Cola, Cola Light, Cola Zero', price: 2.50 },
            { name: 'Fanta, Mezzo Mix, Sprite, Uludag', price: 2.50 },
            { name: 'Capri Sonne', price: 1.50 },
            { name: 'Wasser', price: 2.00 },
            { name: 'Ayran', price: 2.00 },
            { name: 'Durstlöscher', price: 2.00 },
            { name: 'Red Bull', price: 3.00 },
            { name: 'Powerade', price: 3.00 },
            { name: 'Effect', price: 3.00 }
        ]
    };

    itemCategory.addEventListener('change', function() {
        const category = this.value;
        const itemNameSelect = document.getElementById('itemName');
        
        // Reset and disable item selection first
        itemNameSelect.innerHTML = '<option value="">Bitte wählen...</option>';
        itemNameSelect.disabled = true;
        
        if (category) {
            // Enable the item selection
            itemNameSelect.disabled = false;
            
            // Add items from the selected category
            menuData[category].forEach(item => {
                const option = document.createElement('option');
                option.value = item.name;
                option.textContent = item.name;
                option.dataset.price = item.price;
                itemNameSelect.appendChild(option);
            });
            
            // Zeige die richtigen Extras je nach Kategorie
            updateExtraOptions(category);
        }
    });
    
    // Funktion zum Anzeigen der passenden Extras je nach Kategorie
    function updateExtraOptions(category) {
        try {
            // Alle Extra-Elemente erst verbergen
            document.querySelectorAll('#extraOptionsContainer .extra-item').forEach(item => {
                item.style.display = 'none';
            });
            
            // Bei diesen Kategorien keine Extras anzeigen
            if (category === 'getraenke' || category === 'beilagen' || category === 'sonstiges') {
                document.getElementById('extraOptionsContainer').style.display = 'none';
                return;
            }
            
            // Extras-Container anzeigen
            document.getElementById('extraOptionsContainer').style.display = 'block';
            
            // Allgemeine Extras für alle Kategorien
            const extrasToShow = ['extraScharf', 'extraSosse', 'extraWeichkaese'];
            extrasToShow.forEach(extraId => {
                const extraElement = document.querySelector(`#extraOptionsContainer input[id="${extraId}"]`);
                if (extraElement && extraElement.parentNode) {
                    extraElement.parentNode.style.display = 'block';
                }
            });
            
            // Je nach Kategorie die spezifischen Extras anzeigen
            if (category === 'pizza' || category === 'pide' || category === 'seele') {
                // Alle Pizza-typischen Extras anzeigen
                const pizzaExtras = ['extraCheese', 'extraSalami', 'extraSchinken', 'extraPilze', 
                                    'extraAnanas', 'extraThunfisch', 'extraZwiebeln', 'extraPaprika', 'extraOliven'];
                pizzaExtras.forEach(extraId => {
                    const extraElement = document.querySelector(`#extraOptionsContainer input[id="${extraId}"]`);
                    if (extraElement && extraElement.parentNode) {
                        extraElement.parentNode.style.display = 'block';
                    }
                });
            }
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Extras:', error);
        }
    }
    
    // Handle item name change 
    itemName.addEventListener('change', function() {
        const category = itemCategory.value;
        
        // Bei Auswahl eines Artikels die passenden Extras anzeigen
        updateExtraOptions(category);
    });

    // Add item to order
    const addItemForm = document.getElementById('addItemForm');
    const orderItems = document.getElementById('orderItems');
    let orderItemsArray = [];

    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const category = document.getElementById('itemCategory').value;
        const name = document.getElementById('itemName').value;
        const quantity = parseInt(document.getElementById('itemQuantity').value);
        
        if (!category || !name || isNaN(quantity) || quantity < 1) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }
        
        let basePrice = 0;
        menuData[category].forEach(item => {
            if (item.name === name) {
                basePrice = item.price;
            }
        });
        
        // Get extras
        const itemExtras = [];
        document.querySelectorAll('#extraOptionsContainer input[type="checkbox"]:checked').forEach(input => {
            itemExtras.push({ 
                name: input.value, 
                price: parseFloat(input.dataset.price || 0) 
            });
        });
        
        const notes = document.getElementById('itemNotes').value;
        
        // Calculate total item price
        let itemTotalPrice = basePrice;
        itemExtras.forEach(extra => {
            itemTotalPrice += extra.price;
        });
        itemTotalPrice *= quantity;
        
        // Create order item object
        const orderItem = {
            category: category,
            name: name,
            extras: itemExtras,
            notes: notes,
            quantity: quantity,
            price: basePrice,
            totalPrice: itemTotalPrice
        };
        
        // Add to orderItems array
        orderItemsArray.push(orderItem);
        
        // Update order display
        displayOrderItems();
        updatePriceSummary();
        
        // Reset form
        addItemForm.reset();
        document.querySelectorAll('#extraOptionsContainer input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        document.querySelectorAll('#extraOptionsContainer .extra-item').forEach(item => {
            item.style.display = 'none';
        });
        
        // Close modal
        document.getElementById('addItemModal').style.display = 'none';
    });

    // Display order items
    function displayOrderItems() {
        orderItems.innerHTML = '';
        
        if (orderItemsArray.length === 0) {
            orderItems.innerHTML = '<p>Keine Artikel hinzugefügt</p>';
            return;
        }
        
        orderItemsArray.forEach((item, index) => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            
            // Create order item details
            let itemDetails = `${item.quantity}x ${item.name}`;
            
            // Add extras if any
            if (item.extras && item.extras.length > 0) {
                itemDetails += '<br><small>' + item.extras.map(extra => extra.name).join(', ') + '</small>';
            }
            
            // Add notes if any
            if (item.notes) {
                itemDetails += `<br><small>Hinweis: ${item.notes}</small>`;
            }
            
            // Create HTML
            orderItem.innerHTML = `
                <div class="order-item-details">${itemDetails}</div>
                <div class="order-item-price">${item.totalPrice.toFixed(2)}€</div>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            
            orderItems.appendChild(orderItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                orderItemsArray.splice(index, 1);
                displayOrderItems();
                updatePriceSummary();
            });
        });
    }

    // Update price summary
    function updatePriceSummary() {
        try {
            let subtotal = 0;
            let deliveryFee = 0;
            
            // Berechne Zwischensumme
            orderItemsArray.forEach(item => {
                if (item && item.totalPrice) {
                    subtotal += item.totalPrice;
                }
            });
            
            // Liefergebühr bestimmen basierend auf ausgewählter Stadt
            const city = document.getElementById('city');
            if (city && city.value) {
                switch(city.value) {
                    case 'Freiberg am Neckar':
                        deliveryFee = 3.00;
                        break;
                    case 'Benningen':
                    case 'Pleidelsheim':
                    case 'Ingersheim':
                    case 'Hoheneck':
                        deliveryFee = 5.00;
                        break;
                    default:
                        deliveryFee = 0.00;
                }
            }
            
            // Gesamtsumme
            const total = subtotal + deliveryFee;
            
            // Preise in DOM aktualisieren
            document.getElementById('subtotal').textContent = subtotal.toFixed(2).replace('.', ',') + '€';
            document.getElementById('deliveryFee').textContent = deliveryFee.toFixed(2).replace('.', ',') + '€';
            document.getElementById('total').textContent = total.toFixed(2).replace('.', ',') + '€';
            document.getElementById('orderTotal').value = total.toFixed(2);
            
            // Bestellknopf aktivieren/deaktivieren je nach Mindestbestellwert
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            if (total < 15.00) {
                submitBtn.setAttribute('disabled', true);
                submitBtn.classList.add('disabled');
                
                // Hinweis anzeigen
                let minOrderNotice = document.querySelector('.minimum-order-notice');
                if (!minOrderNotice) {
                    minOrderNotice = document.createElement('div');
                    minOrderNotice.className = 'minimum-order-notice';
                    const priceSummary = document.querySelector('.price-summary');
                    priceSummary.insertAdjacentElement('afterend', minOrderNotice);
                }
                minOrderNotice.innerHTML = '<i class="fas fa-exclamation-circle"></i> Mindestbestellwert: 15,00€';
            } else {
                // Hinweis entfernen und Button aktivieren
                const minOrderNotice = document.querySelector('.minimum-order-notice');
                if (minOrderNotice) minOrderNotice.remove();
                
                submitBtn.removeAttribute('disabled');
                submitBtn.classList.remove('disabled');
            }
        } catch (error) {
            console.error('Fehler bei der Preisaktualisierung:', error);
        }
    }

    // City selection change - update delivery fee
    document.getElementById('city').addEventListener('change', updatePriceSummary);
    document.getElementById('address').addEventListener('input', updatePriceSummary);

    // Submit order form
    const orderForm = document.getElementById('orderForm');
    
    const orderSubmitBtn = document.getElementById('submitOrder');
    orderSubmitBtn.addEventListener('click', function() {
        const name = document.getElementById('customerName').value;
        const address = document.getElementById('customerAddress').value;
        const phone = document.getElementById('customerPhone').value;
        
        // Überprüfen, ob Pflichtfelder ausgefüllt sind
        if (!name || !address || orderItemsArray.length === 0) {
            alert('Bitte füllen Sie alle Pflichtfelder aus und fügen Sie mindestens einen Artikel zur Bestellung hinzu.');
            return;
        }
        
        // Überprüfen, ob der Mindestbestellwert erreicht ist
        const orderTotal = parseFloat(document.getElementById('orderTotal').value.replace(',', '.'));
        if (orderTotal < 15.00) {
            alert('Der Mindestbestellwert von 15,00€ wurde nicht erreicht.');
            return;
        }
        
        // Datenschutz-Einwilligung prüfen
        if (!document.getElementById('privacyConsent').checked) {
            alert('Bitte akzeptieren Sie die Datenschutzbestimmungen, um Ihre Bestellung abzuschicken.');
            return;
        }
        
        try {
            // WhatsApp-Nachricht formatieren
            let message = `*Neue Bestellung von ${name}*%0A%0A`;
            message += `*Kontakt:*%0A`;
            message += `Name: ${name}%0A`;
            message += `Adresse: ${address}%0A`;
            message += `Telefon: ${phone || 'Nicht angegeben'}%0A%0A`;
            
            const city = document.getElementById('city') ? document.getElementById('city').value : '';
            if (city) {
                message += `Stadt: ${city}%0A`;
            }
            
            message += `*Bestellung:*%0A`;
            
            if (orderItemsArray && orderItemsArray.length > 0) {
                orderItemsArray.forEach((item, index) => {
                    if (item && item.name) {
                        message += `${index + 1}. ${item.name} (${item.quantity}x) - ${(item.price * item.quantity).toFixed(2).replace('.',',')}€%0A`;
                        
                        // Extras hinzufügen, falls vorhanden
                        if (item.extras && item.extras.length > 0) {
                            message += `   Extras: `;
                            item.extras.forEach((extra, extraIndex) => {
                                if (extra && extra.name) {
                                    message += `${extra.name}${extra.price > 0 ? ' (+'+extra.price.toFixed(2).replace('.',',')+'€)' : ''}`;
                                    if (extraIndex < item.extras.length - 1) {
                                        message += `, `;
                                    }
                                }
                            });
                            message += `%0A`;
                        }
                        
                        // Notizen hinzufügen, falls vorhanden
                        if (item.notes) {
                            message += `   Notiz: ${item.notes}%0A`;
                        }
                    }
                });
            } else {
                console.error('Keine Bestellpositionen vorhanden');
            }
            
            const orderTotalElement = document.getElementById('orderTotal');
            if (orderTotalElement && orderTotalElement.value) {
                message += `%0A*Gesamtbetrag: ${orderTotalElement.value.replace('.',',')}€*`;
            }
            
            // Zahlungsmethode hinzufügen
            const paymentMethod = document.querySelector('input[name="payment"]:checked');
            if (paymentMethod) {
                message += `%0A*Zahlungsmethode: ${paymentMethod.value === 'bar' ? 'Barzahlung' : 'EC-Karte'}*`;
            }
            
            // WhatsApp-Link mit Tief-Link für mobile Geräte
            let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // Telefonnummer in richtigem Format (mit Ländercode, ohne führende 0)
            const phoneNumber = '491742116095'; // Vorformatierte Nummer
            
            // Nachricht für WhatsApp vorbereiten und URL-sicher machen
            const encodedMessage = encodeURIComponent(message.replace(/%0A/g, '\n'));
            
            let whatsappURL;
            if (isMobile) {
                // Direkter Link zur WhatsApp-App auf mobilen Geräten
                whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
            } else {
                // Web-Version für Desktop
                whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            }
            
            console.log('Bestellung wird gesendet an: ' + phoneNumber);
            console.log('Message: ' + encodedMessage);
            
            // Bestätigung anzeigen
            alert("Ihre Bestellung wird jetzt über WhatsApp gesendet. Falls WhatsApp nicht automatisch öffnet, bitte erneut versuchen oder uns telefonisch kontaktieren.");
            
            // WhatsApp direkt öffnen
            window.location.href = whatsappURL;
            
            // Formular zurücksetzen
            orderForm.reset();
            orderItemsArray = [];
            displayOrderItems();
            updatePriceSummary();
            
            // Erfolgsbestätigung anzeigen
            alert('Ihre Bestellung wird per WhatsApp übermittelt. Vielen Dank!');
            
        } catch (error) {
            console.error('Fehler beim Senden der Bestellung:', error);
            alert('Es ist ein Fehler beim Senden der Bestellung aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.');
        }
    });

    // Initialize display
    displayOrderItems();
    updatePriceSummary();
    
    // Quantity control buttons in modal
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('itemQuantity');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    // Datenschutz-Modal Funktionalität
    const privacyLink = document.querySelector('.privacy-link');
    const privacyModal = document.getElementById('privacyModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const acceptPrivacy = document.getElementById('acceptPrivacy');
    const privacyConsent = document.getElementById('privacyConsent');
    
    // Öffne das Modal, wenn auf den Datenschutz-Link geklickt wird
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
        });
    }
    
    // Schließe das Modal, wenn auf das X geklickt wird
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            document.body.style.overflow = ''; // Erlaubt Scrollen wieder
        });
    }
    
    // Schließe das Modal, wenn außerhalb geklickt wird
    window.addEventListener('click', function(event) {
        if (event.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = ''; // Erlaubt Scrollen wieder
        }
    });
    
    // Akzeptiere die Datenschutzbedingungen
    if (acceptPrivacy) {
        acceptPrivacy.addEventListener('click', function() {
            if (privacyConsent) {
                privacyConsent.checked = true;
            }
            privacyModal.style.display = 'none';
            document.body.style.overflow = ''; // Erlaubt Scrollen wieder
        });
    }
});

// Hinzufügen-Button im Popup
document.getElementById('addToCart').addEventListener('click', function() {
    const itemName = document.getElementById('popupItemName').textContent;
    const itemPrice = parseFloat(document.getElementById('popupItemPrice').textContent.replace('€', '').replace(',', '.'));
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
    
    let extras = [];
    document.querySelectorAll('#extraOptionsContainer input[type="checkbox"]:checked').forEach(function(checkbox) {
        extras.push({
            name: checkbox.value,
            price: parseFloat(checkbox.dataset.price || 0)
        });
    });
    
    const notes = document.getElementById('itemNotes').value;
    
    // Artikel zum Array hinzufügen
    const item = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        extras: extras,
        notes: notes
    };
    
    orderItemsArray.push(item);
    
    // Bestellübersicht aktualisieren
    updateOrderSummary();
    
    // Pop-up schließen
    document.getElementById('itemModal').style.display = 'none';
    
    // Extras zurücksetzen
    document.querySelectorAll('#extraOptionsContainer input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });
    
    // Notizen und Menge zurücksetzen
    document.getElementById('itemNotes').value = '';
    document.getElementById('itemQuantity').value = 1;
});
