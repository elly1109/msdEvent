var csrfToken = $('meta[name="csrf-token"]').attr("content");
var getUrl = window.location;
//let myToken = localStorage.getItem('token');
var address = window.location.href;
var selfData = [];
var baseUrl =
  getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[0];
if (baseUrl == "http://localhost/" || baseUrl == "https://localhost/") {
  baseUrl += "ess/public/";
}

// request access button
$(".add_access").on("click", function () {
  systemTypes();

  $(".error").html("");
  $(".form-control").val("").css("border-color", "#e3e3e3");
});

$("#close-access-form").on("click", function () {
    $("#user-access-table").dataTable().fnDestroy();

  $(".error").html("");
  $(".form-control").val("").css("border-color", "#e3e3e3");
});


$("#system_type_id").change(function () {
  var val = $(this).val();

  // console.log(val);

  let dataJson = { id: val };

  if (val) {
    $("#group_cat,#group_access_id").show();
    $.ajax({
      url: baseUrl + "api/system-types/"+ val,
      type: "get",
      dataType: "json",
      // data:dataJson,
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+myToken,
        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
      },
      success: function (response) {
        swal.close();
        if (response.statusCode == 200){
        data = response.data;
        var types = '<option value=""></option>';
        for (var i in data) {
          types +=
            '<option value="' + data[i].id + '">' + data[i].name + "</option>";
        }

        $("#group_cat_id").html(types);
    }else{
        localStorage.removeItem('token');
        window.location.href = baseUrl + 'logout' 
    }

        
      },
      error: function () {
        
        swal({
          title: "Technical Error",
          text: "Please contact Department of ICT and Statistics",
          showConfirmButton: true,
          allowEscapeKey: true,
        });
      },
    });
  } else {
    $("#group_cat,#group_access_id").hide();
  }
});

$("#group_cat_id").change(function () {
  var val = $(this).val();
  if (val == 1) {
    $.ajax({
      url: baseUrl + "api/system-group-access/" + val,
      type: "get",
      dataType: "json",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+myToken,
        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
      },
      success: function (response) {
        if(response.statusCode ==200) {
        swal.close();
        data = response.data;
        var access_tr = "";
        var access_tbs = "";
        for (var i in data) {
        if(selfData.includes(data[i].name)){
            access_tr +=
              `
                      <tr>
                          <td>` +
              data[i].name +
              `</td>
                          <td class="text-center">
                              <input value="` +
              data[i].id +
              `" name="access_groups" id="access_groups" type="checkbox" checked disabled>
                          </td>
                      </tr>
                      `;
        }else{

        
            access_tbs +=
              `
                      <tr>
                          <td>` +
              data[i].name +
              `</td>
                          <td class="text-center">
                              <input value="` +
              data[i].id +
              `" name="access_groups" id="access_groups" type="checkbox">
                          </td>
                      </tr>
                      `;

        }

        
        }
    }else{
        localStorage.removeItem('token');
        window.location.href = baseUrl + 'logout' 
    }

        $("#user-access-groups").html(access_tr+access_tbs);
      },
      error: function () {           
        swal({
          title: "Technical Error",
          text: "Please contact Department of ICT and Statistics",
          showConfirmButton: true,
          allowEscapeKey: true,
        });
      },
    });
  } else {
    $("#group_cat,#group_access_id").hide();
  }
});

//Training Types API
function systemTypes() {
  $.ajax({
    url: baseUrl + "api/system-types",
    type: "get",
    dataType: "json",
    headers: {"Content-Type":"application/json","Authorization":"Bearer "+myToken},
    success: function (response) {
      swal.close();
      if(response.statusCode ==200) {
      data = response.data;
      var types = '<option value=""></option>';
      for (var i in data) {
        types +=
          '<option value="' + data[i].id + '">' + data[i].name + "</option>";
      }
    }
      $("#system_type_id").html(types);
    },
    error: function () { 
      swal({
        title: "Technical Error",
        text: "Please contact Department of ICT and Statistics",
        showConfirmButton: true,
        allowEscapeKey: true,
      });
    },
  });
}

myAccess();
function myAccess() {
  $.ajax({
    url: baseUrl + "api/my-access",
    type: "get",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
    success: function (response) {
      swal.close();
      if(response.data) {
      var emp = $("#employee-id").val();
      $("#user-access-table").dataTable().fnDestroy();
      data = response.data;
      data.forEach(element => {
        if(!selfData.includes(element.group)){  
            selfData.push(element.group);
        }       
      });


      var tbody_tr = "";
      var zz = 1;
      for (var i in data) {
        var progress =
        data[i].progress == 1
          ? "Waiting Manager/Supervisor"
          : data[i].progress == 2
          ? "Waiting Director"
          : data[i].progress == 3
          ? "Rejected by Manager/Supervisor"
          : data[i].progress == 4
          ? "Waiting ICT"
          : data[i].progress == 5
          ? "Rejected by Director"
          : data[i].progress == 6
          ? "Waiting DICTS"
          : data[i].progress == 7
          ? "Rejected by Director"
          : data[i].progress == 8
          ? "Approved" 
          : data[i].progress == 0
          ? "Deleted":"";

          var acc_btn =
          (data[i].progress == 1 && emp )
              ? '<i class="la la-trash-o" style="cursor: pointer" onclick="deleteAccess(\'' +
                data[i].id +"','" +data[i].name +"')\"></i>":  (emp )
                ? '<i class="la la-trash-o " style=" cursor:not-allowed; color:grey" disabled></i>':"";

        tbody_tr +=
        ` <tr><td>` + zz +`.</td>
         <td>` + data[i].app +`</td>
         <td>` + data[i].category +
         `</td><td>` +data[i].group +`</td>
        <td>` +progress +`</td>
        <td>` +acc_btn +`</td>
        
        </tr>`;

        zz++;
      }

      var table_user_access =
        `
        <table class="table table-striped custom-table mb-0 datatable" id="user-access-table" width="100%">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>System</th>
                                        <th>Access Category</th>
                                        <th>Access Group</th>
                                        <th>Progress</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    ` +
        tbody_tr +
        `
                                    </tbody>
                                </table>
        `;

      $("#user-access-data").html(
        '<div class="table-responsive">' + table_user_access + "</div>"
      );
      }else{
        localStorage.removeItem('token');
        window.location.href = baseUrl + 'logout' 
      }
      $("#user-access-table").DataTable();
    },
    error: function () {    
      swal({
        title: "Technical Error",
        text: "Please contact Department of ICT and Statistics",
        showConfirmButton: true,
        allowEscapeKey: true,
      });
    },
  });
}

allAccess();
function allAccess() {

  $.ajax({
    url: baseUrl + "api/all-access",
    type: "get",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
    success: function (response) {
      swal.close();
      if (response.data){
      $("#man-access-table").dataTable().fnDestroy();
      var permission = $("#perm-id").val();
      data = response.data;
      var tbody_tr = "";
      var zz = 1;
      for (var i in data) {
        var progress =
          data[i].progress == 1
            ? "Waiting Manager/Supervisor"
            : data[i].progress == 2
            ? "Waiting Director"
            : data[i].progress == 3
            ? "Rejected by Manager/Supervisor"
            : data[i].progress == 4
            ? "Waiting ICT"
            : data[i].progress == 5
            ? "Rejected by Director"
            : data[i].progress == 6
            ? "Waiting DICTS"
            : data[i].progress == 7
            ? "Rejected by Director"
            : data[i].progress == 8
            ? "Approved" 
            : data[i].progress == 0
            ? "Deleted":"";
        var acc_btn =
        (data[i].progress == 1 &&  permission == "manager authorized")
            ? '<i class="la la-eye" style="cursor: pointer" data-toggle="view" onclick="approveAccess(\'' +data[i].id +"','" +
              data[i].category +"','" +data[i].app +"','" +data[i].group + "','" +data[i].employee_id +"','" +
              data[i].progress +"','" + data[i].group_id +"','" +data[i].name +"','" +
              data[i].designation +'\')"></i><i class="la la-edit" style="cursor: pointer" onclick="updateAccess(\'' +data[i].id +"','" +
              data[i].category +"','" +data[i].app +"','" +data[i].group + "','" +data[i].employee_id +"','" +
              data[i].progress +"','" + data[i].group_id +"','" +data[i].name +"','" +
              data[i].designation +'\')"></i><i class="la la-trash-o" style="cursor: pointer" onclick="deleteAccess(\'' +
              data[i].id +"','" +data[i].category +"','" +data[i].app +"','" +data[i].group +"')\"></i>"
        :(data[i].progress == 2 &&  permission == "director authorized")
              ? '<i class="la la-edit" style="cursor: pointer" onclick="approveAccess(\'' +data[i].id +"','" +
                data[i].category +"','" +data[i].app +"','" +data[i].group + "','" +data[i].employee_id +"','" +
                data[i].progress +"','" + data[i].group_id +"','" +data[i].name +"','" +
                data[i].designation +'\')"></i><i class="la la-trash-o" style="cursor: pointer" onclick="deleteAccess(\'' +
                data[i].id +"','" +data[i].category +"','" +data[i].app +"','" +data[i].group +"')\"></i>"
        :(data[i].progress == 4 &&  permission == "ict authorized")
              ? '<i class="la la-edit" style="cursor: pointer" onclick="approveAccess(\'' +data[i].id +"','" +
                data[i].category +"','" +data[i].app +"','" +data[i].group + "','" +data[i].employee_id +"','" +
                data[i].progress +"','" + data[i].group_id +"','" +data[i].name +"','" +
                data[i].designation +'\')"></i><i class="la la-trash-o" style="cursor: pointer" onclick="deleteAccess(\'' +
                data[i].id +"','" +data[i].category +"','" +data[i].app +"','" +data[i].group +"')\"></i>"
        :(data[i].progress == 6  &&  permission == "dict authorized")
              ? '<i class="la la-edit" style="cursor: pointer" onclick="approveAccess(\'' +data[i].id +"','" +
                data[i].category +"','" +data[i].app +"','" +data[i].group + "','" +data[i].employee_id +"','" +
                data[i].progress +"','" + data[i].group_id +"','" +data[i].name +"','" +
                data[i].designation +'\')"></i><i class="la la-trash-o" style="cursor: pointer" onclick="deleteAccess(\'' +
                data[i].id +"','" +data[i].category +"','" +data[i].app +"','" +data[i].group +"')\"></i>"
        : ( data[i].progress == 8)?'<i class="la la-check" style="cursor: pointer" <i>' :'<i class="la la-eye" style="cursor: pointer" data-toggle="view" onclick="approveAccess(\'' +data[i].id +"','" +
        data[i].category +"','" +data[i].app +"','" +data[i].group + "','" +data[i].employee_id +"','" +
        data[i].progress +"','" + data[i].group_id +"','" +data[i].name +"','" +
        data[i].designation +'\')"></i><i class="la la-edit" style="cursor: not-allowed; color:grey" disabled></i><i class="la la-trash-o" style="cursor: not-allowed; color:grey" disabled></i>';
        // var acc_btn = (data[i].progress  == 2 ) ? '<i class="la la-edit" style="cursor: pointer"></i><i class="la la-trash-o" style="cursor: pointer" ></i>':'';

        tbody_tr +=
          `
                <tr>
                    <td>` +
          zz +
          `.</td>
                    <td>` +
          data[i].name +
          `<br/><small>` +
          data[i].designation +
          `</small></td>
                    <td>` +
          data[i].app +
          `</td>
                    <td>` +
          data[i].category +
          `</td>
                    <td>` +
          data[i].group +
          `</td>
                    <td class="text-center">` +
          progress +
          `</td>
                    <td>` +
          acc_btn +
          `</td>

                </tr>
            `;
        zz++;
      }
      var table_user_access =
        `
        <table class="table table-striped custom-table mb-0 datatable" id="user-access-table" width="100%">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Employee</th>
                                        <th>System</th>
                                        <th>Access Category</th>
                                        <th>Access Group</th>
                                        <th>Progress</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    ` +
        tbody_tr +
        `
                                    </tbody>
                                </table>
        `;

      $("#man-access-data").html(
        '<div class="table-responsive">' + table_user_access + "</div>"
      );
      $("#man-access-table").DataTable();
      }else{
        localStorage.removeItem('token');
        window.location.href = baseUrl + 'logout'
      }
    },
    error: function () {     
      swal({
        title: "Technical Error",
        text: "Please contact Department of ICT and Statistics",
        showConfirmButton: true,
        allowEscapeKey: true,
      });
    },
  });
}


function approveAccess(id,category,app,group,employee_id,progress,group_id,name,designation) {
  $("#group_cat,#group_access_id").show();
  $("#request-access").html("Update User Access");
  $("#employee").val(name);
  $("#desgn").val(designation);
  $("#group_cat_id").val(category);
  $("#group_acc").val(group);
  $("#access-id").val(id);

  $.ajax({
    url: baseUrl + "api/access-group/"+group_id,
    type: "get",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
    success: function (response) {
      swal.close();
      var data = response.data;
      var group_perm = "";
      for (var i = 0; i < data.length; i++) {
             group_perm +=`
            <input class="form-check-input" type="checkbox" value="" checked disabled />
            <label class="form-check-label" >`+data[i].name +`</label> &nbsp &nbsp &nbsp &nbsp`;
        }
        $("#perm-list").html(group_perm);
        $("#approve_access").modal("show");
    }
  });

  

  $("#apprv-btn").on("click", function (e) {
    e.preventDefault();
    var progres = null;
    if (progress == 1){
      progres = 2;
    }else if (progress == 2){
      progres = 4;
    }else if (progress == 4){
      progres=6;
    }else if (progress == 6){
      progres=8;
    }
          
    var dataJson = {
      groups: [{
        group_id: group_id,
        progress: progres,
        employee_id: employee_id,
      }]
    };
            
    swal({ title: "Approval", text: "Please wait..!", showConfirmButton: false, allowEscapeKey: false,});

    $.ajax({
      url: baseUrl + "api/approve-access",
      type: "post",
      dataType: "json",
      data:JSON.stringify(dataJson),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
      success: function (response) {
        swal.close();
        $("#man-access-table").dataTable().fnDestroy();
        if(response.statusCode == 200){
            toastr.success(response.message, 'Successful!', { "showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000 });

        }else {
            swal({
                title: "",
                type: "error",
                text: response.message,
                showConfirmButton: true,
                allowEscapeKey: true
            });
        }
        allAccess();
        $("#approve_access").modal("hide");
        $("#man-access-table").DataTable();
      },
    });
  });

    
//   $("#reject-btn").on("click", function (e) {
//     e.preventDefault();
    
//     var dataJson = {
//       groups: [{
//         group_id: group_id,
//         progress: 3,
//         employee_id: employee_id,
//         }
//     ],
//     };
  

//     swal({ title: "Rejecting",text: "Please wait..!", showConfirmButton: false,allowEscapeKey: false,
//     });

//     $.ajax({
//       url: baseUrl + "api/approve-access",
//       type: "post",
//       dataType: "json",
//       data:JSON.stringify(dataJson),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + myToken,
//       },
//       success: function (response) {
//         swal.close();

//         if(response.statusCode == 200){
//             toastr.success(response.message, 'Successful!', { "showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000 });
//         }

//         $("#request_access").modal("hide");

//       },
//     });
//   });



  }


function updateAccess(id,category,app,group,employee_id,progress,group_id,name,designation){

    $("#request-access").html("Edit User Access");
    $('#system_type_id').append($('<option>', {value:1, text:app}));
    $('#group_cat_id').append($('<option>', {value:1, text:category}));
    $("#update_access").modal("show");

}



function deleteAccess(id, name ) {
    var emp = $("#employee-id").val();
    swal({
        title: "Are you sure?",
        text: "You are about to delete the user access request created by "+name,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, I'm sure",
        cancelButtonText: "Cancel",
    }).then(
        result=>{
            if(result.value){   
            var image_url = baseUrl+'master/assets/img/loader.gif';
        
            var jsonData = {"access_id":id};
            swal({ title: "", text: 'Deleting ...', imageUrl: image_url, showConfirmButton: false, allowEscapeKey: false });
            $.ajax({
                url: baseUrl + "api/delete-access",
                type: 'POST',
                data: JSON.stringify(jsonData),
                // dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + myToken,
                  },
                success: function(response) {
                    swal.close();
        
                    if(response.statusCode == 200){
                        toastr.success(response.message, 'Successfull!', { "showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000 });
                        myAccess();
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
                    localStorage.removeItem('token');
                    window.location.href = baseUrl + 'logout' 
                    // swal({
                    //     title: "Technical Error",
                    //     text: "Please contact Department of ICT and Statistics",
                    //     showConfirmButton: true,
                    //     allowEscapeKey: true
                    // });
                }
            });
        }
    }
) 

}

$("#user-access-form").on("submit", function (e) {
  e.preventDefault();
  var groups = [];

  $("input:checkbox[id=access_groups]:checked").not(":disabled").each(function () {
        groups.push($(this).val());   
  });

  let jsonData = { groups: groups };

  $.ajax({
    url: baseUrl + "api/request-access",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
    success: function (response) {
      swal.close();
      if (response.statusCode == 200) {
        toastr.success(response.message, "Successfull!", {
          showMethod: "slideDown",
          hideMethod: "slideUp",
          timeOut: 2000,
        });

        myAccess();
        $("#access_groups").html("");
        $("#request_access").modal("hide");
      }
    },
    error: function () {
        localStorage.removeItem('token');
        window.location.href = baseUrl + 'logout' 
    //   swal({
    //     title: "Technical Error",
    //     text: "Please contact Department of ICT and Statistics",
    //     showConfirmButton: true,
    //     allowEscapeKey: true,
    //   });
    },
  })
});
