function ajaxEmailEventReg(e){var a=jQuery(e).data("redirect"),s=!1;console.log(a),("none"==a||""==a||void 0==a)&&(s=!0),console.log(s),jQuery("#eventreg_msg").fadeIn("slow").html(eventres_ajax.msg_wait),contents=jQuery(e).serialize(),contents+="&action=gather_event_email_registration",jQuery.post(eventres_ajax.url,contents,function(e){1==e.success?s?jQuery("#eventreg_msg").html(e.message).delay(5e3).fadeOut("slow"):window.location.href=a:(jQuery("#eventreg_msg").html(e.message).delay(5e3).fadeOut("slow"),jQuery("#reserve-btn").attr("disabled",!1))},"json")}var rules={first_name:"required",last_name:"required",email:{required:!0,email:!0},agree:"required"},add_fields_validate=eventres_ajax.add_fields_validate?eventres_ajax.add_fields_validate:{};jQuery.each(add_fields_validate,function(e,a){rules[e]=a}),jQuery("#email-registration-form").submit(function(e){e.preventDefault()}).validate({rules:rules,messages:{first_name:eventres_ajax.msg_fname,last_name:eventres_ajax.msg_lname,email:eventres_ajax.msg_email,os0:eventres_ajax.msg_pass,quantity:eventres_ajax.msg_seats,agree:eventres_ajax.msg_agree},submitHandler:function(e){jQuery("#reserve-btn").attr("disabled",!0),jQuery("#eventreg_msg").css("display","none"),ajaxEmailEventReg(e)}});