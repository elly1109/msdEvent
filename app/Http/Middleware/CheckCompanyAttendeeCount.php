<?php

namespace App\Http\Middleware;

use App\Models\Supplier;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckCompanyAttendeeCount
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,...$exceptionCompanyIds): Response
    {
      
            $company_id = $request->input('companyId'); // Assuming you pass the company_id in the registration request.
    
            if ($company_id && !in_array($company_id, $exceptionCompanyIds)) {
                $userCount = Supplier::where('companyId', $company_id)->count();
    
                if ($userCount > 2) {
                    return response()->json(['message' => 'Company already has two registered users. For any issues Please contact administrator via info.event@msd.go.tz'], 422);
                }
            }
    
            return $next($request);
        }    
}
