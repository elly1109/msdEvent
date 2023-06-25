@extends('dashboard.new')

@section('content')
    <div class="page-wrapper">

        <!-- Page Content -->
        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Welcome {{Auth::user()->name}}</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- /Page Header -->

            <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-4 col-xl-4">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="la la-users" style="margin-top: 15px"></i></span>
                            <div class="dash-widget-info">
                                <h3 id="attendees">{{$suppliers}}</h3>
                                <span>Attendees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-4 col-xl-4">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="la la-users" style="margin-top: 15px"></i></span>
                            <div class="dash-widget-info">
                                <h3 id="checked">{{$checked}}</h3>
                                <span>CheckIn</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-4 col-xl-4">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="la la-users" style="margin-top: 15px"></i></span>
                            <div class="dash-widget-info">
                                <h3 id="not_checked">{{$not_checked}}</h3>
                                <span>Absent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            




        </div>
        <!-- /Page Content -->

    </div>




    <!--  END CONTENT AREA  -->


   
@endsection
