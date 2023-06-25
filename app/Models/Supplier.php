<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'firstName', 'lastName','companyName','title'  ,'email','gender', 'countryId'     
    ];

    public function nations()
    {
        return $this->belongsTo(Nation::class, 'countryId','id');
    }





}
