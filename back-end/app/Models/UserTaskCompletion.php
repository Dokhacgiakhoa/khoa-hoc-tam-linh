<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTaskCompletion extends Model
{
    protected $fillable = [
        'user_id',
        'task_id',
        'completed_at'
    ];

    protected $casts = [
        'completed_at' => 'datetime'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
