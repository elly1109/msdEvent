<?php
  
namespace App\Enums;
 
enum SuffixEnum:string {
    case PhD = 'PhD';
    case Sr = 'Snr.';
    case Jr = 'Jnr.';
    case I = 'I';
    case II = 'II';
    case III = 'III';
    case IV = 'IV';


    public static function values(): array
    {
        return array_column(self::cases(), 'name', 'value');
    }
}