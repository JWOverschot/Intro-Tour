<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $casts = [
        'radius' => 'array'
    ];

    protected $fillable = [
        'radius', 'name', 'description', 'longitude', 'latitude'
    ];
}
