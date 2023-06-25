<?php
  
namespace App\Enums;
 
enum PrefixEnum:string {
    case Prof = 'Prof.';
    case Dr = 'Dr.';
    case Mr = 'Mr.';
    case Mrs = 'Mrs.';
    case Ms = 'Ms.';
    case Sir = 'Sir';
    case Madam = 'Madam';

    public static function values(): array
    {
        return array_column(self::cases(), 'name', 'value');
    }
}
