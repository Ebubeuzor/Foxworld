<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'frontImage' => 'nullable',
            'alternateImage' => 'nullable',
            'images' => 'array',
            'sizes' => 'array',
            'categories' => 'array',
            'colors' => 'array',
            'gender' => 'required',
            'title' => 'required',
            'stock' => 'required',
            'details' => 'required',
            'price' => 'required',  
            'tag' => 'required',  
            'salePrice' => 'required',  
            'upsell' => 'required',  
            'startDate' => 'nullable|date', 
            'endDate' => 'nullable|date|after:today',
        ];
    }
}
