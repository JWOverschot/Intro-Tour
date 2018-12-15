<?php

namespace App\Http\Controllers;

use App\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Participant::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $participant = Participant::create($request->all());

        return response()->json($participant, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Participant  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Participant::where('id', $id)->get();
    }

    /**
     * Display the specified resource.
     * 
     * @param   \App\Participant  $pin
     * @return  \Illuminate\Http\Response
     */
    public function showTwo($pin)
    {
        return Participant::where('team_id', $pin)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Participant  $participant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Participant $participant)
    {
        $participant->update($request->all());

        return response()->json($participant, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Participant  $participant
     * @return \Illuminate\Http\Response
     */
    public function delete(Participant $participant)
    {
        $participant->delete();

        return response()->json(null, 204);
    }
}
