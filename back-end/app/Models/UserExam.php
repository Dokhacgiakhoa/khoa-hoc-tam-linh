<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserExam extends Model
{
    protected $fillable = [
        'user_id',
        'exam_id',
        'score',
        'status',
        'completed_at'
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'score' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
