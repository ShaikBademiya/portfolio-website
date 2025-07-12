# Image Optimization Guide for Portfolio Website

This guide documents the process of optimizing and organizing images for the portfolio website.

## Directory Structure

```
assets/
└── images/
    ├── about/         # About section images
    ├── profile/       # Profile/avatar images
    ├── projects/      # Project showcase images
    └── testimonials/  # Testimonial author images
```

## Tools Required

1. **ImageMagick**: For image resizing and format conversion
   ```bash
   brew install imagemagick
   ```

2. **WebP**: For WebP format conversion
   ```bash
   brew install webp
   ```

## Image Optimization Process

### 1. Image Preparation

1. Start with high-quality source images
2. Place original images in their respective folders based on usage:
   - Profile images in `images/profile/`
   - About section images in `images/about/`
   - Project images in `images/projects/`
   - Testimonial images in `images/testimonials/`

### 2. Image Optimization Steps

#### For Profile Image (400x400):
```bash
# Convert to standard size
convert original.jpg -resize 400x400 profile.jpg

# Create smaller version for mobile
convert original.jpg -resize 200x200 profile-200.jpg

# Convert to WebP format
cwebp profile.jpg -o profile.webp
cwebp profile-200.jpg -o profile-200.webp
```

#### For Project Images (400x250):
```bash
# Convert to standard size
convert original.jpg -resize 400x250 project.jpg

# Create smaller version for mobile
convert original.jpg -resize 200x125 project-small.jpg

# Convert to WebP format
cwebp project.jpg -o project.webp
cwebp project-small.jpg -o project-small.webp
```

#### For Testimonial Images (60x60):
```bash
# Convert to standard size
convert original.jpg -resize 60x60 testimonial.jpg

# Convert to WebP format
cwebp testimonial.jpg -o testimonial.webp
```

### 3. HTML Implementation

Use the following HTML pattern for responsive, optimized images:

```html
<!-- For regular images (e.g., projects) -->
<img src="assets/images/projects/project.webp"
     alt="Project Description"
     width="400"
     height="250"
     loading="lazy"
     srcset="assets/images/projects/project-small.webp 200w,
             assets/images/projects/project.webp 400w"
     sizes="(max-width: 768px) 200px,
             400px"
     onerror="this.onerror=null; this.src='assets/images/projects/project.jpg'">

<!-- For profile/avatar image -->
<img src="assets/images/profile/profile.webp"
     alt="Profile Description"
     width="400"
     height="400"
     loading="eager"
     srcset="assets/images/profile/profile-200.webp 200w,
             assets/images/profile/profile.webp 400w"
     sizes="(max-width: 768px) 200px,
             400px"
     onerror="this.onerror=null; this.src='assets/images/profile/profile.jpg'">
```

### 4. Key Features Implemented

1. **Multiple Formats**:
   - WebP as primary format (better compression, modern browsers)
   - JPG as fallback (older browser support)

2. **Responsive Images**:
   - Multiple sizes for different devices
   - Appropriate srcset and sizes attributes
   - Smaller images for mobile devices

3. **Performance Optimizations**:
   - Lazy loading for non-critical images
   - Eager loading for above-the-fold images
   - Width and height attributes to prevent layout shifts
   - Proper alt text for accessibility

4. **Organized Structure**:
   - Separate folders by image purpose
   - Consistent naming conventions
   - Easy to maintain and update

## Best Practices

1. **Image Naming**:
   - Use descriptive, lowercase names
   - Include size in filename for variants
   - Use hyphens for separators

2. **Loading Strategies**:
   - Use `loading="eager"` for above-the-fold images
   - Use `loading="lazy"` for below-the-fold images

3. **Image Dimensions**:
   - Profile: 400x400 (main), 200x200 (mobile)
   - Projects: 400x250 (main), 200x125 (mobile)
   - Testimonials: 60x60 (fixed size)

4. **Quality Settings**:
   - WebP: Default cwebp settings (good balance)
   - JPG: High quality for main images
   - Smaller files for mobile versions

## Maintenance

1. Keep original high-quality images as source files
2. Follow the same optimization process for new images
3. Maintain consistent naming conventions
4. Regularly check for broken images
5. Update fallback paths if file structure changes

## Command Reference

### Batch Processing Projects:
```bash
for i in {1..6}; do
  convert "project$i-original.jpg" -resize 400x250 "project$i.jpg"
  convert "project$i-original.jpg" -resize 200x125 "project$i-small.jpg"
  cwebp "project$i.jpg" -o "project$i.webp"
  cwebp "project$i-small.jpg" -o "project$i-small.webp"
done
```

### Batch Processing Testimonials:
```bash
for i in {1..3}; do
  convert "testimonial$i-original.jpg" -resize 60x60 "testimonial$i.jpg"
  cwebp "testimonial$i.jpg" -o "testimonial$i.webp"
done
``` 