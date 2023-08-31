<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Category;
use App\Models\SubMenu;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MenuResource::collection(
            Menu::all()
        );

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMenuRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMenuRequest $request)
    {
        $data = $request->validated();

        $menu = new Menu();
        $menu->Title = $data['title'];
        $menu->save();

        $subtitles = $data['subtitles'];
        foreach ($subtitles as $subtitleData) {
            $subtitle = $this->createSubMenu([
                'menu_id' => $menu->id,
                'SubTitle' => $subtitleData['text'], // Corrected key
            ], $subtitleData['items']); // Pass the 'items' array for categories
        }

        return response($data);
    }



    public function createSubMenu($data, $categories)
    {
        $validator = Validator::make($data, [
            'SubTitle' => 'string',
            'menu_id' => 'exists:App\Models\Menu,id',
        ]);
        $subTitleData = $validator->validated();

        $subTitle = SubMenu::create($subTitleData);

        foreach ($categories as $category) {
            $categoryData = [
                'menu_id' => $subTitle->menu_id,
                'sub_menu_id' => $subTitle->id,
                'categories' => $category['text'], // Corrected key
            ];
            $this->createCategory($categoryData);
        }
    }



    public function createCategory($data)
    {
        $validator = Validator::make($data, [
            'categories' => 'string',
            'menu_id' => 'exists:App\Models\Menu,id',
            'sub_menu_id' => 'exists:App\Models\SubMenu,id',
        ]);

        return Category::create($validator->validated());
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu)
    {
        return new MenuResource(
            $menu
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMenuRequest  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMenuRequest $request, Menu $menu)
    {
        $data = $request->validated();

        // Update menu title
        $menu->Title = $data['data']['Title'];
        $menu->save();

        // Update or create subtitles and categories
        foreach ($data['data']['Categories'] as $subtitleData) {
            $subtitle = $this->updateOrCreateSubMenu($menu, $subtitleData);
        }

        return response($data);
    }

    /**
     * Update or create a submenu and its categories.
     *
     * @param  \App\Models\Menu  $menu
     * @param  array  $subtitleData
     * @return \App\Models\SubMenu
     */
    protected function updateOrCreateSubMenu(Menu $menu, $subtitleData)
    {
        $subTitle = SubMenu::updateOrCreate(
            ['menu_id' => $menu->id, 'SubTitle' => $subtitleData['subMenu']]
        );

        $this->updateOrCreateCategory($subTitle, $subtitleData);

        return $subTitle;
    }

    /**
     * Update or create a category.
     *
     * @param  \App\Models\SubMenu  $subTitle
     * @param  array  $categoryData
     * @return \App\Models\Category
     */
    protected function updateOrCreateCategory(SubMenu $subTitle, $categoryData)
    {
        
        $category = Category::whereId($categoryData['id'])->first();

        if ($category) {
            // Update the found category with new data
            $category->update([
                'categories' => $categoryData['categories']
            ]);
        } 

        return $category;

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        $menu->subMenu()->delete();
        $menu->categories()->delete();
        $menu->delete();
    }
}
