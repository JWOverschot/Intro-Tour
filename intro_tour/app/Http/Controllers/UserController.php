<?php

namespace App\Http\Controllers;

use App\User;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserController extends extends Authenticatable implements JWTSubject
{
    public function singup(Request $request)
	{
		$this->validate($request, [
			'name' => 'required',
			'email' => 'required|email|unique:users',
			'password' => 'required'
		]);

		$user = new User ([
			'name' => $request->input('name'),
			'email' => $request->input('email'),
			'password' => bcrypt($request->input('password'))
		]);
		$user->save();
		return response()->json([
			'message' => 'User created'
		], 201);
	}

	public function singin(Request $request)
	{
		$this->validate($request, [
			'name' => 'required',
			'email' => 'required|email',
			'password' => 'required'
		]);

		$credentials = $request->only('email', 'password');
		try {
			if (!$token = JWTAuth::attempt($credentials)) {
				return response()->json([
					'error' => 'Invalid credentials'
				], 401);
			}
		} catch (JWTExeption $ex) {
			return response()->json([
				'error' => 'Could not create token'
			], 500);
		}

		return response()->json([
			'token' => $token
		], 200);
	}
}
