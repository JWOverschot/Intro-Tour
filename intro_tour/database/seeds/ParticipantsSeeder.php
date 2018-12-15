<?php

use Illuminate\Database\Seeder;

class ParticipantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$teamId1 = "A8E4";
		$teamId2 = "859A";

        DB::table('participants')->insert
        ([
            [
            'name' => "henk",
            'team_id' => $teamId1
            ],[
            'name' => "harry",
            'team_id' => $teamId1
            ],[
            'name' => "yea",
            'team_id' => $teamId2
            ],[
            'name' => "boi",
            'team_id' => $teamId2
            ]
        ]);
        
        DB::table('teams')->insert
        ([
            [
            'team_name' => "Team A",
			'tour_id' => 123456,
			'team_pin' => $teamId1,
			'team_leader' => 1
            ],[
            'team_name' => "Team Kaas",
			'tour_id' => 654321,
			'team_pin' => $teamId2,
			'team_leader' => 3
            ]
        ]);

        DB::table('admins')->insert
        ([
            [
            'username' => "NekoBot",
            'password' => "$2y$12\$hmcfHQzfFLZtVXfdGqQ6Z.PI7C395xWux0CJWtFvHeTJiCufdpxCe",
            ],[
            'username' => "KeemStar",
            'password' => "$2y$12\$hmcfHQzfFLZtVXfdGqQ6Z.PI7C395xWux0CJWtFvHeTJiCufdpxCe",
            ]
        ]);
        DB::table('admin_tour')->insert
        ([
            [
            'admin_id' => 1,
            'tour_id' => 123456,
            ],[
            'admin_id' => 1,
            'tour_id' => 654321,
            ]
        ]);
    }
}
