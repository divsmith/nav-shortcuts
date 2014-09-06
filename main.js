/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** {ext_name} Extension 
    description 
*/
define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule("command/CommandManager"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule('document/DocumentManager');
    
    var characterPosition = 0;
    
    function getCharacterPosition(callback) {
        return getEditor(function(Editor) {
            var position = Editor.getCursorPos();
            
            return callback(position);
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
            return Editor.setCursorPos(line, getCharacterPosition(function(position) {
                if (position.ch > characterPosition) {
                    characterPosition = position.ch;
                }
                
                return characterPosition;
            }));
        });
    }
    
    function setCharacterPosition(character) {
        return getEditor(function(Editor) {
            characterPosition = character;
            return Editor.setCursorPos(getLinePosition(), character);
        });
    }
    
    function getDocument(callback) {
        var document = DocumentManager.getCurrentDocument();
        
        if (document) {
            callback(document);
        } else {
            return false;
        }
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
        var character = getCharacterPosition(function(position) {
            return position.ch;
        });
        
        if (character > 0) {
            setCharacterPosition(character - 1);
        }
    }
    
    function handleRight() {
        var character = getCharacterPosition(function(position) {
            return position.ch;
        });
        
        setCharacterPosition(character + 1);
    }
    
    
    function handleLineBegin() {
        setCharacterPosition(0);
    }
    
    function handleLineEnd() {
        var line = getLinePosition();
        
        return getDocument(function(document) {
            setCharacterPosition(document.getLine(line).length);
        });
    }
    
    var UP = "divsmith.nav-shortcuts.up";
    var DOWN = "divsmith.nav-shortcuts.down";
    var LEFT = "divsmith.nav-shortcuts.left";
    var RIGHT = "divsmith.nav-shortcuts.right";
    var LINE_END = "divsmith.nav-shortcuts.line-end";
    var LINE_BEGIN = "divsmith.nav-shortcuts.line-begin";
    
    CommandManager.register('Nav-shortcuts Line End', LINE_END, handleLineEnd);
    CommandManager.register('Nav-shortcuts Line Begin', LINE_BEGIN, handleLineBegin);
    CommandManager.register("Nav-shortcuts UP", UP, handleUp);
    CommandManager.register("Nav-shortcuts DOWN", DOWN, handleDown);
    CommandManager.register("Nav-shortcuts LEFT", LEFT, handleLeft);
    CommandManager.register("Nav-shortcuts RIGHT", RIGHT, handleRight);
     
});