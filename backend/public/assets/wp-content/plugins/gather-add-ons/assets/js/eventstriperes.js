jQuery(document).ready(function($){

    var stripe = Stripe(eventres_ajax.stripe_publishable_key);
    var elements = stripe.elements();

    var card = elements.create('card', {
        hidePostalCode : true,
        iconStyle: 'solid', //default or solid
        style: {
            base: {
                iconColor: '#8898AA',
                color: '#555',
                lineHeight: '2',
                fontWeight: 300,
                fontFamily: 'Open Sans',
                fontSize: '14px',

                '::placeholder': {
                    color: '#555',
                },
            },
            invalid: {
                iconColor: '#843534',
                color: '#843534',
            }
        },
        classes: {
            focus: 'is-focused',
            empty: 'is-empty',
        },
    });
    card.mount('#stripe-modal-card-element');

    // var inputs = Array.from(document.querySelectorAll('input.field'));
    // inputs.forEach(function(input) {
    //     input.addEventListener('focus', function() {
    //         input.classList.add('is-focused');
    //     });
    //     input.addEventListener('blur', function() {
    //         input.classList.remove('is-focused');
    //     });
    //     input.addEventListener('keyup', function() {
    //         if (input.value.length === 0) {
    //             input.classList.add('is-empty');
    //         } else {
    //             input.classList.remove('is-empty');
    //         }
    //     });
    // });

    card.on('change', function(result) {
        //checkCard(event);
        jQuery("#reserve-btn").attr("disabled", false);
        if (result.error) {
            jQuery('#eventreg_msg').html(result.error.message).css('display','block');
        }
    });
    var rules = {
        first_name: "required",
        last_name: "required",
        email: {
            required: true,
            email: true
        },
        os0: "required",
        item_price: "required",
        quantity: "required",
        agree: "required"
    };
    var add_fields_validate = eventres_ajax.add_fields_validate ? eventres_ajax.add_fields_validate : {};
    jQuery.each(add_fields_validate, function(key, value) {
        rules[key] = value;
    });
    jQuery(".stripe-reg-form").validate({
        rules: rules,
        messages: {
            first_name: eventres_ajax.msg_fname,
            last_name: eventres_ajax.msg_lname,
            email: eventres_ajax.msg_email,
            os0: eventres_ajax.msg_pass,
            item_price: "Choose your Pass",
            quantity: eventres_ajax.msg_seats,
            agree: eventres_ajax.msg_agree
        },
        submitHandler: function(form) {
            jQuery("#reserve-btn").attr("disabled", true);
            jQuery('#eventreg_msg').css('display','none');
            submitStripeRegForm(form);
        }
    });

    function submitStripeRegForm(form){

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error
                jQuery('#eventreg_msg').html(result.error.message).css('display','block');
                jQuery("#reserve-btn").attr("disabled", false);
            } else {
                // Send the token to your server
                stripeTokenHandler(result.token, form);
            }
        });
    }

    function stripeTokenHandler(token , form) {
        // Insert the token ID into the form so it gets submitted to the server
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        // jQuery('#eventreg_msg').html(token.id).css('display','block');

        // Submit the form
        form.submit();
    }

    function checkCard(result) {
        if (result.error) {
            jQuery('#eventreg_msg').html(result.error.message).css('display','block');
            jQuery("#reserve-btn").attr("disabled", true);
        }
    }


});


