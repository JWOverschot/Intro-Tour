<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event\Events;
use DB;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
		event(new Events());


		if ($request->tour) {
			$id = $request->tour;
			return Team::where('tour_id', $id)->get();
		}
		else {
			return Team::all();
		}
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        // Generates team pin
        $requestData['team_pin'] = strtoupper(substr(md5(uniqid(mt_rand(), true)) , 0, 4));

        $team = Team::create($requestData);

        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  $pin
     * @return \Illuminate\Http\Response
     */
    public function show($pin)
    {
        return Team::where('team_pin', $pin)->get();
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Team $team)
    {
        $team->update($request->all());

        return response()->json($team, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function delete(Team $team)
    {
        $team->delete();

        return response()->json(null, 204);
	}
}
