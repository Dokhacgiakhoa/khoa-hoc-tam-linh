<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class TarotController extends Controller
{
    public function index()
    {
        $cards = DB::table('tarot_cards')->get();
        
        // Decode JSON fields for better API response
        $cards->transform(function ($card) {
            $card->meaning_general = json_decode($card->meaning_general);
            $card->meaning_upright = json_decode($card->meaning_upright);
            $card->meaning_reversed = json_decode($card->meaning_reversed);
            $card->topics = json_decode($card->topics);
            return $card;
        });

        return response()->json($cards);
    }
}
