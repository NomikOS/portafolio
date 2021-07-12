<?php

namespace App\Traits;

trait TraitQuoteHelper
{
    public function setVehiclesFast($vehicles, $vehicle_types)
    {
        foreach ($vehicles as $vehicle)
        {
            $x = [];
            if ( ! in_array($vehicle['vehicle_id'], array_keys($this->problem['vehicles'])))
            {
                $start_address = $vehicle['start_address'];

                $x['vehicle_id'] = (string) $vehicle['vehicle_id'];
                $x['earliest_start'] = (integer) $vehicle['earliest_start'];
                $x['latest_end'] = (integer) $vehicle['latest_end'];
                $x['start_address'] = [
                    'location_id' => (string) $start_address['location_id'],
                    'lat' => (float) $start_address['lat'],
                    'lon' => (float) $start_address['lon'],
                ];
                $x['type_id'] = (string) $vehicle['type_id'];
                $x['skills'] = $vehicle['skills'];

                $this->problem['vehicles'][$vehicle['vehicle_id']] = $x;
            }
        }

        // d($this->problem['vehicles'], 'vehicles');

        foreach ($vehicle_types as $vt)
        {
            $x = [];
            if ( ! in_array($vt['id'], array_keys($this->problem['vehicle_types'])))
            {
                $x['type_id'] = (string) $vt['id'];
                $x['profile'] = (string) 'truck';
                $x['capacity'] = [
                    (integer) $vt['capacity'][0],
                    (integer) $vt['capacity'][1],
                ];
                $x['speed_factor'] = (float) isset($vt['speed_factor']) ? $vt['speed_factor'] : 1;

                $this->problem['vehicle_types'][$vt['id']] = $x;
            }
        }

        // d($this->problem['vehicle_types'], 'vehicle_types');
    }

    public function toSeconds($time)
    {
        $dt = new \DateTime("1970-01-01 $time", new \DateTimeZone('UTC'));
        $seconds = (int) $dt->getTimestamp();
        return $seconds;
    }

    public function formatFullDate($day_date)
    {
        $d = strtotime($day_date);
        return $this->formatDayNumber($d, 1, 1);
    }

    public function formatDayNumber($date, $wMonth = false, $wYear = false, $hour = false)
    {
        $days = array(
            1 => 'Lunes',
            2 => 'Martes',
            3 => 'Miércoles',
            4 => 'Jueves',
            5 => 'Viernes',
            6 => 'Sábado',
            0 => 'Domingo',
        );

        $months = array(
            1 => 'enero',
            2 => 'febrero',
            3 => 'marzo',
            4 => 'abril',
            5 => 'mayo',
            6 => 'junio',
            7 => 'julio',
            8 => 'agosto',
            9 => 'septiembre',
            10 => 'octubre',
            11 => 'noviembre',
            12 => 'diciembre',
        );

        $w = date('w', $date);
        $d = date('d', $date);
        $y = date('Y', $date);
        $w = ucfirst($days[$w]);
        $m = date('n', $date);
        $m = ucfirst($months[$m]);
        $h = '';
        if ($hour)
        {
            $h = date('H:i\H\r\s.', $date);
            $h = " @ $h";
        }
        return "$w $d" . ($wMonth ? ", $m" : '') . ($wYear ? " de $y" : '') . $h;
    }

    public function human_time_window($time_window_start)
    {
        return gmdate('H:i', (integer) $time_window_start);
    }

    public function express($problem_elaborated = null)
    {
        if (isset($problem_elaborated['services']))
        {
            $this->problem['services'] = (array) $problem_elaborated['services'];
        }

        if (isset($problem_elaborated['shipments']))
        {
            $this->problem['shipments'] = (array) $problem_elaborated['shipments'];
        }

        if (isset($problem_elaborated['relations']))
        {
            $this->problem['relations'] = (array) $problem_elaborated['relations'];
        }

        return $this->sendProblemAndFillResult();
    }
}
