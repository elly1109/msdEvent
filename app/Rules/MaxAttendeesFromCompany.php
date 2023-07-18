<?php
namespace App\Rules;

use App\Models\Supplier;
use Illuminate\Contracts\Validation\Rule;

class MaxAttendeesFromCompany implements Rule
{
    protected $maxUsers;
    protected $exceptionCompanies;

    public function __construct($maxUsers, $exceptionCompanies)
    {
        $this->maxUsers = $maxUsers;
        $this->exceptionCompanies = $exceptionCompanies;
    }

    public function passes($attribute, $value)
    {
        $company = Supplier::where('companyId', $value)->count();
        return $company < $this->maxUsers || in_array($value, $this->exceptionCompanies);
    }

    public function message()
    {
        return "The maximum number of attendees from this company has been reached.";
    }
}

