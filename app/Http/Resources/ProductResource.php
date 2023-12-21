<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ProductResource extends JsonResource
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
        return [
            'id' => $this->id,
            'image' => ImageResource::collection($this->images),
            'frontImage' => $this->frontImage ? URL::to($this->frontImage) : null,
            'alternateImage' => $this->alternateImage ? URL::to($this->alternateImage) : null,
            'gender' => $this->gender,
            'title' => $this->title,
            'stock' => $this->stock,
            'size' => SizeResource::collection($this->sizes),
            'categories' => CategoryResource::collection($this->categories),
            'colors' => ColorResource::collection($this->colors),
            'details' => $this->details,
            'stock' => $this->stock,
            'price' => $this->price,
            'tag' => $this->tag,
            'upsell' => $this->upsell,
            'salePrice' => $this->salePrice,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
            'created_at' => $this->created_at->format('Y/m/d H:i a'),
        ];
    }
}
