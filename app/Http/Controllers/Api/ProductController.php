<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Color;
use App\Models\Image;
use App\Models\Size;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(
            Product::where('visible', 1)->paginate(6)
        );
    }


    public function rearrange(Request $request)
    {
        $data = $request->all();

        $products = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->join('menus', 'categories.menu_id', '=', 'menus.id') 
            ->where('categories.categories', '=', $data['category'])
            ->where('menus.Title', '=', $data['productMenu']) 
            ->where(function ($query) use ($data) {
                $query->where(function ($query) use ($data) {
                    if ($data['priceRange'] == 1) {
                        $query->where('price', '<', 1000);
                    } elseif ($data['priceRange'] == 2) {
                        $query->orWhereBetween('price', [1000, 20000]);
                    } elseif ($data['priceRange'] == 3) {
                        $query->orWhereBetween('price', [21000, 50000]);
                    } elseif ($data['priceRange'] == 4) {
                        $query->orWhereBetween('price', [51000, 100000]);
                    } elseif ($data['priceRange'] == 5) {
                        $query->orWhere('price', '>', 100000);
                    }
                })->where(function ($query) use ($data) {
                    if ($data['stock'] == 0) {
                        $query->where('stock', '<', 1);
                    } elseif ($data['stock'] == 1) {
                        $query->orWhere('stock', '>', 1);
                    }
                });
            })
            ->get();

        return ProductResource::collection(
            $products
        );
    }

    


    public function selectProducts(Request $request)
    {
        
        $menu = request('menu');
        $submenu = request('submenu');
        $item = request('item');
        $productsQuery = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->join('menus', 'categories.menu_id', '=', 'menus.id') // Join the menus table
            ->where('categories.categories', '=', $submenu)
            ->where('menus.Title', '=', $menu)
            ->distinct()
            ;

        
        $products = $productsQuery->paginate(6);

        return ProductResource::collection(
            $products
        );

    }
    
    public function selectUserProducts(Request $request)
    {
        $selectedData = json_decode($request->input('selectedData'), true);
        $selectedSubcategories = $selectedData['categories'];
        $selectedSizes = $selectedData['sizes'];
        if (!empty($selectedSubcategories) || !empty($selectedSizes)) {
            
            $productsQuery = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->join('sub_menus', 'categories.sub_menu_id', '=', 'sub_menus.id')
            ->whereIn('sub_menus.SubTitle', $selectedSubcategories)
            ->distinct()
            ;
            
            if (!empty($selectedSizes)) {
                $productsQuery->join('sizes', 'products.id', '=', 'sizes.product_id')
                ->whereIn('sizes.sizes', $selectedSizes);
            }
            
            $products = $productsQuery->paginate(6);
            
            return ProductResource::collection($products);
            
        }
    }
    

    public function selectProductsRandom(Request $request)
    {
        
        $menu = request('menu');
        $submenu = request('submenu');
        $item = request('item');
        $productsQuery = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->join('menus', 'categories.menu_id', '=', 'menus.id') // Join the menus table
            ->where('categories.categories', '=', $submenu)
            ->where('menus.Title', '=', $menu);

        
        $products = $productsQuery
                    ->inRandomOrder() 
                    ->limit(3) 
                    ->get();

        return ProductResource::collection(
            $products
        );

    }

    
    public function genderMale()
    {
        return ProductResource::collection(
            Product::where('Gender', 'male')->distinct()->paginate(6)
        );
    }
    
    public function genderFeMale()
    {
        return ProductResource::collection(
            Product::where('Gender', 'female')->distinct()->paginate(6)
        );
    }
    
    public function genderChildren()
    {
        return ProductResource::collection(
            Product::where('Gender', 'children')->distinct()->paginate(6)
        );
    }
    
    public function genderMaleRandom()
    {
        return ProductResource::collection(
            Product::where('Gender', 'male')->distinct()->inRandomOrder()->limit(3)->get()
        );
    }
    
    public function genderFeMaleRandom()
    {
        return ProductResource::collection(
            Product::where('Gender', 'female')->inRandomOrder()->limit(3)->get()
        );
    }
    
    public function genderChildrenRandom()
    {
        return ProductResource::collection(
            Product::where('Gender', 'children')->inRandomOrder()->limit(3)->get()
        );
    }


    
    private function saveImage($image)
    {
        // Check if image is base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $matches)) {
            $imageData = substr($image, strpos($image, ',') + 1);
            $imageType = strtolower($matches[1]);

            // Check if file is an image
            if (!in_array($imageType, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('Invalid image type');
            }

            // Decode base64 image data
            $decodedImage = base64_decode($imageData);

            if ($decodedImage === false) {
                throw new \Exception('Failed to decode image');
            }
        } else {
            throw new \Exception('Invalid image format');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $imageType;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        // Save the decoded image to the file
        if (!file_put_contents($relativePath, $decodedImage)) {
            throw new \Exception('Failed to save image');
        }

        return $relativePath;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $image = $this->saveImage($data['frontImage']);
        $data['frontImage'] = $image;
        
        $image2 = $this->saveImage($data['alternateImage']);
        $data['alternateImage'] = $image2;

        $product = new Product();
        $product->frontImage = $data['frontImage'];
        $product->alternateImage = $data['alternateImage'];
        $product->gender = $data['gender'];
        $product->details = $data['details'];
        $product->title = $data['title'];
        $product->price = $data['price'];
        $product->tag = $data['tag'];
        $product->stock = $data['stock'];
        $product->salePrice = $data['salePrice'];
        $product->upsell = $data['upsell'];

        if ($data['startDate'] > now()) {
            $product->visible = 1;
        }

        if (!isset($data['startDate'])) {
            $product->visible = 1;
        }

        $product->startDate = $data['startDate'];
        $product->endDate = $data['endDate'];

        $product->save();

        $images = $data['images'];
        $colors = $data['colors'];
        $sizes = $data['sizes'];
        $categories = $data['categories'];

        foreach ($images as $base64Image) {
            $imageData = ['image' => $base64Image, 'product_id' => $product->id];
            $this->createImage($imageData);
        }

        foreach ($sizes as $size) {
            $sizeData = ['product_id' => $product->id,'sizes' => $size];
            $this->createSize($sizeData);
        }

        foreach ($categories as $category) {
            $categoryData = ['product_id' => $product->id,'category_id' => $category];
            $this->createProductCategory($categoryData);
        }

        foreach ($colors as $color) {
            $colorData = ['product_id' => $product->id,'color_id' => $color];
            $this->createProductColor($colorData);
        }

        return new ProductResource($product);
    }




    public function createImage($data)
    {
        $validator = Validator::make($data,[
            'image' => 'string', 'product_id' => 'exists:App\Models\Product,id'
        ]);

        $data2 = $validator->validated();

        $data2['image'] = $this->saveImage($data2['image']);

        return Image::create($data2);

    }

    public function createSize($data)
    {   
        $validator = Validator::make($data,[
            'sizes' => 'string','product_id' => 'exists:App\Models\Product,id'
        ]);

        return Size::create($validator->validated());

    }

    public function createProductColor($data)
    {
        $validator = Validator::make($data, [
            'color_id' => 'exists:App\Models\Color,id',
            'product_id' => 'exists:App\Models\Product,id'
        ]);

        $validatedData = $validator->validated();

        $product = Product::find($validatedData['product_id']);
        $color = Color::find($validatedData['color_id']);

        if (!$product || !$color) {
            throw new \Exception('Product or Category not found');
        }

        $product->colors()->attach($color->id);

        return true;
    }

    public function createProductCategory($data)
    {
        $validator = Validator::make($data, [
            'category_id' => 'exists:App\Models\Category,id',
            'product_id' => 'exists:App\Models\Product,id'
        ]);

        $validatedData = $validator->validated();

        $product = Product::find($validatedData['product_id']);
        $category = Category::find($validatedData['category_id']);

        if (!$product || !$category) {
            throw new \Exception('Product or Category not found');
        }

        $product->categories()->attach($category->id);

        return true;
    }
    
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        $product->update([
            'gender' => $data['gender'],
            'details' => $data['details'],
            'title' => $data['title'],
            'price' => $data['price'],
            'tag' => $data['tag'],
            'salePrice' => $data['salePrice'],
            'upsell' => $data['upsell'],
            'startDate' => $data['startDate'],
            'endDate' => $data['endDate'],
        ]);

        // Update images, sizes, and categories using helper functions
        if (isset($data['images']) && !empty($data['images'])) {
            $this->updateImages($product, $data['images']);
        } 

        if (isset($data['sizes'])) {
            $this->updateSizes($product, $data['sizes']);
        }

        if (isset($data['categories'])) {
            $this->updateCategories($product, $data['categories']);
        }

        if (isset($data['colors'])) {
            $this->updateColors($product, $data['colors']);
        }

        if ($data['startDate'] > now()) {
            $product->visible = 1;
        }
        
        // Check if alternateImage and frontImage are provided, otherwise retain existing values
        if (isset($data['frontImage'])) {
            $product->frontImage = $this->saveImage($data['frontImage']);
        }

        if (isset($data['alternateImage'])) {
            $product->alternateImage = $this->saveImage($data['alternateImage']);
        }

        // Save the updated product with the possibly modified frontImage and alternateImage
        $product->save();

        return new ProductResource($product);

    }

    // Helper function to update images
    private function updateImages(Product $product, array $images)
    {
        $product->images()->delete();

        // Create and associate new images
        foreach ($images as $base64Image) {
            $imageData = ['image' => $base64Image, 'product_id' => $product->id];
            $this->createImage($imageData);
        }
    }

    private function updateSizes(Product $product, array $sizes)
    {
        // Delete existing sizes related to the product
        $product->sizes()->delete();

        // Create and associate new sizes
        foreach ($sizes as $size) {
            $sizeData = ['product_id' => $product->id, 'sizes' => $size];
            $this->createSize($sizeData);
        }
    }

    private function updateCategories(Product $product, array $categories)
    {
        // Detach all existing categories from the product
        $product->categories()->detach();

        // Attach new categories to the product
        foreach ($categories as $category) {
            $categoryData = ['product_id' => $product->id, 'category_id' => $category];
            $this->createProductCategory($categoryData);
        }
    }

    private function updateColors(Product $product, array $colors)
    {
        // Detach all existing categories from the product
        $product->colors()->detach();

        // Attach new categories to the product
        foreach ($colors as $color) {
            $colorData = ['product_id' => $product->id, 'color_id' => $color];
            $this->createProductColor($colorData);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        $product->sizes()->delete();
        $product->images()->delete();
        
        $absolutePath = public_path($product->frontImage);
        File::delete($absolutePath);
        
        $absolutePath2 = public_path($product->alternateImage);
        File::delete($absolutePath2);

        return response("",204);        
    }

}
