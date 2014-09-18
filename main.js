/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Nav Shortcuts Extension 
    VIM style cursor movement
*/
define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule("command/CommandManager"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule('document/DocumentManager'),
        KeyEvent = brackets.getModule('utils/KeyEvent');
    
    var characterPosition = 0;
    
    function getEditor(callback) {
        var Editor = EditorManager.getFocusedEditor();
        
        if (Editor) {
            return callback(Editor);
        } else {
            return false;
        }
    }
    
    function getCharacterPosition(callback) {
        return getEditor(function (Editor) {
            var position = Editor.getCursorPos();
            
            return callback(position);
        });
    }
    
    function getLinePosition() {
        return getEditor(function (Editor) {
            var position = Editor.getCursorPos();
            
            return position.line;
        });
    }
    
    function setLinePosition(line) {
        return getEditor(function (Editor) {
            return Editor.setCursorPos(line, getCharacterPosition(function (position) {
                if (position.ch > characterPosition) {
                    characterPosition = position.ch;
                }
                
                return characterPosition;
            }));
        });
    }
    
    function setCharacterPosition(character) {
        return getEditor(function (Editor) {
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
        var character = getCharacterPosition(function (position) {
            return position.ch;
        });
        
        if (character > 0) {
            setCharacterPosition(character - 1);
        }
    }
    
    function handleRight() {
        var character = getCharacterPosition(function (position) {
            return position.ch;
        });
        
        setCharacterPosition(character + 1);
    }
    
    
    function handleLineBegin() {
        setCharacterPosition(0);
    }
    
    function handleLineEnd() {
        var line = getLinePosition();
        
        return getDocument(function (document) {
            setCharacterPosition(document.getLine(line).length);
        });
    }
    
    function handleKeyEvent(jqueryEvent, editor, event) {
        if (event.type === "keydown") {
            switch (event.keyCode) {
                case KeyEvent.DOM_VK_BACK_SPACE:
                    characterPosition -= 1;
                    break;
                case KeyEvent.DOM_VK_RETURN:
                case KeyEvent.DOM_VK_ENTER:
                    characterPosition = 0;
                    console.log('that');
                    break;
            }
        }  
    }    
    
    function updateListener(event, newEditor, oldEditor) {
        if (newEditor) {
            $(newEditor).on("keyEvent", handleKeyEvent);   
        }
        
        if (oldEditor) {
            $(oldEditor).off("keyEvent", handleKeyEvent);
        }
    }
    
    var UP = "divsmith.nav-shortcuts.up";
    var DOWN = "divsmith.nav-shortcuts.down";
    var LEFT = "divsmith.nav-shortcuts.left";
    var RIGHT = "divsmith.nav-shortcuts.right";
    var LINE_END = "divsmith.nav-shortcuts.line-end";
    var LINE_BEGIN = "divsmith.nav-shortcuts.line-begin";
    
    CommandManager.register('Nav Shortcuts Line End', LINE_END, handleLineEnd);
    CommandManager.register('Nav Shortcuts Line Begin', LINE_BEGIN, handleLineBegin);
    CommandManager.register("Nav Shortcuts Up", UP, handleUp);
    CommandManager.register("Nav Shortcuts Down", DOWN, handleDown);
    CommandManager.register("Nav Shortcuts Left", LEFT, handleLeft);
    CommandManager.register("Nav Shortcuts Right", RIGHT, handleRight);

   $(EditorManager).on("activeEditorChange", updateListener);
    $(EditorManager.getActiveEditor()).on("keyEvent", handleKeyEvent);
     
});