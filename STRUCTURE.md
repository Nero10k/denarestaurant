# DENA'S Persian Fusion Restaurant - Website Structure

## Overview
A multi-page website for DENA'S Persian Fusion Restaurant in Den Haag, Netherlands.
Persian-inspired design with warm terracotta, deep maroon, and golden cream colors.

---

## Color Palette
- **Primary (Terracotta)**: #C65D34
- **Secondary (Deep Maroon)**: #5B2323  
- **Accent (Golden Cream)**: #F5E6C8
- **Light Background**: #F5E6C8
- **Text Dark**: #5B2323
- **Text Light**: #F5E6C8

## Typography
- **Headings**: Serif font (decorative, elegant)
- **Body**: Clean sans-serif
- **Logo**: Custom stylized "DENA" text

---

## Site Structure

### Global Components

#### Header/Navigation
- Logo (left): "DENA" stylized text
- Navigation links (center): Home, Menu, Story, Catering, Contact
- CTA buttons (right): 
  - "Book a table" (outlined)
  - "Order online" (filled terracotta)
- Background: Deep maroon (#5B2323)

#### Footer
- Background: Deep maroon
- 3 columns:
  1. **Brand**: Logo, tagline "Persian culture, shared around one table", address
  2. **Quick Links**: Home, Menu, Story, Catering, Contact
  3. **Contact**: Phone, Email, "Order online" button, Social (Instagram)

---

## Pages

### 1. HOME PAGE (index.html)

#### Hero Section
- Full-width background image: Persian dish with rice
- Content overlay:
  - "DENA'S Persian Fusion Restaurant" (large heading)
  - "Persian culture, shared around one table." (subheading)
  - "Experience the warmth of a Persian home, told through food." (italic text)
  - CTAs: "Book a table", "Order online"

#### Introduction Text
- Cream background
- Justified paragraph about the restaurant story
- "At DENA'S Persian Fusion Restaurant, every dish tells part of a family journey..."

#### Signature Dishes Section
- Background: Terracotta orange
- Heading: "Signature Dishes"
- Subheading: "Discover our most beloved creations"
- Bento-style grid layout:
  - Large left: "Khoresh Bademjan" - Persian stew with eggplants
  - Top right: "Oven grilled fish plate" - Sea bass with saffron rice
  - Bottom right: "Chef's surprise" - Homecooked meal of the week

#### Family Kitchen Section
- Background: Golden cream
- Heading: "A family kitchen, open to everyone"
- Subheading: "Persian dishes, made with care..."
- 4x2 grid of food images (8 images total)

#### Our Story Section
- Background: Golden cream
- Left: Text content with "Our Story" heading and description
- Right: Food image
- CTA: "Read our story" button

#### Catering Services Section
- Background: Deep maroon
- Left: Food platter image
- Right: "Catering Services" heading, description, "Learn more" button

#### Come Dine With Us Section
- Background: Golden/cream gradient
- Heading: "Come Dine With Us" (italic)
- Two cards side by side:
  1. **Location card**: Address (Prinsestraat 62, 2513 CE Den Haag), "Get directions" link
  2. **Opening Hours card**: Hours for each day

---

### 2. MENU PAGE (menu.html)

#### Hero Banner
- Background: Deep maroon with decorative elements
- Heading: "Our Menu"
- Subheading: "Discover our Persian-inspired seafood and grilled specialties"

#### Filter Tabs
- Buttons: All, Lunch, Dinner, Desserts, Drinks
- Active state: Filled terracotta

#### Menu Sections

**Lunch Section**
Menu items with:
- Name (terracotta heading)
- Category tag (e.g., "Breakfast", "Sandwich")
- Description
- Price (right-aligned, terracotta)
- Dotted line separator

Sample items:
- DENA's Breakfast Sandwich - €10.50
- Salmon Sandwich - €8.50
- Chicken Sandwich - €9.50
- Fish Sandwich - €10.50
- Turkey Sandwich - €8.50

---

### 3. STORY PAGE (story.html)

#### Hero Section
- Background: Terracotta
- Heading: "Our Story"
- Subheading: "Where Persian roots meet life in Den Haag" (italic)

#### The Beginning Section
- Background: Golden cream
- Heading: "The Beginning" (terracotta)
- 3 paragraphs about Dena's journey
- Right: Food bowl image

#### Our Values Section
- Background: Terracotta
- Heading: "Our Values" (cream)
- Text about food philosophy
- Right: Food image (cherry tomatoes)

#### The Journey Continues Section
- Background: Golden cream
- Heading: "The Journey Continues" (terracotta)
- Text about family-run kitchen
- Right: Catering food image

---

### 4. CATERING PAGE (catering.html)

#### Hero Section
- Background image: Blurred catering setup
- Overlay: Semi-transparent maroon
- Heading: "Catering Services"
- Subheading: "Elevate your events with our premium catering experience."

#### Introduction Section
- Background: Golden cream
- Text about catering services
- Right: Food platter image

#### Catering Packages Section
- Background: Terracotta
- Heading: "Catering Packages"
- 3 cards (cream background):
  1. **Corporate Events** - From €35/person
  2. **Private Celebrations** - From €45/person
  3. **Custom Experiences** - Custom pricing

#### Our Catering Process Section
- Background: Golden cream
- Heading: "Our Catering Process"
- Left: Food image
- Right: 4 numbered steps in 2x2 grid:
  1. Consultation
  2. Menu Creation
  3. Event Planning
  4. Execution

#### Sample Menu Highlights Section
- Background: Deep maroon
- Heading: "Sample Menu Highlights"
- Left: Food image
- Right: 4 cards (2x2):
  - Seafood Platters
  - Grilled Seafood Selections
  - Premium Meat & Vegetarian Options
  - Custom Desserts & Beverages

#### CTA Section
- Background: Golden cream
- Heading: "Ready to Plan Your Event?"
- Subtext
- Button: "Request a Catering Quote"

---

### 5. CONTACT PAGE (contact.html)

#### Hero Section
- Background image: Restaurant storefront
- Overlay: Semi-transparent
- Heading: "Contact Us"
- Subheading: "We'd love to hear from you"

#### Contact Information Section
- Background: Golden cream
- Left column - "Get in Touch":
  - **Address**: Prinsestraat 62, 2513 CE Den Haag, Netherlands
  - **Phone**: 06 27481111
  - **Email**: info@dena-restaurant.com
  - **Opening Hours**: Listed by day
  - CTAs: "Book a table", "Order online"
- Right column: Embedded Google Map

---

## File Structure

```
denarestuarant/
├── index.html
├── menu.html
├── story.html
├── catering.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── (placeholder directory)
└── STRUCTURE.md
```

---

## Image Placeholders Needed

### Homepage
- hero-main.jpg (hero background - Persian dish)
- dish-khoresh.jpg (Khoresh Bademjan)
- dish-fish.jpg (Grilled fish plate)
- dish-surprise.jpg (Chef's surprise salad)
- gallery-1.jpg through gallery-8.jpg (food grid)
- story-rice.jpg (saffron rice close-up)
- catering-platter.jpg (catering section)

### Menu Page
- menu-hero.jpg (decorative header)

### Story Page
- story-salad.jpg (beginning section)
- story-tomatoes.jpg (values section)
- story-catering.jpg (journey section)

### Catering Page
- catering-hero.jpg (hero background)
- catering-intro.jpg (samosas/appetizers)
- catering-corporate.jpg
- catering-private.jpg (deviled eggs)
- catering-custom.jpg (cherry tomatoes)
- catering-process.jpg (rose appetizers)
- catering-menu.jpg (herb dish)

### Contact Page
- contact-hero.jpg (restaurant storefront)

---

## External Links
- Book a table: (external reservation system)
- Order online: (external ordering system)
- Get directions: Google Maps link
- Instagram: Social profile

---

## Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px


