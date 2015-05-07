Toggle Class
============

JQuery plugin used to toggle classes from elements on click. Can be used to create hamburger menus, accordion texts etc.

__Attributes__
- [data-class-toggle] the class to be toggled to the element
- [data-class-toggle-target] add on click event to this element instead of itself
- [data-class-toggle-scrollto] set to true in order to scroll to this element when the toggle class is applied
- [data-class-toggle-single] only one element will have this class
- [data-class-toggle-event] the event that will trigger the toggling

__Examples__
([jsfiddle](http://jsfiddle.net/liberat0r/xo686jy9/))

The class is toggled when the div is clicked.
```
<div class="simple-toggled-div" data-class-toggle="simple-toggled-div--modified">Click me</div>
```

The class is toggled when the button is clicked.
```
<div class="target-toggled-div" data-class-toggle="target-toggled-div--modified" data-class-toggle-target=".target-toggled-div__button">Toggle me</div>
<button class="target-toggled-div__button">Click me</button>
```
