<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'size' => $this->size,
            'product_id' => new ProductResource($this->product),
            'color_id' => new ColorResource($this->color),
            'user_id' => $this->user,
        ];
    }
}
