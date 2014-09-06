/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** {ext_name} Extension 
    description 
*/
define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule("command/CommandManager"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        EditorManager  = brackets.getModule("editor/EditorManager");
    
    var UP = "divsmith.nav-shortcuts.up";
    var DOWN = "divsmith.nav-shortcuts.down";
    var LEFT = "divsmith.nav-shortcuts.left";
    var RIGHT = "divsmith.nav-shortcuts.right";
    
    function handleUp() {
        var Editor = EditorManager.getFocusedEditor();
        var position = Editor.getCursorPos();
        
        if (position.line > 0) {
            Editor.setCursorPos(position.line - 1, position.ch);
        }
    }
    
    function handleDown() {
        var Editor = EditorManager.getFocusedEditor();
        var position = Editor.getCursorPos();
        
        Editor.setCursorPos(position.line + 1, position.ch);
    }
    
    function handleLeft() {
        var Editor = EditorManager.getFocusedEditor();
        var position = Editor.getCursorPos();
        
        if( position.ch > 0) {
            Editor.setCursorPos(position.line, position.ch - 1);
        }
    }
    
    function handleRight() {
        var Editor = EditorManager.getFocusedEditor();
        var position = Editor.getCursorPos();
        
        Editor.setCursorPos(position.line, position.ch + 1);
    }
    
    
    CommandManager.register("Nav-shortcuts UP", UP, handleUp);
    CommandManager.register("Nav-shortcuts DOWN", UP, handleDown);
    CommandManager.register("Nav-shortcuts LEFT", UP, handleLeft);
    CommandManager.register("Nav-shortcuts RIGHT", UP, handleRight);
    
    KeyBindingManager.addBinding(UP, {key: "Alt-I"});
    KeyBindingManager.addBinding(DOWN, {key: "Alt-K"});
    KeyBindingManager.addBinding(LEFT, {key: "Alt-J"});
    KeyBindingManager.addBinding(RIGHT, {key: "Alt-L"});
     
});