<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        DB::table('users')->insert(
            [
            'name'=>'administrator',
            'username'=>'admin',
            'email'=>'admin@msd.go.tz',
            'password'=> bcrypt('MSD123msd')

            ]
    );

        DB::table('users')->insert(
            [
                'name'=>'crdb',
                'username'=>'crdb',
                'email'=>'crdb@eventmsd.go.tz',
                'password'=> bcrypt('ev@nt123')
            ]
    );


        
    }
}
