<?php

use Illuminate\Database\Seeder;

class HintsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hints')->insert(
            [
                // tour 1
                [
                    'hint' => 'In de buurt van het gebouw met die kleurtjes',
                    'event_id' => 1,
                    'cost' => 100
                ],
                [
                    'hint' => 'Sinds kort zijn de opleidingen verkort',
                    'event_id' => 2,
                    'cost' => 50
                ],
                [
                    'hint' => 'Yo, wat denk je nou zelf?',
                    'event_id' => 3,
                    'cost' => 150
                ],
                // tour 2
                [
                    'hint' => 'Sinds de 19e eeuw',
                    'event_id' => 4,
                    'cost' => 100
                ],
                [
                    'hint' => 'Minder dan 300',
                    'event_id' => 5,
                    'cost' => 50
                ],
                [
                    'hint' => 'Dordrecht kan je alleen binnenkomen door over water te gaan',
                    'event_id' => 6,
                    'cost' => 150
                ],
                // tour 3
                [
                    'hint' => 'Het zijn er heel veel',
                    'event_id' => 7,
                    'cost' => 100
                ],
                [
                    'hint' => 'Heel groen',
                    'event_id' => 8,
                    'cost' => 50
                ],
                [
                    'hint' => 'Natuurlijker kan niet!',
                    'event_id' => 9,
                    'cost' => 150
                ]
            ]
        );
    }
}
