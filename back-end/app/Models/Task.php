<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'reward_amount',
        'frequency',
        'type',
        'data'
    ];

    protected $casts = [
        'data' => 'array'
    ];

    public function completions()
    {
        return $this->hasMany(UserTaskCompletion::class);
    }
}
