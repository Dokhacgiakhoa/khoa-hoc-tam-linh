<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['service_id', 'name', 'price', 'description', 'category_id'];

    public function orderItems()
    {
        return $this->morphMany(OrderItem::class, 'buyable');
    }

    public function category()
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }
}
