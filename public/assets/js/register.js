var getUrl = window.location;
var address = window.location.href;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'events/public/';
}

// var phoneInput = document.getElementById('phoneNo');


// phoneInput.addEventListener('input', function (e) {
//     var x = e.target.value.replace(/\D/g, '').match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
//     e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
// });




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







    // $('#error-username,#error-password').html('');
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
        

    //     $("#username-create,#password-create").addClass('has-success');
    //     let token = null;
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

