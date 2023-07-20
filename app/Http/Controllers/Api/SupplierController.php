<?php

namespace App\Http\Controllers\Api;

use App\Models\Supplier;
use App\Models\Event;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Rules\MaxAttendeesFromCompany;




class SupplierController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
        $this->middleware('check.company.attendee.count:83,85,86,87,94,99,109,181,182,183,184,185,186')->only('store'); // Apply the middleware to the register method.
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        if(!Auth::check()){
            return redirect('/');
        }
        
        $user = Auth::user();
        // if($this->authorize('view all employees')){
            $suppliers  =  Supplier::orderby('id')->get();

            return $this->sendResponse($suppliers, "Records Found!", 200);
        
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // $rules = array('email' => 'unique:users,email');

        $data = Validator::make($request->all(),
        [
            'firstName' => 'string | required',
            'lastName' => 'string | required',
            'gender' => 'string | required',
            'email'=>'required|unique:suppliers,email',
            'companyId' => 'integer | required',
            'title' => 'string | nullable',
            'suffix' => 'string | nullable',
            'prefix' => 'string | nullable',
            'phoneNumber' => 'required',
        ]);

        if($data->fails()){
            return $this->sendError('Validation Error',$data->errors(),403);  
        }

       

        $supp = new Supplier();
        $supp->firstName = $request['firstName'];
        $supp->lastName = $request['lastName'];
        $supp->gender = $request['gender'];
        $supp->email = $request['email'];
        $supp->companyId = $request['companyId'];
        $supp->countryId = $request['countryId'];
        $supp->phoneNumber = $request['phoneNumber'];
        $supp->title = $request['title'];
        $supp->prefix = $request['prefix'];
        $supp->suffix = $request['suffix'];
       

    
        if ($supp->save()) {

            // save to checkin table
            $order_number = Event::max('orderNo');
            $count = (int) substr($order_number, 3);
        
            $order_no = 'MSD' . Str::padLeft($count + 1, 4, '0');

            $checkIn = new Event();

            $checkIn->supplierId = $supp->id;
            $checkIn->orderNo = $order_no;
            $checkIn->checkedIn = '0';

            if($checkIn->save()){

                $details = [
                    'orderNumber' => $checkIn->orderNo,
                    'name'=>$supp->firstName,
                ];

                $qrcode = base64_encode(QrCode::size(100)->generate(Hash::make($checkIn->orderNo)));

        $html ='
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
        <title>Title</title>
        <style>

            @page {
                margin-bottom: 2cm;
                margin-left: 2cm;
                margin-right: 2cm;
                margin-top: 2cm;
                page-break-before: always;
            }
          
            body {
    
    font-family: Arial, Helvetica, sans-serif;  font-size: 11px;

   }

   .watermark{
	background: url("https://portal.msd.go.tz/web/images/msd_login_logo.png");
	background-repeat: no-repeat;
	background-position:center;
	position: absolute;
	background-attachment: fixed;
	width: 100%;
	height: 50%;
    margin: 0 auto;
    z-index: -1;
	opacity: 0.1
   }
   
   .ticket-wrap {
    text-align: center;
	position:relative;

   }

   .ticket {
    display: inline-block;
    margin: 0 auto;
    position:relative;
    border: 2px solid #9facbc;
    font-family: "Variable Bahnschrift", "FF DIN", "Franklin Gothic", "Helvetica Neue", sans-serif;
    font-feature-settings: "kern" 1;
    
   }

.ticket__header {
 margin: 0;
 padding: 1.5em;
 background: #f4f5f6;
}

.ticket__co span,
.ticket__route span {
 display: block;
}

.ticket__co {
 display: inline-block;
 position: relative;
 padding-left: 5em;
 line-height: 1;
 color: #5e7186;
}

.ticket__co-icon {
 position: absolute;
 top: 50%;
 margin-top: -2em;
 left: 0;
 width: 4em;
 height: auto;
}

.ticket__co-name {
    left: 1em;
 font-size: 2.5em;
 font-variation-settings: "wght" 500, "wdth" 75;
 letter-spacing: -.01em;
}

.ticket__co-subname {
 font-variation-settings: "wght" 700;
 color: #506072;
}

.ticket__body {
 padding: 1.5rem 1.25em 1.25em;
}


.ticket__route {
 font-variation-settings: "wght" 300;
 font-size: 2em;
 line-height: 1.1;
}

.ticket__description {
 margin-top: .1em;
 font-variation-settings: "wght" 350;
 font-size: 1.125em;
 color: #506072;
}

.ticket__timing {
 display: flex;
 align-items: center;
 margin-top: 1rem;
 padding: 1rem 0;
 border-top: 2px solid #9facbc;
 border-bottom: 2px solid #9facbc;
 text-align: left;
}

.ticket__timing p {
 margin: 0 1rem 0 0;
 padding-right: 1rem;
 border-right: 2px solid #9facbc;
 line-height: 1;
}

.ticket__timing p:last-child {
 margin: 0;
 padding: 0;
 border-right: 0;
}

.ticket__small-label {
 display: block;
 margin-bottom: .5em;
 font-variation-settings: "wght" 300;
 font-size: .875em;
 color: #506072;
}

.ticket__detail {
 font-variation-settings: "wght" 700;
 font-size: 1.25em;
 color: #424f5e;
}

.ticket__admit {
 margin-top: 2rem;
 font-size: 2.5em;
 font-variation-settings: "wght" 700, "wdth" 85;
 line-height: 1;
 color: #657990;
}

.ticket__fine-print {
 margin-top: 1rem;
 font-variation-settings: "wdth" 75;
 color: #666;
}

.ticket__barcode {
 margin-top: 1.20em;
 width: 299px;
    max-width:100%;
}

@media (min-width: 36em) {
 .ticket-wrap {
  margin-bottom: 4em;
  text-align: center;
 }

 .ticket {
  margin: 0 auto;
 }

 .ticket__header {
  margin: 0;
  padding: 1.5em;
 }

 .ticket__body {
  padding: 2rem 2em 2em;
 }

 .ticket__detail {
  font-size: 1.75em;
 }

 .ticket__admit {
  margin-top: 2rem;
 }
}

@supports (display: grid) {
 @media (min-width: 72em) {
  .ticket-info,
  .ticket-wrap {
   align-self: center;
  }

  .ticket-wrap {
   order: 2;
   margin-bottom: 0;
  }

  .ticket-info {
   order: 1;
  }
 }
}

        </style>
        </head>
        <body>
<div class="ticket-wrap " aria-label="A fake boat ticket demonstrating mixing font weights and widths">
  <div class="ticket  " aria-hidden="true">
    <div class="watermark">
		</div>
  
    <div class="ticket__header">
      <div class="ticket__co">
        <span class="ticket__co-name">MSD Business Meeting</span>
      </div>
    </div>
    <div class="ticket__body">
      <p class="ticket__route">' .$supp->prefix .' ' .$supp->firstName .' ' .$supp->lastName .' ' .$supp->suffix .' </p>
      <p class="ticket__description">' .$supp->title .'</p>
      <p class="ticket__description">' .$supp->companyName .', ' .$supp->nations->iso .'</p>
      <div class="ticket__timing">
        <p>
          <span class="u-upper ticket__small-label">Venue</span>
          <span class="ticket__detail">Johari Rotana, Dar es Salaam</span>
        </p>
        <p>
          <span class="u-upper ticket__small-label">Date</span>
          <span class="ticket__detail">July 21, 2023</span>
        </p>
        <p>
          <span class="u-upper ticket__small-label">Time</span>
          <span class="ticket__detail">18:00 - 21:30 hrs</span>
        </p>
      </div>
      <div class="ticket__barcode">
  <img src="data:image/png;base64, ' .$qrcode .'">
  <p class="ticket-number"># ' .$checkIn->orderNo .'</p>
      </div>
      </div>
      <p class="ticket__fine-print">This ticket cannot be transferred to another voyage</p>
      </div>
   </div>
</body>
</html>
';
                $pdf = PDF::loadHTML($html); 
                Mail::to($supp->email)->send(new \App\Mail\EventMail($details,$pdf->output()));
                return $this->sendResponse($supp, 'You have registered successfully!', 201);
            }
        
        } else {
            return $this->sendError('Failed to register.', [], 500);
        }

    }


    /**
     * Display the specified resource.
     */
    public function show(supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, supplier $supplier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(supplier $supplier)
    {
        //
    }
}
