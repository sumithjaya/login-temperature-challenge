<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Temperatures;
 

class TemperatureController extends Controller
{
    public function getTemperature(Type $var = null)
    {
        //Read the config file for lat/long values of cities
        $cities_data = app('config')->get('cities');

        //City A values 
        $city_a_name = $cities_data['city_a']['name'];
        $city_a_lat = $cities_data['city_a']['lat'];
        $city_a_long =$cities_data['city_a']['long'];
 
        //API call for City A
        $response_a = Http::get('https://api.openweathermap.org/data/2.5/onecall?lat='.$city_a_lat.'&lon='.$city_a_long.'&exclude=hourly,daily&units=metric&appid=8dc9ba99c4e5fe28f4dc20edbc1848c0');
 
        //City B values
        $city_b_name = $cities_data['city_b']['name'];
        $city_b_lat = $cities_data['city_b']['lat'];
        $city_b_long =$cities_data['city_b']['long'];

        //API call for City B
        $response_b = Http::get('https://api.openweathermap.org/data/2.5/onecall?lat='.$city_b_lat.'&lon='.$city_b_long.'&exclude=hourly,daily&units=metric&appid=8dc9ba99c4e5fe28f4dc20edbc1848c0');
 
        //return temperature values of both cities
        $data = [
            'city_a' =>  $response_a['current']['temp'] ,
            'city_b' =>  $response_b['current']['temp'] ,
        ];

        return  $data ;
    }

    public function load(Request $request)
    {
            //User ID
            $id = $request->input('id');

            //Read City A data in chronological order
            $temperature_data_a = Temperatures::where('user_id','=',$id)->orderBy('created_at', 'asc')->get();
             //Read City B data in chronological order
            $temperature_data_b = Temperatures::where('user_id','=',$id)->orderBy('created_at', 'asc')->get();

            $data = [
                'temperature_data_a' => $temperature_data_a,
                'temperature_data_b' => $temperature_data_b
            ];

            //return the city data 
            return $data;
        
    }

    public function load_hottest(Request $request)
    {
        //User ID
        $id = $request->input('id');
        //Read City A data with hottest temperature in decendng order
        $temperature_data_a = Temperatures::where('user_id','=',$id)->orderBy('city_a_temp', 'desc')->get();
        //Read City B data with hottest temperature in decendng order
        $temperature_data_b = Temperatures::where('user_id','=',$id)->orderBy('city_b_temp', 'desc')->get();

        $data = [
            'temperature_data_a' => $temperature_data_a,
            'temperature_data_b' => $temperature_data_b
        ];

        //return the city data 
        return $data;
    }
}
