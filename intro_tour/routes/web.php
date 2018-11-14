<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/passport', function () {
    return view('vendor/passport/authorize');
});

Route::get('/redirect', function()
{
	$query = http_build_query([
		'client_id' => 'client-id',
		'redirect_uri' => 'http://intro-tour.local/callback',
		'response_type' => 'code',
		'scope' => ''
	]);

	return redirect('http://intro-tour.local/oauth/authorize?'.$query);
});