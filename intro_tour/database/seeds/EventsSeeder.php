<?php

use Illuminate\Database\Seeder;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert 
        ([
        [
        'trigger' => '{"type": "location", "data": {"location_id": 1}}',
        'action' => '{"type": "question", "data": {"question_id": 1, "points": 500, "devider": 3, "timeLimit": 30}}'
        ],
        [
        'trigger' => '{"type": "location", "data": {"location_id": 2}}',
        'action' => '{"type": "question", "data": {"question_id": 2, "points": 150, "devider": 2, "timeLimit": 60}}'
        ]
        ]);

        DB::table('event_tour')->insert
        ([
            [
                'tour_id' => 1,
                'event_id' => 1
            ],
            [
                'tour_id' => 1,
                'event_id' => 2
            ]
        ]);
    }
}
