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
    
    function getCursorPosition() {
        var Editor = EditorManager.getFocusedEditor();
        
        if (Editor) {
            return Editor.getCursorPos();
        } else {
            return false;
        }
    }
    
    function setCursorPosition(line, character) {
        var Editor = EditorManager.getFocusedEditor();
        
        if (Editor) {
            return Editor.setCursorPos(line, character);
        } else {
            return false;
        }
    }
    
    function handleUp() {
        var position = getCursorPosition();
        
        if (position.line > 0) {
            setCursorPosition(position.line - 1, position.ch);
        }
    }
    
    function handleDown() {
        var position = getCursorPosition();
        
        setCursorPosition(position.line + 1, position.ch);
    }
    
    function handleLeft() {
        var position = getCursorPosition();
        
        if (position.ch > 0) {
            setCursorPosition(position.line, position.ch - 1);
        }
    }
    
    function handleRight() {
        var position = getCursorPosition();
        
        setCursorPosition(position.line, position.ch + 1);
    }
    
    CommandManager.register("Nav-shortcuts UP", UP, handleUp);
    CommandManager.register("Nav-shortcuts DOWN", DOWN, handleDown);
    CommandManager.register("Nav-shortcuts LEFT", LEFT, handleLeft);
    CommandManager.register("Nav-shortcuts RIGHT", RIGHT, handleRight);
     
});