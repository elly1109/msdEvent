var data_view = 0;
var data_view_row = 0;
var address = window.location.href;

var csrfToken = $('meta[name="csrf-token"]').attr("content");
let myToken = localStorage.getItem('token');
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'ess/public/';
}

function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


if(address.includes("/dashboard")) {
    dashboard();
}
function dashboard(){
    $.ajax({
        url: baseUrl + "api/dashboard-info",
        type: "get",
        dataType: "json",
        headers: {"Content-Type":"application/json","Authorization":"Bearer "+myToken},
        success: function (response) {
            swal.close();
            data = response;

            console.log(data)

            $('#employees-no, #all-employees').html(data.employees);
            $('#volunteers-no').html(data.volunteers);
            $('#trainees-no').html(data.trainees);
            $('#onleave-no, .all-leaves').html(data.on_leaves);
            $('#annual-leave-no').html(data.annual_leave);
            $('#sick-leave-no').html(data.sick_leave);
            $('#other-leave-no').html(data.other_leave);

            var onleavePercent = ((parseInt(data.on_leaves)/parseInt(data.employees))*100)+'%';
            var annualPercent = ((parseInt(data.annual_leave)/parseInt(data.on_leaves))*100)+'%';
            var sickPercent = ((parseInt(data.sick_leave)/parseInt(data.on_leaves))*100)+'%';
            var otherPercent = ((parseInt(data.other_leave)/parseInt(data.on_leaves))*100)+'%';


            $('#onleave-bar').html(`
                <div class="progress mb-2" style="height: 5px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: `+onleavePercent+`;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `)

            $('#annual-leave-bar').html(`
                <div class="progress mb-2" style="height: 5px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: `+annualPercent+`;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `)

            $('#sick-leave-bar').html(`
                <div class="progress mb-2" style="height: 5px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: `+sickPercent+`;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `)

            $('#other-leave-bar').html(`
                <div class="progress mb-2" style="height: 5px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: `+otherPercent+`;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `)
        },
        error: function () {
            swal({
                title: "Technical Error",
                text: "Please contact Department of ICT and Statistics",
                showConfirmButton: true,
                allowEscapeKey: true
            });
        }
    });
}