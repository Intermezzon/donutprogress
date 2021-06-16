# donutprogress
Simple standalone web component to render a simple donut graph.

## Install
```
npm install -S @intermezzon/donutprogress
```

## Usage
This is a web component, so first of all, include the script
```
<script src="lib/iz-donutprogress.js"></script>
```

Then since this is a web component, we just use the tag `iz-donutprogres`

```
<div>
	<iz-donutprogress value="40" content="Test 1"></iz-donutprogress>
</div>

```

this will produce
![alt text](https://github.com/Intermezzon/donutprogress/blob/main/images/test1.jpg?raw=true)

## Attributes

 - **value:** The value to visualize donut to
 - **max:** Max value. Defaul 100
 - **content:** Text to show in middle of the donut
 - **size:** Size in pixels for both width and height. Default 100
 - **stroke:** Stroke size. Default 10
 - **color:** Color of the progressbar. Default rgba(255,0,0,0.7)
 - **reverse:** Set if progress should visualize counter clock wise
 