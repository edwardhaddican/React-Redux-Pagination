# Week 1 / Day 3 Morning Q&A

## Data Structures Checkpoint

How can I add/remove items to an array without using it's prototype methods such as `push` and `pop`?


Well, you can use pointers, like in this example (we're naming them `head` and `tail`):

```js
head = 0;
tail =  0;
memmory = [];

memmory[tail] = "cassio"
tail++;

memmory[tail] = "tom"
tail++;

// memmory = [cassio, tom];
```

## Softwares for diagraming / wireframing

Google Draw // generic collaborative drawing tool 
Wireframes // Axure

Mindmapping/ whitebording


## Flexbox vs bootstrap

Flexbox is a CSS language feature that allows you to layout elements. Other layouting options available in CSS include: floats, absolute positioning, grid (Fairly new)

Bootstrap is a framework. You download a bunch of pre-made CSS and JavaScript code and can then simply reuse the provided classes to quickly layout something. It's fairly fast compared to doing it manually in CSS, but is also less flexible/customizeable/unique.

Othes CSS Frameworks include: Bootstrap, BassCSS, SemanticUI, Pure, Foundation


## Image Streching / squishing
```css
.strech-fit {
  width: 100%
  heigh: auto;
}
```

```html
  <img class="strech-fit" src="whatever.gif" alt="whatever" />
  <img src="nostrech.gif" alt="No streching, please" />
```


Personal opinion: Use background-image for more control/more options

```css
.highlight {
  background-image: "file.jpg";
  background-size: cover;
}
```

```html

  <div class="highlight" />
```

Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size


