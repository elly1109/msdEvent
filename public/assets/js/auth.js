var getUrl = window.location;
var address = window.location.href;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'ess/public/';
}




$("#username-create").keyup(function (e) {
    const userName = $("#username").val();
  
    if (userName.length >= 4) {
      $("#username-create").removeClass("has-error");
      $("#username-create").addClass("has-success");
      $("#error-username").html("");
    } else if (userName.length == ""){
      $("#username-create").addClass("has-error");
      $("#error-username").html("Please fill username");
    }
  });


$("#password-create").keyup(function (e) {
    const userPass = $("#password").val();
  
    if (userPass.length == "") {
      $("#password-create").addClass("has-error");
      $("#error-password").html("Please fill password");
    } else{
        $("#password-create").removeClass("has-error");
        $("#password-create").addClass("has-success");
        $("#error-password").html(" ");

    }
  });



  if(address.includes("auth/login")) {
    loginUser($('#password').val(), $('#username').val());
}


$('#login-form').on('click', function(e) {
    e.preventDefault();
    let userName = $('#username').val();
    let userPass = $('#password').val();

    $('#error-username,#error-password').html('');
    $("#username-create,#password-create").addClass('has-success');


    if(userName == '' || userPass == ''){

        if(userName == ''){
            $("#username-create").addClass("has-error");
            $("#error-username").html("Please fill username");
        }
        if(userPass == ''){
            $("#password-create").addClass("has-error");
            $("#error-password").html("Please fill password");
        }

    }else{
        

        $("#username-create,#password-create").addClass('has-success');
        let token = null;
        $.ajax({
            type: "POST",
            url: baseUrl+"api/auth/login",
            data: {username: userName, password: userPass},
            success: function (response) {
                if (response.success) {
                    // swal.close();
                    localStorage.setItem('token',response.data.token);
                    token = response.data.token;
                    $.ajax({
                        url: baseUrl+"login", 
                        type:'POST', 
                        data: {username: userName, password: userPass},
                        headers: {
                            "Authorization":"Bearer "+token,
                            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content'),                       },
                        success: function(result){   
                            window.location.href = baseUrl + 'dashboard'  
                        },
                        error: function(result){ 
                            alert("hapa");
                            console.log("error "+result);
                        }
                });
                

                } else {
                    swal({title: "", type: "error", text: response.message, showConfirmButton: true, allowEscapeKey: true});
                }
            },
            error: function () {
                swal({
                    title: "Technical Error",type:"error",
                    text: "Please contact us",
                    showConfirmButton: true,
                    allowEscapeKey: true
                });
            }
        });
    }


})



function logoutBtn(){
    let myToken = localStorage.getItem('token');

    $.ajax({
        url: baseUrl + "api/logout",
        type: "POST",
        // dataType: "json",
        headers: {"Authorization":"Bearer "+myToken},
        success: function(response) {
            localStorage.removeItem('token');
            window.location.href = baseUrl + 'logout'        
        }
    });
}



