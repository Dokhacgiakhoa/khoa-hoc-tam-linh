<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class AiReadingSession extends Model
{
    use HasFactory;

    protected $table = 'ai_reading_sessions';

    protected $fillable = [
        'session_code',
        'user_id',
        'service_type',
        'user_input_data',
        'reading_result',
        'ai_interpretation',
        'ai_model_used',
        'is_unlocked',
        'rating',
        'feedback'
    ];

    protected $casts = [
        'user_input_data' => 'array',
        'reading_result' => 'array',
        'is_unlocked' => 'boolean',
        'rating' => 'integer'
    ];

    protected static function booted()
    {
        static::creating(function ($session) {
            if (empty($session->session_code)) {
                $session->session_code = 'AI-READ-' . strtoupper(Str::random(10));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
