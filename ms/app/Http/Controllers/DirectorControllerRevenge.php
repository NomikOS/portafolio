<?php

namespace App\Http\Controllers;

use App\Classes\RegistryRequest;
use App\Services\ApiMicroService;
use App\Services\DatabaseService;
use App\Services\UsePubnub;
use App\Traits\TraitQuoteExecute;
use App\Traits\TraitQuoteExecuteBuild;
use App\Traits\TraitQuoteHelper;
use App\Traits\TraitQuoteSendProblem;
use Exception;
use Illuminate\Http\Request;

class DirectorControllerRevenge extends Controller
{
    use TraitQuoteExecute;
    use TraitQuoteExecuteBuild;
    use TraitQuoteHelper;
    use TraitQuoteSendProblem;

    protected $input = [];
    protected $problem = [];
    public $ses;

    public function __construct(
        Request $request,
        DatabaseService $databaseService,
        UsePubnub $pubnub,
        ApiMicroService $apiMicroService) {
        $this->input = RegistryRequest::set($request->all());

        $this->databaseService = $databaseService;
        $this->pubnub = $pubnub;
        $this->apiMicroService = $apiMicroService;
    }

    public function execute(Request $request)
    {
        $user_messages = [];

        try
        {
            $now_date = date('Y-m-d', time() - 3600 * 3);
            $hay_disponibilidad = false;

            $meta = RegistryRequest::get('meta');

            $pn_channel_disponibilidad = $meta['pn_channel_disponibilidad'];
            $pn_action = $meta['pn_action'];

            $config = json_decode($meta['config_json'], 1);

            $api_route = isset($config['api_route']) ? $config['api_route'] : '';
            $api_verb = isset($config['api_verb']) ? $config['api_verb'] : '';
            $disponibilidad_origin = isset($config['disponibilidad_origin']) ? $config['disponibilidad_origin'] : '';

            $data = RegistryRequest::get('data');

            if ($disponibilidad_origin == 'adc') // move own lib
            {
                /**
                 * get ltl data
                 * ------------
                 */
                try
                {
                    $bahia = $this->apiMicroService->getDataForAdc([
                        'data' => $data,
                        'meta' => $meta,
                    ]);

                    if (!$bahia || (isset($bahia->success) && $bahia->success != true)) {
                        throw new Exception("APIMICROSERVICE->GOAPI ---> RUOTE: $api_route FALLIDA.");
                    }

                    $bahia->data = json_decode(json_encode($bahia->data), true);

                    $data['vehicles'] = $bahia->data['vehicles_stuff']['vehicles'];
                    $data['vehicle_types'] = $bahia->data['vehicles_stuff']['vehicle_types'];
                    $data['try_time_windows'] = $bahia->data['try_time_windows'];
                    $data['time_windows_json'] = $bahia->data['time_windows_json'];
                    $data['problem_elaborated'] = $bahia->data['problem_elaborated'];

                    $data_ready = $meta['bahia_required']['data_ready'];

                    foreach ($bahia->data['quote_request'] as $key => $value) {
                        if (in_array($key, $data_ready) === false) {
                            $data['quote_request'][$key] = $bahia->data['quote_request'][$key];
                        }
                    }
                } catch (Exception $e) {
                    d($e, __FUNCTION__ . ' Exception', 0, 1);
                }
            }

            $quote_request = $data['quote_request'];
            $vehicles = $data['vehicles'];
            $vehicle_types = $data['vehicle_types'];
            $try_time_windows = $data['try_time_windows'];
            $time_windows_json = $data['time_windows_json'];

            if (!isset($data['problem_elaborated'])) {
                throw new Exception('problem_elaborated not found');
            }

            $problem_elaborated = $data['problem_elaborated'];
            d($disponibilidad_origin, 'DISPONIBILIDAD_ORIGIN');
            d("PROBAR DISPONIBILIDAD PARA: {$try_time_windows['for_day']}");

            $d1 = new \DateTime($try_time_windows['for_day']);
            $d2 = new \DateTime($now_date);

            if ($d1 < $d2) {
                d("Dia en el pasado {$try_time_windows['for_day']} ES MENOR QUE now_date: {$now_date}");
            } else {
                /**
                 * reset en cada vuelta
                 */
                $this->problem['vehicle_types'] = [];
                $this->problem['vehicles'] = [];

                $this->setVehiclesFast($vehicles, $vehicle_types);
                $r = $this->express($problem_elaborated);

                $hay_disponibilidad = $r;
            }

            /**
             * -----------------------
             * Forzar para un dia dado
             * -----------------------
             */

            $date5Nov = '2017-12-05';
            $d3 = new \DateTime($date5Nov);

            if ($d1 >= $d3) {
                d("Dia {$try_time_windows['for_day']} POSTERIOR A 4/DIC");
                $hay_disponibilidad = 0;
            }

            // Igor bloquear disponibilidad permanantemente
            $hay_disponibilidad = 0;

            $ar = [
                'hay_disponibilidad' => $hay_disponibilidad,
                'quote_result' => [
                    'express' => [
                        'try_time_windows' => $try_time_windows,
                        'time_windows_json' => $time_windows_json,
                        'quote_request' => $quote_request,
                        'time_window_found' => '',
                    ]],
                'user_messages' => $user_messages,
                'config_json' => json_encode($config),
            ];

            if ($ar) {
                /**
                 * api rooute tiene preferencia por ahora
                 * luego ver como determinar que accion realizar aqui
                 * explicitamnete, es cosa de los metas
                 */

                if (isset($api_route) && $api_route) {
                    $r = $this->apiMicroService->goApi($api_route, $api_verb, $ar);

                    if (!$r || (isset($r->success) && $r->success != true)) {
                        throw new Exception("$api_route FALLIDA.");
                    }

                    return http_response_code(200);
                }

                if (isset($pn_channel_disponibilidad) && $pn_channel_disponibilidad && isset($pn_action) && $pn_action) {
                    /**
                     * Responder a pubnub client
                     * -------------------------
                     */
                    $info = $this->pubnub->send($pn_channel_disponibilidad, [
                        'action' => $pn_action,
                        'data' => $ar,
                    ]);

                    if ('Sent' != $info[1]) {
                        throw new Exception("$pn_channel_disponibilidad FALLIDA.");
                    }

                    return http_response_code(200);
                }
            }
        } catch (Exception $e) {
            d($e);
        }

        return abort(500);
    }

}
