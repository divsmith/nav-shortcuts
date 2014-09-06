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
        Editor = EditorManager.getFocusedEditor();
    
    var UP = "divsmith.nav-shortcuts.up";
    var DOWN = "divsmith.nav-shortcuts.down";
    var LEFT = "divsmith.nav-shortcuts.left";
    var RIGHT = "divsmith.nav-shortcuts.right";
    
    CommandManager.register("Nav-shortcuts UP", UP, handleUp);
    CommandManager.register("Nav-shortcuts DOWN", UP, handleDown);
    CommandManager.register("Nav-shortcuts LEFT", UP, handleLeft);
    CommandManager.register("Nav-shortcuts RIGHT", UP, handleRight);
    
    
});