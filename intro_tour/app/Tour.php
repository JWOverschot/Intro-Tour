<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable = [
		'name', 'team_limit', 'description', 'tour_code', 'time_limit', 'time_start'
	];
}
