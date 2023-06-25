var csrfToken = $('meta[name="csrf-token"]').attr("content");
var getUrl = window.location;
let myToken = localStorage.getItem('token');
var address = window.location.href;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'ess/public/';
}





$('#office').on('change', function() {
    var office = this.value;
    if(office == ''){
        $('.office').val('').trigger('change');
        $('#sections,#unit_direc_zone').val('').trigger('change').attr('disabled',true);
    } else {
        if(office == 'Unit'){
            $('#sections').val('').trigger('change').attr('disabled',true);
        }
        else{
            $('#sections').val('').trigger('change').attr('disabled',false);
        }
        $('#unit_direc_zone').val('').trigger('change').attr('disabled',false);
        $.ajax({
            url: baseUrl + "employee-office",
            type: "GET",
            data: {"office": office},
            contentType: "application/json",
            dataType: "json",
            headers: {"Content-Type":"application/json","Authorization":"Bearer "+myToken},
            success: function(response) {
                var data = JSON.parse(response);
                // swal.close();
                var office_info = '<option value=""></option>';
                for(var i in data){
                    office_info += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
                }

                $('#unit_direc_zone').html(office_info);

            }
        });
    }
});

$('.add_btn').on('click', function() {
    $('.error').html('');
    $('.form-control').val('').css('border-color', '#e3e3e3');
    $('.office').val('').trigger('change');
    $('#sections,#unit_direc_zone').val('').trigger('change').attr('disabled',true);
});


$('#unit_direc_zone').on('change', function() {
    var office_id = this.value;
    var office = $('#office').val();
    if(office == 'Unit' || office_id==''){
        $('#sections').val('').trigger('change').attr('disabled',true);
    } else {
        $('#sections').val('').trigger('change').attr('disabled',false);
        $.ajax({
            url: baseUrl + "employee-section",
            type: "GET",
            data: {"office": office,"office_id":office_id},
            // contentType: "application/json",
            // dataType: "json",
            success: function(response) {
                var data = JSON.parse(response);
                // swal.close();
                var section_info = '<option value=""></option>';
                for(var i in data){
                    section_info += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
                }

                $('#sections').html(section_info);

            }
        });
    }
});

$('#employee-form').on('submit', function(e) {
    e.preventDefault();
    $('.error').html('');
    $(".form-control").css('border-color', '#e3e3e3');
    var image_url = baseUrl+'master/assets/img/loader.gif';
    var formData = new FormData(this);
    console.log(formData);

    swal({ title: "", text: '', imageUrl: image_url, showConfirmButton: false, allowEscapeKey: false });

    if ($('#fname').val() == '' || $('#lname').val() == '' || $('#emp_no').val() == '' || $('#gender').val() == '' ||
        $('#marital').val() == '' || $('#phone').val() == '' || $('#email').val() == '' || $('#hire').val() == '' ||
        $('#emp_type').val() == '' || $('#nida').val() == '' || $('#office').val() == '' || $('#designation').val() == ''
    ) {
        if ($('#fname').val() == '') {
            $("#fname").css('border-color', 'red');
            $('#error_fname').html('Please enter firstname');
        }
        if ($('#lname').val() == '') {
            $("#lname").css('border-color', 'red');
            $('#error_lname').html('Please enter lastname');
        }
        if ($('#emp_no').val() == '') {
            $("#emp_no").css('border-color', 'red');
            $('#error_emp_no').html('Please enter Employee ID');
        }
        if ($('#gender').val() == '') {
            $("#gender").css('border-color', 'red');
            $('#error_gender').html('Please select gender');
        }
        if ($('#marital').val() == '') {
            $("#marital").css('border-color', 'red');
            $('#error_marital').html('Please select marital status');
        }
        if ($('#phone').val() == '') {
            $("#phone").css('border-color', 'red');
            $('#error_phone').html('Please enter phone number');
        }
        if ($('#email').val() == '') {
            $("#email").css('border-color', 'red');
            $('#error_email').html('Please enter email');
        }
        if ($('#hire').val() == '') {
            $("#hire").css('border-color', 'red');
            $('#error_hire').html('Please select hired date');
        }
        if ($('#emp_type').val() == '') {
            $("#emp_type").css('border-color', 'red');
            $('#error_emp_type').html('Please select employment type');
        }
        if ($('#nida').val() == '') {
            $("#nida").css('border-color', 'red');
            $('#error_nida').html('Please enter National ID');
        }
        if ($('#office').val() == '') {
            $("#office").css('border-color', 'red');
            $('#error_office').html('Please select office');
        }
        if ($('#designation').val() == '') {
            $("#designation").css('border-color', 'red');
            $('#error_designation').html('Please select designation');
        }
        swal.close();
    }
    else {
        $.ajax({
            url: baseUrl + "api/employees/add",
            type: "post",
            data: JSON.stringify( $('#employee-form').serializeObject()),
            // contentType: false,
            success: function(response) {
                swal.close();
                if(response.statusCode == 200){
                    toastr.success(response.message, 'Successfull!', { "showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000 });

                    employees();
                    $('#add_employee').modal('hide');
                } else {
                    swal({
                        title: "",
                        type: "error",
                        text: response.message,
                        showConfirmButton: true,
                        allowEscapeKey: true
                    });
                }

            },
            error: function() {
                swal({
                    title: "Technical Error",
                    text: "Please contact Department of ICT and Statistics",
                    showConfirmButton: true,
                    allowEscapeKey: true
                });
            }
        });
    }


    return false;
});



roles();
function roles(){
    $.ajax({
        url: baseUrl + "api/roles",
        type: "get",
        dataType: "json",
        success: function(response) {
            swal.close();
            // var data = JSON.parse(response);

            $('#role-table').dataTable().fnDestroy();
            data = response.data;
            var tbody_tr = '';
            var zz = 1;
            for (var i in data){
                tbody_tr += `
                <tr>
                    <td>`+zz+`.</td>
                    <td>`+data[i].name+`</td>
                    <td>`+data[i].status+`</td>
                </tr>
            `;
                zz++;
            }


   var table_role = `
        <table class="table table-striped custom-table mb-0 datatable" id="role-table" width="100%">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            `+tbody_tr+`
            </tbody>
        </table>
        `;

            // console.log(tbody_tr)
            $('#role-data').html(table_role);
            $('#role-table').DataTable();

        },
        error: function() {
            swal({
                title: "Technical Error",
                text: "Please contact Department of ICT and Statistics",
                showConfirmButton: true,
                allowEscapeKey: true
            });
        }
    });
}