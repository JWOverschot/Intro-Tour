<?php

namespace App\Http\Controllers;

use App\Tour;
use Illuminate\Http\Request;
use Exception;

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Tour::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tour = Tour::create($request->all());

        return response()->json($tour, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tour  $tour
     * @return \Illuminate\Http\Response
     */
    public function show($code)
    {
        try {
            $tour = Tour::where('tour_code', $code)->get();

            if ($tour) {
                throw new Exception('No tour found', 404);
            } else {
                return response()->json($tour, 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'error' => [
                    'msg' => $e->getMessage(),
                    'code' => $e->getCode()
                ]
            ], $e->getCode());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tour  $tour
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $code)
    {
        $tour = Tour::where('tour_code', $code)->update($request->all());

        return response()->json($tour, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tour  $tour
     * @return \Illuminate\Http\Response
     */
    public function delete(Tour $tour)
    {
        $tour->delete();

        return response()->json(null, 204);
    }
}
