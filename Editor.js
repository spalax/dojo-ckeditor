define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/form/_FormValueWidget",
    "dojo/text!./templates/Editor.html",
    "ckeditor/ckeditor"
    ],
    function(declare, lang, string, _Widget,
             _TemplatedMixin, _FormValueWidget, templateEditor){

        return declare("dojo-ckeditor.Editor",
                       [ _Widget, _TemplatedMixin, _FormValueWidget], {
            cols: 80,
            rows: 10,
            settings: {},
            defaultLang: 'en',

            templateString: templateEditor,

            postCreate: function () {
                try {
                    CKEDITOR.replace(this.domNode, lang.mixin({
                        language: dojoConfig && dojoConfig.locale || this.defaultLang,
                        id: this.id
                    }, this.settings));

                    this.editor = CKEDITOR.instances[this.id];

                    this.editor.on('instanceReady', lang.hitch(this, function (){
                        // Will be deleted soon
                        this.emit('ready', this);

                        this.emit('dojo-ckeditor-ready', this);
                    }));

                    this.editor.on('change', lang.hitch(this, function (){
                        this._handleOnChange(this.get('value'));
                    }));

                    this.editor.on('blur', lang.hitch(this, function (){
                        this._onBlur();
                    }));

                    this.editor.on('focus', lang.hitch(this, function (){
                        this._onFocus();
                    }));

                    // Copy value from srcNodeRef, unless user specified a value explicitly (or there is no srcNodeRef)
                    // TODO: parser will handle this in 2.0
                    if(!this.value && this.srcNodeRef){
                        this.set('value', this.srcNodeRef.value);
                    }

                } catch (e) {
                    console.error(this.declaredClass, arguments, e);
                    throw e;
                }
            },

            focus: function () {
                try {
                    this.inherited(arguments);
                    this.editor.focus();
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _setValueAttr: function (value) {
                try {
                    if (this.__lock) {
                        this.defer(function (){
                            this.set('value', value);
                        }, 10);
                        return;
                    }

                    this.__lock = true;

                    var inherited = lang.hitch(this, 'inherited', arguments);
                    this.editor.setData(value || '', lang.hitch(this, function (){
                        this.__lock = false;
                        inherited();
                    }));
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            },

            destroy: function () {
                try {
                    this.editor && this.editor.destroy();
                    this.inherited(arguments);
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _getValueAttr: function () {
                try {
                    return string.trim(this.editor.getData());
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            }
        });
    });
