<?php

use Illuminate\Http\Request;
use Laravel\Passport\Client;
use App\Participant;
use App\Admin;
use App\Tour;
use App\Team;
use App\Event;
use App\Location;
use App\Question;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

/* Auth */
Route::post('user', 'UserController@singup');
Route::post('user/singin', 'UserController@singin');
// Route::group([
//     'prefix' => 'auth'
// ], function () {
//     Route::post('login', 'AuthController@login');
// 	Route::post('signup', 'AuthController@signup');
	
//     Route::group([
//       'middleware' => 'auth:api'
//     ], function() {
//         Route::get('logout', 'AuthController@logout');
//         Route::get('user', 'AuthController@user');
//     });
// });

// Route::apiResource('/tours','TourController');
// Route::apiResource('/teams','TeamController');
// Route::apiResource('/participants','ParticipantController');
// Route::apiResource('/events','EventController');
// Route::apiResource('/locations','LocationController');
// Route::apiResource('/questions','QuestionController');

/* Participants routes */
Route::get('participants', 'ParticipantController@index');
Route::get('participants/{participant}', 'ParticipantController@show');
Route::post('participants', 'ParticipantController@store');
Route::put('participants/{participant}', 'ParticipantController@update');
Route::delete('participants/{participant}', 'ParticipantController@delete');

/* Admins */
Route::get('admins', 'AdminController@index');
Route::get('admins/{admin}', 'AdminController@show');
Route::post('admins', 'AdminController@store');
Route::put('admins/{admin}', 'AdminController@update');
Route::delete('admins/{admin}', 'AdminController@delete');

/* Tours */
Route::get('tours', 'TourController@index');
Route::get('tours/{tour}', 'TourController@show');
Route::post('tours', 'TourController@store');
Route::put('tours/{tour}', 'TourController@update');
Route::delete('tours/{tour}', 'TourController@delete');

/* Teams */
Route::get('teams', 'TeamController@index');
Route::get('teams/{pin}', 'TeamController@show');
Route::post('teams', 'TeamController@store');
Route::put('teams/{team}', 'TeamController@update');
Route::delete('teams/{team}', 'TeamController@delete');

/* Events */
Route::get('events', 'EventController@index');
Route::get('events/{id}', 'EventController@show');
/* locations */
Route::get('locations', 'LocationController@index');
Route::get('locations/{id}', 'LocationController@show');

/* questions */
Route::get('questions/{id}', 'QuestionController@show');


Route::post('/register-user', function (Request $request) {

	$name = $request->input('name');
	$team_id = $request->input('team_id');

    // save new user
    $user = Participant::create([
		'name' => $name,
		'team_id' => $team_id,
    ]);


    // create oauth client
    $oauth_client = Client::create([
        'user_id' => $user->id,
        'name' => $name,
        'secret' => '',
        'password_client' => 0,
        'personal_access_client' => 1,
        'redirect' => '',
        'revoked' => 0,
    ]);


    return [
        'message' => 'participant successfully created.'
    ];
});