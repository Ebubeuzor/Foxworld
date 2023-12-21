<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    
    public function index()
    {
        return ColorResource::collection(
            Color::all()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "color" => 'required'
        ]);

        $color = new Color();

        $color->color = $data['color'];
        $color->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Color  $color
     * @return \Illuminate\Http\Response
     */
    public function show(Color $color)
    {
        return new ColorResource($color);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Color  $color
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Color $color)
    {
        $data = $request->validate([
            'color' => 'required'
        ]);

        $color->update([
            'color' => $data['color']
        ]);

        return response("ok",200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Color  $color
     * @return \Illuminate\Http\Response
     */
    public function destroy(Color $color)
    {
        $color->delete();
        return response(''); 
    }
}
