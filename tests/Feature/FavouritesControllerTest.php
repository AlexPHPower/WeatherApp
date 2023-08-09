<?php


use App\Models\User;
use App\Models\UserFavourites;

test('user favourite is saved', function () {
    $user = User::factory()->create();
    $location = 'Home';

    $response = $this
        ->actingAs($user)
        ->post('/favorites', [
            'locationName' => $location,
            'latitude' => '53.57828630',
            'longitude' => '-2.43003670'
        ]);

    $response
        ->assertSessionHasNoErrors();

    $favourite = UserFavourites::where('user_id', $user->id)
        ->where('location_name', $location)
        ->first();

    $this->assertNotNull($favourite);
});
