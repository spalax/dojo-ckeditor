define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dojo/dom-geometry",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/_FormValueWidget",
    "dojo/text!./templates/Editor.html",
    "ckeditor/ckeditor",
    "dojo-common/form/FileInputAuto"
],
    function(declare, lang, _Widget, _TemplatedMixin, domGeometry, _WidgetsInTemplateMixin,
             _FormValueWidget, templateEditor){

        return declare("dojo-common.form.editor.Editor", [ _Widget, _TemplatedMixin,
                                                           _FormValueWidget, _WidgetsInTemplateMixin ], {

            cols: 80,
            rows: 10,
            settings: {},

            templateString: templateEditor,

            postMixInProperties: function () {
                try {
                    this.inherited(arguments);
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            },

            postCreate: function () {
                try {
                    CKEDITOR.replace( this.domNode, lang.mixin(this.settings, {
                        language: dojoConfig && dojoConfig.locale || 'en',
                        id: this.id
                    }));

                    this.get('editor').on('instanceReady', lang.hitch(this, function (){
                        this.emit('ready', this);
                    }));
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
                    this.get('editor').setData(value);
                    this.inherited(arguments);
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            },

            _getValueAttr: function () {
                try {
                    return this.get('editor').getData();
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            }
        });
    });
