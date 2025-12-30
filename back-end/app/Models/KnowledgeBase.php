<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeBase extends Model
{
    protected $table = 'knowledge_base';

    protected $fillable = [
        'category',
        'type',
        'slug',
        'title',
        'content',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'json'
    ];
}
