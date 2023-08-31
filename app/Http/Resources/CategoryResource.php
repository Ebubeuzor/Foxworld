<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'categories' => $this->categories,
            'subMenu' => $this->subMenu->SubTitle,
        ];
    
        if ($this->menu) {
            $data['menu'] = $this->menu->Title;
        }
    
        return $data;
    }
    
}
