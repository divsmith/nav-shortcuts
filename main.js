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
    
    var characterPosition = 0;
    
    function getCharacterPosition() {
        return getEditor(function(Editor) {
            var position = Editor.getCursorPos();
            
            if (position.ch > characterPosition) {
                characterPosition = position.ch;
            }
            
            return characterPosition;
        });
    }
    
    function getLinePosition() {
        return getEditor(function(Editor) {
            var position = Editor.getCursorPos();
            
           return position.line; 
        });
    }
    
    function setLinePosition(line) {
        return getEditor(function(Editor) {
            return Editor.setCursorPos(line, getCharacterPosition());
        });
    }
    
    function setCharacterPosition(character) {
        return getEditor(function(Editor) {
            characterPosition = character;
            return Editor.setCursorPos(getLinePosition(), character);
        });
    }
    
    function getEditor(callback) {
        var Editor = EditorManager.getFocusedEditor();
        
        if (Editor) {
            return callback(Editor);
        } else {
            return false;
        }
    }
    
    function handleUp() {
        var line = getLinePosition();
        
        if (line > 0) {
            setLinePosition(line - 1);
        }
    }
    
    function handleDown() {
        var line = getLinePosition();
        
        setLinePosition(line + 1);
    }
    
    function handleLeft() {
        var character = getCharacterPosition();
        
        if (character > 0) {
            setCharacterPosition(character - 1);
        }
    }
    
    function handleRight() {
        var character = getCharacterPosition();
        
        setCharacterPosition(character + 1);
    }
    
    var UP = "divsmith.nav-shortcuts.up";
    var DOWN = "divsmith.nav-shortcuts.down";
    var LEFT = "divsmith.nav-shortcuts.left";
    var RIGHT = "divsmith.nav-shortcuts.right";
    
    CommandManager.register("Nav-shortcuts UP", UP, handleUp);
    CommandManager.register("Nav-shortcuts DOWN", DOWN, handleDown);
    CommandManager.register("Nav-shortcuts LEFT", LEFT, handleLeft);
    CommandManager.register("Nav-shortcuts RIGHT", RIGHT, handleRight);
     
});