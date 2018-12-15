<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(ParticipantsSeeder::class);
        $this->call(QuestionsSeeder::class);
        $this->call(EventsSeeder::class);
        $this->call(ToursSeeder::class);
        $this->call(LocationsSeeder::class);
        $this->call(HintsSeeder::class);
    }
}
