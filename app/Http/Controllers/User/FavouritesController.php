<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFavouriteRequest;
use App\Models\UserFavourites;

class FavouritesController extends Controller
{
    public function store(StoreFavouriteRequest $request)
    {
        abort_if(!auth()->check(), 403, 'You need to be logged in to save a favourite');

        // Create a new favorite location entry in the database
        $favoriteLocation = UserFavourites::create([
            'user_id' => auth()->id(),
            'location_name' => $request->input('locationName'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
        ]);

        return response()->json([
            'message' => 'Favorite location saved successfully.',
            'favorite_location' => $favoriteLocation,
        ], 201);
    }
}
