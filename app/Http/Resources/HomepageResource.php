<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class HomepageResource extends JsonResource
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
            
            'homevideo' => $this->homevideo ? URL::to($this->homevideo) : null,
            'Section1Title' => $this->Section1Title,
            'Section1Image' => $this->Section1Image ? URL::to($this->Section1Image) : null,
            'Section2aCategory' => $this->Section2aCategory,
            'Section2aImage' => $this->Section2aImage ? URL::to($this->Section2aImage) : null,
            'Section2bCategory' => $this->Section2bCategory,
            'Section2bImage' => $this->Section2bImage ? URL::to($this->Section2bImage) : null,
        ];
    }
}
