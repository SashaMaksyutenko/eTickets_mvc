function initPayPalButton() {
    let req = [{ "amount": { "value": "150.00", "breakdown": { "item_total": { "currency_code": "USD", "value": "150.00" } } }, "items": [{ "description": "A kit provided by Glossier, containing skin care, hair care and makeup products", "name": "Glossier - Beauty Kit", "quantity": 1, "unit_amount": { "currency_code": "USD", "value": "100.00" } }, { "description": "A kit provided by Curology, containing skin care products", "name": "Curology - Skin Care Kit", "quantity": 1, "unit_amount": { "currency_code": "USD", "value": "50.00" } }] }]
    paypal.Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: req
            });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
                // Successful capture! For demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                var transaction = orderData.purchase_units[0].payments.captures[0];
                alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

                // Replace the above to show a success message within this page, e.g.
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '';
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
            });
        },
        onCancel: function (data, actions) {
            debugger;
        },

        // An error occurred during the transaction
        onError: function (err) {
            console.log(err);
            debugger;
        }

    }).render('#paypal-btn');
}