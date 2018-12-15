<?php

use Illuminate\Database\Seeder;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questions')->insert
        ([
        // tour 1
        [
            'question' => "Hoe heet het hoofdgebouw van het leerpark?"
        ],
        [
            'question' => "Hoeveel jaar duurt de opleiding applicatie ontwikkelaar?"
        ],
        [
            'question' => "Als je op de glijbaan gaat, ben je dan nog steeds cool?"
        ],
        // tour 2
        [
            'question' => 'Hoe oud is de stad Dordrecht?'
        ],
        [
            'question' => 'Is Dordrecht een eiland?'
        ],
        [
            'question' => 'Hoeveel traptreden heeft de grote kerk?'
        ],
        // tour 3
        [
            'question' => 'Hoeveel medewerkers heeft de McDonald\'s in Nederland?'
        ],
        [
            'question' => 'Gebruiken alle restaurants groene energie?'
        ],
        [
            'question' => 'Is het waar dat het rundvlees uit 100% rundvlees bestaat?'
        ]
        ]);

        DB::table('answers')->insert
        ([
        //vraag 1 tour 1
        [
        'answer' => "Azzuro",
        'right_answer' => "0",
        'question_id' => 1,
        ],
        [
        'answer' => "Bianco",
        'right_answer' => "1",
        'question_id' => 1,
        ],
        [
        'answer' => "Celeste",
        'right_answer' => "0",
        'question_id' => 1,
        ],
        // vraag 2 tour 1
        [
        'answer' => "3 jaar",
        'right_answer' => "1",
        'question_id' => 2,
        ],
        [
        'answer' => "4 jaar",
        'right_answer' => "0",
        'question_id' => 2,
        ],
        [
        'answer' => "6 jaar",
        'right_answer' => "0",
        'question_id' => 2,
        ],
        // vraag 3 tour 1
        [
        'answer' => "Ja",
        'right_answer' => "1",
        'question_id' => 3,
        ],
        [
        'answer' => "Nee",
        'rigth_answer' => "0",
        'question_id' => 3
        ],
        // vraag 1 tour 2
        [
            'answer' => 'Meer dan 100 jaar',
            'rigth_answer' => "0",
            'question_id' => 4
        ],
        [
            'answer' => 'Meer dan 200 jaar',
            'rigth_answer' => "1",
            'question_id' => 4
        ],
        [
            'answer' => 'Meer dan 300 jaar',
            'rigth_answer' => '0',
            'question_id' => 4
        ],
        // vraag 2 tour 2
        [
            'answer' => 'Ja',
            'rigth_answer' => '1',
            'question_id' => 5
        ],
        [
            'answer' => 'Nee',
            'rigth_answer' => '0',
            'question_id' => 5
        ],
        // vraag 3 tour 2
        [
            'answer' => '250',
            'rigth_answer' => '0',
            'question_id' => 6
        ],
        [
            'answer' => '275',
            'rigth_answer' => '1',
            'question_id' => 6
        ],
        // vraag 1 tour 3
        [
            'answer' => '19000',
            'rigth_answer' => '0',
            'question_id' => 7
        ],
        [
            'answer' => '19500',
            'rigth_answer' => '1',
            'question_id' => 7
        ],
        [
            'answer' => '20000',
            'rigth_answer' => '0',
            'question_id' => 7
        ],
        // vraag 2 tour 3
        [
            'answer' => 'Ja',
            'rigth_answer' => '1',
            'question_id' => 8
        ],
        [
            'answer' => 'Nee',
            'rigth_answer' => '0',
            'question_id' => 8
        ],
        // vraag 3 tour 3
        [
            'answer' => 'Waar',
            'rigth_answer' => '1',
            'question_id' => 9
        ],
        [
            'answer' => 'Niet Waar',
            'rigth_answer' => '0',
            'question_id' => 9
        ]
        ]);

    }
}
