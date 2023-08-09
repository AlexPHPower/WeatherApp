<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ShowHomepageController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Welcome');
    }
}
