<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'db_id';

    protected $fillable = [
        'product_id',
        'name',
        'price',
        'description',
        'image',
        'stock',
        'views',
        'category_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    protected $appends = ['id', 'image_url', 'img'];

    public function getIdAttribute()
    {
        return $this->db_id;
    }

    public function getImageUrlAttribute()
    {
        return $this->image;
    }

    public function getImgAttribute()
    {
        return $this->image;
    }

    /**
     * Get all order items for this product.
     */
    public function orderItems()
    {
        return $this->morphMany(OrderItem::class, 'buyable');
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }
}
