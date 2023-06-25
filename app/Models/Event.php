<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplierId', 'checkIn' , 'orderNo'       
    ];

    public function suppliers()
    {
        return $this->belongsTo(Supplier::class, 'supplierId','id');
    }

    
    
}
