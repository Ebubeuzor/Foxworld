<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MainOrderResource extends JsonResource
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
            'transaction' => $this->transaction,
            'orderStatus' => $this->orderStatus,
            'paymentStatus' => $this->paymentStatus,
            'date' => $this->created_at->diffForHumans(),
            'user' => new UserResource($this->user),
            'order' => new OrderResource($this->order),
        ];
    }
}
