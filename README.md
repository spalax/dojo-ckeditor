This project provides wrapper for [CKEditor](http://ckeditor.com/) to use inside dojo toolkit with dijit Forms.
This wrapper defines new FormValue object dojo-ckeditor/Editor.

The dojo-ckeditor project is available under the MIT license.

# Installation

## Automatic Download with Bower

dojo-ckeditor can be installed via [Bower](https://github.com/bower/bower)
using the following command:

    bower install dojo-ckeditor

## Getting Started

Just include dojo-ckeditore in your AMD dojo module.

```
define(["dojo-ckeditor/Editor"], function (Editor) {
    // You will have CKEditor functionality under "Editor" variable
})
```

### Known issue

If you will use Editor declaratively, with async:false, and parseOnLoad:true then you might need set CKEDITOR_BASEPATH to the global scope:

```javascript
    var CKEDITOR_BASEPATH = '/base_path_to/ckeditor/';
```

but you can avoid it if you will configure dojo like this :

```html
<script type="text/javascript">
    dojoConfig = {
        async: true,
        parseOnLoad: true,
    };

</script>

<script type="text/javascript" src="/base_path_to/dojo.js"></script>

<script type="text/javascript">
    require(["dojo/parser"]);
</script>
```
