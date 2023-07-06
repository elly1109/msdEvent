var getUrl = window.location;
var address = window.location.href;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'events/public/';
}

var phoneInput = document.getElementById('phoneNo');

phoneInput.addEventListener('input', function (e) {
     var x = e.target.value.replace(/\D/g, '')
.match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,3})/);

if (!x[1]) {
    e.target.value = '+';

    return;
}

if (!x[2]) {
    e.target.value = `+${x[1]}`;

    return;
}




e.target.value = `+${x[1]} (${x[2]}`
    + ( x[3] ? `) ${x[3]}` : '' )
    + ( x[4] ? `-${x[4]}` : '' )
    + ( x[5] ? `-${x[5]}` : '' )
    + ( x[6] ? `-${x[6]}` : '' );
});





jQuery(
function($){

$('#register-form').on('click', function(e) {
    e.preventDefault();
    // console.log(e.target)

    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let phoneNo = $('#phoneNo').val();
    let gender = $('#gender').val();
    let companyName = $('#companyName').val();
    let countryId = $('#countryId').val();
    let title = $('#title').val();
    let prefix = $('#prefix').val();
    let suffix = $('#suffix').val();







    $('#error-first-name,#error-last-name,#error-email,#error-phone-no,#error-title').html('');
    // $("#username-create,#password-create").addClass('has-success');


    if(firstName == '' || lastName == '' || email == '' || phoneNo == '' || gender == '' || countryId == '' || title == ''){

        if(firstName == ''){
            // $("#username-create").addClass("has-error");
            $("#error-first-name").html("Please fill first name");
        }
        if(lastName == ''){
            // $("#password-create").addClass("has-error");
            $("#error-last-name").html("Please fill last name");
        }
        if(email == ''){
            // $("#password-create").addClass("has-error");
            $("#error-email").html("Please fill email");

            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(email.match(mailformat)){
                return true;
            }else{
                $("#error-email").html("You have entered an invalid email address!");
                return false;
            }
            
        }
        if(phoneNo == ''){
            // $("#password-create").addClass("has-error");
            $("#error-phone-no").html("Please fill phone number");
            // var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            // if(phoneNo.match(phoneno)){
            //     return true;
            // }else {
            //     alert("message");
            //     return false;
            // }
        }
        if(title == ''){
            // $("#password-create").addClass("has-error");
            $("#error-title").html("Please fill job title");
        }

    }else{
        
        $.ajax({
            type: "POST",
            url: baseUrl+"api/create-supplier",
            data: {
                firstName: firstName, 
                lastName: lastName, 
                phoneNumber: phoneNo, 
                gender: gender, 
                email: email, 
                companyName: companyName, 
                countryId: countryId, 
                title: title,
                suffix: suffix,
                prefix: prefix,
            },
            success: function (response) {
                if (response.success) {
                    swal({title: "Success", type: "success", text: response.message, showConfirmButton: true, allowEscapeKey: true});

                    $('#register-now').modal('hide');
                    document.getElementById("form-reg").reset();

                } else {
                    swal({title: "Error", type: "error", text: response.message, showConfirmButton: true, allowEscapeKey: true});
                }
            },
            error: function () {
                swal({
                    title: "Technical Error",
                    type:"error",
                    text: "Please contact us",
                    showConfirmButton: true,
                    allowEscapeKey: true
                });
            }
        });
    }


})

})

