<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFavouriteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Update this as needed based on your authorization logic
    }

    public function rules(): array
    {
        return [
            'locationName' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ];
    }
}

