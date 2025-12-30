<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'image',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class, 'category_id');
    }
}
