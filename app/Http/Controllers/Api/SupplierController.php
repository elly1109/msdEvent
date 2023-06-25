<?php

namespace App\Http\Controllers\Api;

use App\Models\Supplier;
use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Mail;


class SupplierController extends Controller
{
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


        $data = Validator::make($request->all(),
        [
            'firstName' => 'string | required',
            'lastName' => 'string | required',
            'gender' => 'string | required',
            'email'=>'string | required',
            'companyName' => 'string | required',
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
        $supp->companyName = $request['companyName'];
        $supp->countryId = $request['countryId'];
        $supp->phoneNumber = $request['phoneNumber'];
        $supp->title = $request['title'];
        $supp->prefix = $request['prefix'];
        $supp->suffix = $request['suffix'];
       

    
        if ($supp->save()) {

            // save to checkin table
            $order_number = Event::max('orderNo');
            $count = (int) substr($order_number, 3);
        
            $order_no = 'MSD' . Str::padLeft($count + 1, 5, '0');

            $checkIn = new Event();

            $checkIn->supplierId = $supp->id;
            $checkIn->orderNo = $order_no;
            $checkIn->checkedIn = '0';



            // Send an email to attendee.
            // $data = array('name'=>$supp->firstName .' '. $supp->lastName);
            // $a["email"] = "eliyamasesa09.em@gmail.com";
            // $a["title"] = "MSD Business Meeting";
            // $a["body"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
     
            // $files = [
            //     public_path('attachments/demo.jpeg'),
            //     public_path('attachments/tariff_rates.pdf'),
            // ];
      
            // Mail::send('suppliers.demo_mail', $a, function($message)use($a, $files) {
            //     $message->to($a["email"])
            //             ->subject($a["title"]);

            // foreach ($files as $file){
            //     $message->attach($file);
            // }    

            // });

        
            if($checkIn->save()){

                return $this->sendResponse($supp, 'You have registered successfully!', 201);
            }
        
        } else {
            return $this->sendError('Failed to register.', [], 500);
        }
        // $supplier = Supplier::create($request->all());

        // return response()->json([
        //     'data'=>$supplier,
        //     'statusCode'=> 201,
        //     'success'=>true,
        //     'message'=> "You have Registered Successfully"
        // ]);

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
