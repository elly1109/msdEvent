<div class="header">

    <!-- Logo -->
    <div class="header-left">
        <a href="{{url('dashboard')}}" class="logo">
            <img src="{{asset('assets/wp-content/uploads/event-logo2.png')}}" width="80" height="60" alt="">
        </a>
    </div>
    <!-- /Logo -->

    <a id="toggle_btn" href="javascript:void(0);" style="margin-top: 20px">
					<span class="bar-icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
    </a>

    <!-- Header Title -->
    <div class="page-title-box">
        <h3>MSD Events</h3>
    </div>
    <!-- /Header Title -->

    <a id="mobile_btn" class="mobile_btn" href="#sidebar"><i class="fa fa-bars"></i></a>

    <!-- Header Menu -->
    <ul class="nav user-menu">

        <!-- Search -->
        {{-- <li class="nav-item">
            <div class="top-nav-search">
                <a href="javascript:void(0);" class="responsive-search">
                    <i class="fa fa-search"></i>
                </a>
                <form action="search.html">
                    <input class="form-control" type="text" placeholder="Search here">
                    <button class="btn" type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </li> --}}
        <!-- /Search -->


        <li class="nav-item dropdown has-arrow main-drop">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
							<span class="user-img"><img src="{{asset('master/assets/img/profiles/avatar-21.jpg')}}" alt="">
							<span class="status online"></span></span>
                <span>{{ auth()->user()->username }}</span>
            </a>
            <div class="dropdown-menu">
                {{-- <a class="dropdown-item" href="{{url('employee-profile/'.Auth::user()->employees->id)}}">My Profile</a> --}}
                <a class="dropdown-item" href="javascript:void(0);">Settings</a>
                <a class="dropdown-item"  href="{{url('logout')}}">Logout</a>
            </div>
        </li>
    </ul>
    <!-- /Header Menu -->

    <!-- Mobile Menu -->
    <div class="dropdown mobile-user-menu">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
        <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="profile.html">My Profile</a>
            <a class="dropdown-item" href="settings.html">Settings</a>
            <a class="dropdown-item" href="{{url('logout')}}">Logout</a>
        </div>
    </div>
    <!-- /Mobile Menu -->

</div>




{{--<nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">--}}
{{--    <div class="navbar-header">--}}
{{--        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>--}}
{{--        --}}{{-- <form role="search" class="navbar-form-custom" action="http://webapplayers.com/inspinia_admin-v2.9.4/search_results.html">--}}
{{--            <div class="form-group">--}}
{{--                <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">--}}
{{--            </div>--}}
{{--        </form> --}}
{{--    </div>--}}
{{--        <ul class="nav navbar-top-links navbar-right">--}}
{{--            <div class="dropdown profile-element mr-2 mt-3">--}}
{{--                <a data-toggle="dropdown" class="dropdown-toggle" href="#">--}}
{{--                    <span class="text-muted text-xs block font-bold">{{ auth()->user()->name }}<b class="caret"></b></span>--}}
{{--                </a>--}}
{{--                <ul class="dropdown-menu animated fadeInRight m-t-xs">--}}
{{--                    <li><a class="dropdown-item" href="profile.html">Profile</a></li>--}}
{{--                    <li><a class="dropdown-item" href="{{url('admin-panel')}}">Admin Panel</a></li>--}}
{{--                    <li class="dropdown-divider"></li>--}}
{{--                    <li><a class="dropdown-item" href="{{URL('logout')}}"><i class="fa fa-sign-out"></i>Logout</a></li>--}}
{{--                </ul>--}}
{{--            </div>--}}

{{--            --}}{{-- <li class="nav-header">--}}
{{--                <div class="dropdown profile-element">--}}
{{--                    <img alt="image" class="rounded-circle" src="img/profile_small.html"/>--}}
{{--                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">--}}
{{--                        <span class="block m-t-xs font-bold">David Williams</span>--}}
{{--                        <span class="text-muted text-xs block">Art Director <b class="caret"></b></span>--}}
{{--                    </a>--}}
{{--                    <ul class="dropdown-menu animated fadeInRight m-t-xs">--}}
{{--                        <li><a class="dropdown-item" href="profile.html">Profile</a></li>--}}
{{--                        <li><a class="dropdown-item" href="contacts.html">Contacts</a></li>--}}
{{--                        <li><a class="dropdown-item" href="mailbox.html">Mailbox</a></li>--}}
{{--                        <li class="dropdown-divider"></li>--}}
{{--                        <li><a class="dropdown-item" href="login.html">Logout</a></li>--}}
{{--                    </ul>--}}
{{--                </div>--}}
{{--                <div class="logo-element">--}}
{{--                    IN+--}}
{{--                </div>--}}
{{--            </li> --}}
{{--           --}}
{{--        </ul>--}}

{{--    </nav>--}}