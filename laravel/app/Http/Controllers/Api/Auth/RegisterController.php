<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use App\Models\Gener14;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        $validate = Validator::make($params_array, [
            'tipdoc' => 'required',
            'docemp' => 'required',
            'prinom' => 'required',
            'priape' => 'required',
            'painac' => 'required',
            'fecnac' => 'required',
            'codsex' => 'required',
            'pais' => 'required',
            'ciudad' => 'required',
            'direccion' => 'required',
            'email' => 'required|unique:users',
            'ocupacion' => 'required',
            'empresa' => 'required',
            'password' => 'required|confirmed',
        ]);

        if ($validate->fails()) {
            $user_email = User::where('email', $params_array['email'])->first();
            $user_pass = User::where('docemp', $params_array['docemp'])->first();
            if($user_email){
                $message = 'Ya existe un registro con el Email suministrado!';
            }else if($user_pass){
                $message = 'Ya existe un registro con el Numero de Documento suministrado!';
            }else if($user_email and $user_pass){
                $message = 'Ya existe un registro con el Email y Numero de Documento suministrado!';
            }else{
                $message = '';
            }

            $data = [
                'status' => 'error',
                'code' => 404,
                'message' => $message,
                'errors' => $validate->errors()
            ];
            $code = 404;

        } else {

            $user = new User();
            $user->tipdoc = $params_array['tipdoc'];
            $user->docemp = $params_array['docemp'];
            $user->prinom = $params_array['prinom'];
            $user->segnom = $params_array['segnom'];
            $user->priape = $params_array['priape'];
            $user->segape = $params_array['segape'];
            $user->painac = $params_array['painac'];
            $user->fecnac = $params_array['fecnac'];
            $user->codsex = $params_array['codsex'];
            $user->pais = $params_array['pais'];
            $user->ciudad = $params_array['ciudad'];
            $user->direccion = $params_array['direccion'];
            $user->email = $params_array['email'];
            $user->ocupacion = $params_array['ocupacion'];
            $user->empresa = $params_array['empresa'];
            $user->password = Hash::make($params_array['password']);
            $user->save();

            if ($user) {
                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'User Successfully Register.',
                    'errors' => ''
                ];
                $code = 200;
            } else {
                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Error, No Register!',
                    'errors' => ''
                ];
                $code = 400;
            }
        }
        return response($data, $code);
    }



    public function getGener14(Request $request)
    {

        $gener14 = Gener14::all();
        $array = array();
        if ($gener14) {
            foreach ($gener14 as $key) {
                $array_ = array(
                    'codpai' => $key->codpai,
                    'detpai' => $key->detpai,
                    'cofael' => $key->cofael,
                );
                array_push($array, $array_);
            }
        }
        return response($array, 200);
    }
}