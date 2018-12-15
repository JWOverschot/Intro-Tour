<?php

use Illuminate\Database\Seeder;

class LocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('Locations')->insert
        ([
            // tour 1
        [
            'name' => "test position",
            'description' => "this is a test postition",
            'radius' => '{"type": "circle", "data": 12}',
            'longitude' => 4.683647,
            'latitude' => 51.798856,
        ],
        [
            'name' => "test position 2",
            'description' => "this is a test postition 2",
            'radius' => '{"type": "circle", "data": 12}',
            'longitude' => 4.783647,
            'latitude' => 51.898856,
        ],
        [
            'name' => 'De glijbaan',
            'description' => "Ga op zoek naar een glijbaan",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.682584,
            'latitude' => 51.799056
        ],
        // tour 2
        [
            'name' => 'Leeftijd',
            'description' => "Hoe oud is de stad nu echt?",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.670345,
            'latitude' => 51.819726
        ],
        [
            'name' => 'Wat een water',
            'description' => "Tunnels, Burggen en Boten",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.663393,
            'latitude' => 51.815770
        ],
        [
            'name' => 'Oude Kerk',
            'description' => "Je zou er moe van worden",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.659396,
            'latitude' => 51.814238
        ],
        // tour 3
        [
            'name' => 'Je zou er maar werken',
            'description' => "Onddek hoeveel medewerkers er zijn",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.666816,
            'latitude' => 51.813133
        ],
        [
            'name' => 'Groen?',
            'description' => "Is de McDonald's wel groen",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.646993,
            'latitude' => 51.774148
        ],
        [
            'name' => 'Rund!',
            'description' => "Weet wat er op je burger zit",
            'radius' => '{"type": "circle", "data": 15}',
            'longitude' => 4.709117,
            'latitude' => 51.818171
        ],
        ]);
    }
}
