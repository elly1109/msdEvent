<div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li>
                    <a href="{{url('dashboard')}}"><i class="la la-dashboard"></i> <span> Dashboard</span></a>
                </li>
                {{-- @can('applyovertime') --}}
                 <li>
                    <a href="{{url('suppliers')}}"><i class="la la-clock-o"></i> <span> Attendees</span></a>
                </li>
                {{-- @endcan --}}

                 <li>
                    <a href="{{url('events')}}"><i class="la la-plane"></i> <span> Event</span></a>
                </li>

                

               
               

               

          
            </ul>
        </div>
    </div>
</div>


