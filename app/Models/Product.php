<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    function categories(){
        return $this->belongsToMany(Category::class);
    }

    function colors(){
        return $this->belongsToMany(Color::class);
    }

    function sizes(){
        return $this->hasMany(Size::class);
    }

    function images(){
        return $this->hasMany(Image::class);
    }

}
