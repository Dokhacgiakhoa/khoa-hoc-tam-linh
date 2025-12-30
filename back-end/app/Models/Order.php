<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_id',
        'customer_name',
        'items',
        'total',
        'method',
        'status',
    ];

    protected $casts = [
        'items' => 'json',
        'total' => 'decimal:2',
    ];
}
