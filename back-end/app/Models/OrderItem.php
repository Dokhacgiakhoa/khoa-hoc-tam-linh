<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'buyable_type',
        'buyable_id',
        'name',
        'price',
        'quantity',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the parent buyable model (product or course).
     */
    public function buyable()
    {
        return $this->morphTo();
    }
}
