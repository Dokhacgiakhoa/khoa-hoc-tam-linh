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
        'coupon_code',
        'discount_amount',
        'method',
        'status',
    ];

    protected $casts = [
        'items' => 'json',
        'total' => 'decimal:2',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
