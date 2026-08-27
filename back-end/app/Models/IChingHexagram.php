<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IChingHexagram extends Model
{
    use HasFactory;

    protected $table = 'iching_hexagrams';

    protected $fillable = [
        'hexagram_number',
        'name_vi',
        'name_chinese',
        'pinyin',
        'upper_trigram',
        'lower_trigram',
        'binary_code',
        'general_meaning',
        'judgment',
        'image_meaning',
        'lines_explanation',
        'action_advice',
        'tags'
    ];

    protected $casts = [
        'hexagram_number' => 'integer',
        'lines_explanation' => 'array',
        'tags' => 'array'
    ];
}
