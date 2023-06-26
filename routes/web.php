<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\EventController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home.index');
});

Route::get('auth', function () {
    return view('auth.login');
})->name('auth');


Route::post('auth/login',[AuthController::class,'login']);


Route::group(['middleware' => 'auth'], function(){
    Route::get('logout',[AuthController::class,'logout']);
    Route::get('dashboard',[AuthController::class,'dashboard']);
    Route::get('suppliers',[SupplierController::class,'index']);
    Route::get('checkin',[EventController::class,'index']);
    Route::get('qrcode/{id}',[EventController::class,'download']);


});


