<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminTour extends Model
{
    protected $table = 'admin_tour';

    public function admin(){
        return $this->hasOne('App\Admin', 'id', 'admin_id');
    }

    public function tour(){
        return $this->hasOne('App\Tour', 'tour_code', 'tour_id');
    }
}
