<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="DICTS">  
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-Frame-Options" content="DENY">
        <meta name="robots" content="noindex">
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">
            <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="{{asset('assets/css/bootstrap.min.css')}}">

        <!-- Fontawesome CSS -->
        <link rel="stylesheet" href="{{asset('assets/css/font-awesome.min.css')}}">

        <!-- Lineawesome CSS -->
        <link rel="stylesheet" href="{{asset('assets/css/line-awesome.min.css')}}">

        <style>
            .context{
                background-color: #fff;
            }

            body{
                font-family: Arial, Helvetica, sans-serif;  font-size: 11px;
                background-color: #e4e3e3

            }
        </style>
    </head>
    <body class="antialiased ">
        <div class="text-center" style="width: 50%;">
            <div class="card context">
             <div class="card-header">
                 <h2>{{ $details['title'] }}</h2>
             </div>
             <div class="card-body">
                <section>
                    <div class="text-center">

                        <p class="text-muted">ticket # {{$details['orderNumber']}}</p>
                        <h3>Hi {{$details['name']}},</h3>
                        <p>Thanks for registering to attend MSD 2023 Business Meeting, This Business Meeting shall focus on promoting and solidifying better partnerships and cooperation among stakeholders (removing barriers), improving pharmaceutical business services in the country, and strengthening the health commodities supply chain.</p>

                        <p>For more information about this event, please check out the <a href="https://event.msd.go.tz" >Chat & Dine website</a> </p>

                        <p>Cheers,</p>
                        <img src="https://portal.msd.go.tz/web/images/msd_login_logo.png" alt="msd" >
                        <p>Chat & Dine Committee</p>

                    </div>
                </section>
             </div>
         </div>

        </div>
    </body>
</html>