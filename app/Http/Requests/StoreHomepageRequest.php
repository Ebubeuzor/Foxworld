<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHomepageRequest extends FormRequest
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
            'homevideo' => 'nullable',
            'homeImage' => 'nullable',
            'Section1Title' => 'nullable',
            'Section1Image' => 'nullable',
            'Section2aCategory' => 'nullable',
            'Section2aImage' => 'nullable',
            'Section2bCategory' => 'nullable',
            'Section2bImage' => 'nullable',
        ];
    }
}
