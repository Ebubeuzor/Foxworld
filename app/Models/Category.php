<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;
    
    public function subMenu(){
        return $this->belongsTo(SubMenu::class);
    }
    
    public function menu(){
        return $this->belongsTo(Menu::class);
    }
}
