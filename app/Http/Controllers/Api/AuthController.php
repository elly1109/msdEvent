<?php
namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RoleUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
//     public function __construct()
// {
//     $this->middleware('guest', ['except' => 'logout']);
// }


    /**
     * Create User
     * @param Request $request
     * @return User 
     */
    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(), 
            [
                'name' => 'required',
                'username' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){

                return $this->sendError('validation error',$validateUser->errors(), 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $data = [
                'user' => $user,
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ];

            return $this->sendResponse($data,'User Created Successfully',201);         

        } catch (\Throwable $th) {

            return $this->sendError('error',$th->getMessage(),500);
            
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), 
            [
                'username' => 'required',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return $this->sendError('Validation Failed',$validateUser->errors(),401);
            }

            $credentials= request(['username', 'password', 'active'=>1]);

            if(!Auth::attempt($credentials)){

                return $this->sendError('Username & Password does not match with our record.',[],405);
    
            }


            $user = User::where('username', $request->username)->first();
            if ($user->hasAnyRole(Role::all())){
                $userRole = $user;
            }

            $data = [
                'data'=> $user,
                'token' => $user->createToken("API TOKEN")->plainTextToken,
            ];

            return $this->sendResponse($data,'User Logged In Successfully',201);

        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 401);
        }
    }


     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function dashboard(Request $request){
        $nation_info = DB::table('suppliers')
        ->select('nicename', DB::raw('count(*) as total'))
        ->join('nations','suppliers.countryId','=','nations.id')
        ->groupBy('nicename')
        ->get();

        return response()->json([
            'success' => true, 
            'data' => $nation_info
        ]);
    }




     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function logoutUser (Request $request)
    {
//        var_dump(123); exit();
        // Get user who requested the logout
        // $user = auth('sanctum')->user(); //or Auth::user()

        // dd($user);
        // Revoke current user token
        // $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        auth('sanctum')->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=> 'User logged out',
            'success' => true,
            'statusCode'=> 200,
        ]);
    }


    // /**
    //  * Update User
    //  * @param Request $request
    //  * */
    public function user(Request $request)
    {
        return response()->json([
            'success' => true, 
            'data' => $request->user()
        ]);
    }



    public function refresh(Request $request): JsonResponse
        {
            $request->user()->tokens()->delete();

            return response()->json([
                'token' => $request->user()->createToken('API TOKEN')->plainTextToken,
            ]);
        
        }
}