<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'exam_id',
        'content',
        'options',
        'correct_answer',
        'type'
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
