<?php
/** Empresa Controller */ 

namespace App\Http\Controllers;


use Illuminate\Http\Request;

#Models
use App\Models\Empresa;

#Requests
use App\Http\Requests\CreateEmpresaRequest;
use App\Http\Requests\UpdateEmpresaRequest;

#Resources
use App\Http\Resources\EmpresaResource;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /** Lista todas las empresas de la coleccion almacenada */
        return Empresa::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateEmpresaRequest $request)
    {
        /** Almacenar nuevo registro en la DB
         * datos validados con CreateEmpresaRequest
         * Si los datos son validados correctamente retorna una respuesta 201 de registro almacenado correctamente
         */
        
        $data = $request->all();
        $data['fecha_creacion'] = date('Y-m-d');
        Empresa::create($data);
        return response()->json([
            'message' => 'Registro Creado Con Exito',
            'data' => $data
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function show(Empresa $empresa)
    {
        /** lista los datos de la empresa seleccionada */
         return new EmpresaResource($empresa);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmpresaRequest $request, Empresa $empresa)
    {
        $data = $request->all();
        $empresa->update($data);
        return response()->json([
            'res' => True,
            'message' => 'Registro Creado Con Exito'
        ],202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empresa $empresa)
    {
        $empresa->delete();
        return response()->json([
            'message' => 'Eliminado Con Exito'
        ], 202);
    }
}
