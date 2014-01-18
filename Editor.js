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
    function(declare, lang, string, _Widget, _TemplatedMixin, _FormValueWidget, templateEditor){

        return declare("dojo-ckeditor.Editor", [ _Widget, _TemplatedMixin, _FormValueWidget], {
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

                    this.get('editor').on('instanceReady', lang.hitch(this, function (){
                        this.emit('ready', this);
                    }));

                    this.get('editor').on('change', lang.hitch(this, function (){
                        this._handleOnChange(this.get('value'));
                    }));

                    this.get('editor').on('blur', lang.hitch(this, function (){
                        this._onBlur();
                    }));

                    this.get('editor').on('focus', lang.hitch(this, function (){
                        this._onFocus();
                    }));
                } catch (e) {
                    console.error(this.declaredClass, arguments, e);
                    throw e;
                }
            },

            focus: function () {
                try {
                    this.inherited(arguments);
                    this.get('editor').focus();
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _getEditorAttr: function () {
                try {
                    return CKEDITOR.instances[this.id];
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
                    this.get('editor').setData(value || '', lang.hitch(this, function (){
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
                    this.get('editor').destroy();
                    this.inherited(arguments);
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _getValueAttr: function () {
                try {
                    return string.trim(this.get('editor').getData());
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            }
        });
    });
