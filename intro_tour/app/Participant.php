<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiToken;
use Illuminate\Notifaications\Notifiable;
use Illuminate\Foundation\Auth\Participant as Authenticatable;

class Participant extends Authenticatable
{
	use HasApiToken, Notifiable;
	
	//protected $table = 'participants';
    protected $fillable = [
        'id', 'name', 'team_id'
    ];
}
