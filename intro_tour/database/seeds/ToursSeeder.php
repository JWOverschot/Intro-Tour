<?php

use Illuminate\Database\Seeder;

class ToursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('Tours')->insert 
        ([
            [
                'name' => "Introductie Applicatie Ontwikkelaar",
                'team_limit' => 2,
                'description' => "Weet jij alle vragen te beantwoorden? Vind alle vragen versprijdt over het leerpark",
				'tour_code' => 778899,
				'time_limit' => 10800
            ],
            [
                'name' => 'Rondje Dord',
                'team_limit' => 10,
				'description' => 'Kom alles te weten over de Historische binnenstad van Dordrecht.',
				'tour_code' => 123456,
                'time_limit' => 5400
            ],
            [
                'name' => 'Mc Tour',
                'team_limit' => 5,
                'description' => 'Een zoektocht naar alle McDonald\'s in Nederland',
				'tour_code' => 654321,
				'time_limit' => 60
            ]
        ]);

    }
}
