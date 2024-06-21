
var stripe = Stripe('your-publishable-key-here');
var elements = stripe.elements();
var style = {
    base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#32325d'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};
var card = elements.create('card', {style: style});
card.mount('#card-element');

card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var amount = document.getElementById('amount').value;
    stripe.createToken(card).then(function(result) {
        if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            stripeTokenHandler(result.token, amount);
        }
    });
});

function stripeTokenHandler(token, amount) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/charge');

    var hiddenToken = document.createElement('input');
    hiddenToken.setAttribute('type', 'hidden');
    hiddenToken.setAttribute('name', 'stripeToken');
    hiddenToken.setAttribute('value', token.id);
    form.appendChild(hiddenToken);

    var hiddenAmount = document.createElement('input');
    hiddenAmount.setAttribute('type', 'hidden');
    hiddenAmount.setAttribute('name', 'amount');
    hiddenAmount.setAttribute('value', amount);
    form.appendChild(hiddenAmount);

    document.body.appendChild(form);
    form.submit();
}

var modal = document.getElementById('donateModal');
var btn = document.getElementById('donateButton');
var span = document.getElementById('closeModal');

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    const { stripeToken, amount } = req.body;
    try {
        const charge = await stripe.charges.create({
            amount: amount * 100, // Stripe amount is in cents
            currency: 'usd',
            description: 'Donation',
            source: stripeToken,
        });
        res.send('Success');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// script.js
function reduceSize() {
  var button = document.getElementById('resizeButton');
  button.classList.toggle('reduced');
}
