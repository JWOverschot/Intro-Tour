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
            // tour 1
        [
        'trigger' => '{"type": "location", "data": {"location_id": 1}}',
        'action' => '{"type": "question", "data": {"question_id": 1, "points": 500, "devider": 3, "timeLimit": 240}}'
        ],
        [
        'trigger' => '{"type": "location", "data": {"location_id": 2}}',
        'action' => '{"type": "question", "data": {"question_id": 2, "points": 150, "devider": 2, "timeLimit": 240}}'
        ],
        [
        'trigger' => '{"type": "location", "data": {"location_id": 3}}',
        'action' => '{"type": "question", "data": {"question_id": 3, "points": 135, "devider": 2, "timeLimit": 60}}'
        ],
        // tour 2
        [
            'trigger' => '{"type": "location", "data": {"location_id": 4}}',
            'action' => '{"type": "question", "data": {"question_id": 4, "points": 135, "devider": 2, "timeLimit": 60}}'
        ],
        [
            'trigger' => '{"type": "location", "data": {"location_id": 5}}',
            'action' => '{"type": "question", "data": {"question_id": 5, "points": 135, "devider": 2, "timeLimit": 60}}'
        ],
        [
            'trigger' => '{"type": "location", "data": {"location_id": 6}}',
            'action' => '{"type": "question", "data": {"question_id": 6, "points": 135, "devider": 2, "timeLimit": 60}}'
        ],
        // tour 3
        [
            'trigger' => '{"type": "location", "data": {"location_id": 7}}',
            'action' => '{"type": "question", "data": {"question_id": 7, "points": 135, "devider": 2, "timeLimit": 60}}'
        ],
        [
            'trigger' => '{"type": "location", "data": {"location_id": 8}}',
            'action' => '{"type": "question", "data": {"question_id": 8, "points": 135, "devider": 2, "timeLimit": 60}}'
        ],
        [
            'trigger' => '{"type": "location", "data": {"location_id": 9}}',
            'action' => '{"type": "question", "data": {"question_id": 9, "points": 135, "devider": 2, "timeLimit": 60}}'
        ]
        ]);

        DB::table('event_tour')->insert
        ([
            // tour 1
            [
                'tour_id' => 1,
                'event_id' => 1
            ],
            [
                'tour_id' => 1,
                'event_id' => 2
            ],
            [
                'tour_id' => 1,
                'event_id' => 3
            ],
            // tour 2
            [
                'tour_id' => 2,
                'event_id' => 4
            ],
            [
                'tour_id' => 2,
                'event_id' => 5
            ],
            [
                'tour_id' => 2,
                'event_id' => 6
            ],
            // tour 3
            [
                'tour_id' => 3,
                'event_id' => 7
            ],
            [
                'tour_id' => 3,
                'event_id' => 8
            ],
            [
                'tour_id' => 3,
                'event_id' => 9
            ]
        ]);
    }
}
