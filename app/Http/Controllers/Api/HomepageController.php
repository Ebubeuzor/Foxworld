<?php

namespace App\Http\Controllers\Api;
use FFMpeg\FFMpeg;
use App\Http\Controllers\Controller;
use App\Models\Homepage;
use App\Http\Requests\StoreHomepageRequest;
use Illuminate\Support\Str;
use App\Http\Requests\UpdateHomepageRequest;
use App\Http\Resources\HomepageResource;
use FFMpeg\FFMpeg as FFMpegFFMpeg;
use Illuminate\Support\Facades\File;

class HomepageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HomepageResource::collection(
            Homepage::all()
        );
    }



    private function saveImage($image)
    {
        // Check if image is base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $matches)) {
            $imageData = substr($image, strpos($image, ',') + 1);
            $imageType = strtolower($matches[1]);

            // Check if file is an image
            if (!in_array($imageType, ['jpg', 'jpeg', 'gif','webp', 'png'])) {
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

    private function saveVideo($video)
    {
        // Check if video is base64 string
        if (preg_match('/^data:video\/(\w+);base64,/', $video, $matches)) {
            $videoData = substr($video, strpos($video, ',') + 1);
            $videoType = strtolower($matches[1]);

            // Check if file is a video
            if (!in_array($videoType, ['mp4','webm', 'avi', 'mov', 'mkv'])) {
                throw new \Exception('Invalid video type');
            }

            // Decode base64 video data
            $decodedVideo = base64_decode($videoData);

            if ($decodedVideo === false) {
                throw new \Exception('Failed to decode video');
            }
        } else {
            throw new \Exception('Invalid video format');
        }

        $dir = 'videos/';
        $file = Str::random() . '.' . $videoType;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        // Save the decoded video to the file
        if (!file_put_contents($absolutePath . $file, $decodedVideo, FILE_BINARY)) {
            throw new \Exception('Failed to save video');
        }

        return $relativePath;
    }

    public function store(StoreHomepageRequest $request)
    {
        $data = $request->validated();
        
        $attributes = [];

        if (isset($data['homevideo'])) {
            $attributes['homevideo'] = $this->saveVideo($data['homevideo']);
        }

        if (isset($data['homeImage'])) {
            $attributes['homeImage'] = $this->saveImage($data['homeImage']);
        }

        if (isset($data['Section1Title'])) {
            $attributes['Section1Title'] = $data['Section1Title'];
        }

        if (isset($data['Section2aCategory'])) {
            $attributes['Section2aCategory'] = $data['Section2aCategory'];
        }

        if (isset($data['Section2bCategory'])) {
            $attributes['Section2bCategory'] = $data['Section2bCategory'];
        }

        if (isset($data['Section1Image'])) {
            $attributes['Section1Image'] = $this->saveImage($data['Section1Image']);
        }

        if (isset($data['Section2aImage'])) {
            $attributes['Section2aImage'] = $this->saveImage($data['Section2aImage']);
        }

        if (isset($data['Section2bImage'])) {
            $attributes['Section2bImage'] = $this->saveImage($data['Section2bImage']);
        }

        Homepage::updateOrCreate([], $attributes);

        return response('');
    }



    public function update(UpdateHomepageRequest $request, Homepage $homepage)
    {
        try {
            $data = $request->validated();

            $homepage->update($data);

            if (isset($data['homevideo'])) {
                $videoPath = $this->saveVideo($data['homevideo']);
                $homepage->update(['homevideo' => $videoPath]);
            }

            if (isset($data['Section1Title'])) {
                $Section1Title = $data['Section1Title'];
                $homepage->update(['Section1Title' => $Section1Title]);
            }

            if (isset($data['Section2aCategory'])) {
                $Section2aCategory = $data['Section2aCategory'];
                $homepage->update(['Section2aCategory' => $Section2aCategory]);
            }

            if (isset($data['Section2bCategory'])) {
                $Section2bCategory = $data['Section2bCategory'];
                $homepage->update(['Section2bCategory' => $Section2bCategory]);
            }

            if (isset($data['Section1Image'])) {
                $imagePath = $this->saveImage($data['Section1Image']);
                $homepage->update(['Section1Image' => $imagePath]);
            }

            if (isset($data['Section2aImage'])) {
                $imagePath = $this->saveImage($data['Section2aImage']);
                $homepage->update(['Section2aImage' => $imagePath]);
            }

            if (isset($data['Section2bImage'])) {
                $imagePath = $this->saveImage($data['Section2bImage']);
                $homepage->update(['Section2bImage' => $imagePath]);
            }

            return new HomepageResource($homepage);
        } catch (\Exception $e) {
            // Handle the exception gracefully
            return response(['message' => 'Error occurred: ' . $e->getMessage()], 500);
        }
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Homepage  $homepage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Homepage $homepage)
    {
        //
    }
    
}
