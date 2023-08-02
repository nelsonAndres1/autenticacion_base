<?php

namespace App\Helpers;

use App\Models\Oferta;
use Nette\Utils\DateTime;
use App\Models\Tiposaloja;
use App\Models\Alojamiento;
use App\Models\Reservas;
class JwtAuth
{

    public $key;


    public function __construct()
    {
        $this->key = '_clave_-32118';
        date_default_timezone_set('America/Bogota');
    }

    public function getOferta()
    {
        $oferta = Oferta::where('estado', 'A')->orderBy('id', 'desc')->first();
        $data = array();
        if ($oferta) {
            $data = array(
                'id' => $oferta->id,
                'detalle' => $oferta->detalle,
                'fechaini' => $oferta->fechaini,
                'fechafin' => $oferta->fechafin,
                'estado' => $oferta->estado
            );
        }
        return $data;
    }
    public function verificarIntervalo($inicio1, $fin1, $inicio2, $fin2)
    {
        $fechaInicio1 = \DateTime::createFromFormat('Y-m-d', $inicio1);
        $fechaFin1 = \DateTime::createFromFormat('Y-m-d', $fin1);
        $fechaInicio2 = \DateTime::createFromFormat('Y-m-d', $inicio2);
        $fechaFin2 = \DateTime::createFromFormat('Y-m-d', $fin2);

        // Verificar si el intervalo 1 está dentro del intervalo 2
        if ($fechaInicio1 >= $fechaInicio2 && $fechaFin1 <= $fechaFin2) {
            return true;
        } else {
            return false;
        }
    }

    function getRangeDate($date_ini, $date_end, $format)
    {

        $dt_ini = \DateTime::createFromFormat($format, $date_ini);
        $dt_end = \DateTime::createFromFormat($format, $date_end);
        $period = new \DatePeriod(
            $dt_ini,
            new \DateInterval('P1D'),
            $dt_end,
        );
        $range = [];
        foreach ($period as $date) {
            $range[] = $date->format($format);
        }
        $range[] = $date_end;
        return $range;
    }


}