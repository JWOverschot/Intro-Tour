<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\EventTour;
use Response;
use DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $events = DB::table('EventTour')
        // ->join('tours', 'tour_id', '=', 'tours.id')
        // ->join('events', 'event_id', '=', 'events.id')
        // ->get();

        $events = EventTour::with('event')
        ->with('tour')
        ->get();

        return $events;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = Event::create($request->all());

        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $events = EventTour::with('event')->with('tour')->where('tour_id', '=', $id)->get();
        return $events;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function storeEventTour(Request $request)
    {
        $event_tour = EventTour::create($request->all());

        return response()->json($event_tour, 201);
    }

    public function deleteEventTour($id)
    {
        EventTour::where('event_id', $id)->delete();

        return response()->json(null, 204);
    }
}
