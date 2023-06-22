<?php

namespace App\Http\Controllers\Api;

use App\Models\Supplier;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $supplier = Supplier::create($request->all());

        return response()->json([
            'data'=>$supplier,
            'statusCode'=> 201,
            'success'=>true,
            'message'=> "You have Registered Successfully"
        ]);

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
