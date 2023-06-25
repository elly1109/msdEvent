<?php

namespace App\Http\Controllers;

use Throwable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Supplier;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function dashboard()
    {
        
        if(Auth::check()){
            $suppliers = Supplier::count();
            $checked = Event::where('checkedIn','=','1')->count();
            $not_checked = Event::where('checkedIn','=','0')->count();


            return view('dashboard.home',compact('suppliers', 'checked','not_checked'));
        }
    }

    public function login(Request $request){
            $this->validate($request,[
                'username' => 'required',
                'password' => 'required',
                ]);

                $username = $request->username;
                $password = $request->password;

                if(Auth::attempt([
                    'username' => $username,
                    'password' => $password,
                ])){
                    return redirect('dashboard');
                }else{
                    return redirect()->back();
                }
    }


    public function logout(){
        Session::flush();
        Auth::logout();
        return redirect('/');
    }
}
