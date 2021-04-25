<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $fillable = [
        'id',
        'nombre',
        'numero_trabajadores',
        'tipo_empresa',
        'fecha_creacion'
    ];

    protected $hidden = [
        'updated_at'
    ];
}
