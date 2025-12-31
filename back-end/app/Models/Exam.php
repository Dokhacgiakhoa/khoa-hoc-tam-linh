<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'category',
        'level',
        'description',
        'duration',
        'passing_score',
        'prerequisites'
    ];

    protected $casts = [
        'prerequisites' => 'array',
        'duration' => 'integer',
        'passing_score' => 'integer'
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function userExams()
    {
        return $this->hasMany(UserExam::class);
    }
}
