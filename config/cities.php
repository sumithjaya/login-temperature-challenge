<?php

/*
    |--------------------------------------------------------------------------
    | Cities Default values
    |--------------------------------------------------------------------------
    |
    | This config file contains the values for two cities with their Longtuti and Latintude values
 
    */

return [
    'city_a' => [
        'name' => env('CITY_A_NAME'),
        'lat' => env('CITY_A_LAT'),
        'long' => env('CITY_A_LONG'),
    ],
    'city_b' => [
        'name' => env('CITY_B_NAME'),
        'lat' => env('CITY_B_LAT'),
        'long' => env('CITY_B_LONG'),
    ],
];
?>