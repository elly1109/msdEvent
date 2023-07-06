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
                background-color: #f2f2f2
            }
            h3{
                color: #337BC5
            }

          
        </style>
    </head>
    <body class="antialiased ">
        <div class="con" style="width: 100%; height:70%; padding:4em 6rem;">
            <div class="card context" style="margin: 3em">
             <div class="card-header" style="margin-top: 2em">
                <h3 class="text-primary">Registration Confirmation</h3>
            </div>
             <div class="card-body">
                <section >
                    <div style="padding:1em ">
                        <p class="text-muted">Invitation # {{$details['orderNumber']}}</p>
                        <h4>Hi {{$details['name']}},</h4>
                        <p>Thanks for registering to attend MSD 2023 Business Meeting.</p>
                        <p> This Business Meeting shall focus on promoting and solidifying better partnerships and cooperation among stakeholders (removing barriers), improving pharmaceutical business services in the country, and strengthening the health commodities supply chain.</p>

                        <p>For more information about this event, please check out the <a href="https://event.msd.go.tz" >MSD Chat & Dine website</a> </p>

                        <p>We have attached an Invitation badge. Please use it upon arrival.</p>
                        
                        <p>Looking forward to meeting you.</p>

                        <p>Cheers,</p>
                        <p class="text-muted">Chat & Dine Committee</p>
                        
                    </div>
                </section>
            </div>
        </div>
        <img src="https://portal.msd.go.tz/web/images/msd_login_logo.png" alt="msd" style=" margin:1em; padding-left:0 2em " >

        </div>
    </body>
</html>