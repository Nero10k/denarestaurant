# Image Placeholders

This directory should contain all images for the DENA'S Persian Fusion Restaurant website.

## Required Images

### Homepage (`index.html`)
| Filename | Description | Recommended Size |
|----------|-------------|------------------|
| `hero-main.jpg` | Hero background - Persian rice dish with saffron chicken | 1920x1080px |
| `dish-khoresh.jpg` | Khoresh Bademjan (eggplant stew) | 800x1200px |
| `dish-fish.jpg` | Oven grilled fish plate | 800x400px |
| `dish-surprise.jpg` | Chef's surprise salad/bowl | 800x400px |
| `gallery-1.jpg` to `gallery-8.jpg` | Food gallery images | 600x600px (square) |
| `story-rice.jpg` | Saffron rice close-up | 800x600px |
| `catering-platter.jpg` | Catering platter with multiple dishes | 800x600px |

### Menu Page (`menu.html`)
| Filename | Description | Recommended Size |
|----------|-------------|------------------|
| `menu-hero.jpg` | Decorative header image (optional) | 1920x400px |

### Story Page (`story.html`)
| Filename | Description | Recommended Size |
|----------|-------------|------------------|
| `story-salad.jpg` | Salad bowl for "The Beginning" section | 800x600px |
| `story-tomatoes.jpg` | Cherry tomatoes for "Our Values" section | 800x500px |
| `story-catering.jpg` | Catering setup for "Journey Continues" | 800x500px |

### Catering Page (`catering.html`)
| Filename | Description | Recommended Size |
|----------|-------------|------------------|
| `catering-hero.jpg` | Hero background - blurred catering setup | 1920x800px |
| `catering-intro.jpg` | Samosas or appetizers | 800x500px |
| `catering-corporate.jpg` | Corporate event setup | 600x400px |
| `catering-private.jpg` | Deviled eggs or celebration food | 600x400px |
| `catering-custom.jpg` | Cherry tomatoes on skewers | 600x400px |
| `catering-process.jpg` | Rose-shaped appetizers | 800x500px |
| `catering-menu.jpg` | Herb dish | 600x400px |

### Contact Page (`contact.html`)
| Filename | Description | Recommended Size |
|----------|-------------|------------------|
| `contact-hero.jpg` | Restaurant storefront exterior | 1920x600px |

## Image Guidelines

- **Format**: JPEG for photos, PNG for graphics with transparency
- **Quality**: Optimize for web (aim for < 500KB per image)
- **Style**: Warm, inviting food photography with good lighting
- **Color**: Should complement the warm terracotta and cream color palette

## How to Add Images

1. Place your images in this `/images/` directory
2. Update the HTML files to reference actual images instead of placeholders
3. Replace `<div class="placeholder-image">` with `<img>` tags

Example:
```html
<!-- Before (placeholder) -->
<div class="placeholder-image" style="height: 400px;">
  <span>Hero Image Description</span>
</div>

<!-- After (with actual image) -->
<img src="images/hero-main.jpg" alt="Persian rice dish with saffron" class="hero-image">
```


