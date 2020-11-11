import * as Blockly from "blockly/core";
import "blockly/javascript";

Blockly.Blocks["block_type_bg"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldLabelSerializable("set background color"),
        "NAME"
      )
      .appendField(new Blockly.FieldTextInput(""), "BG");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_bg"] = function (block) {
  var text_bg = block.getFieldValue("BG");
  // TODO: Assemble JavaScript into code variable.
  var code = `props.canvasBG({ backgroundColor: "${text_bg}" });`;
  return code;
};

Blockly.Blocks["block_type_draw_snake"] = {
  init: function () {
    this.appendDummyInput().appendField("draw snake");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_draw_snake"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "canvas.setIsSnakeDraw();";
  return code;
};

Blockly.Blocks["block_type_move_snake"] = {
  init: function () {
    this.appendDummyInput().appendField("move snake");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_move_snake"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "canvas.setIsMoveSnake();";
  return code;
};

Blockly.Blocks["block_type_create_area"] = {
  init: function () {
    this.appendDummyInput().appendField("create game area");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_create_area"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "canvas.clear();\ncanvas.main();";
  return code;
};

Blockly.Blocks["block_type_generate_food"] = {
  init: function () {
    this.appendDummyInput().appendField("generate food");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_generate_food"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "canvas.setGenerateFood();";
  return code;
};

Blockly.Blocks["block_type_eat_food"] = {
  init: function () {
    this.appendDummyInput().appendField("start eating");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_eat_food"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "canvas.setStartEating();";
  return code;
};

Blockly.Blocks["block_type_boundary_obstacle"] = {
  init: function () {
    this.appendDummyInput().appendField("restrict boundary");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["block_type_boundary_obstacle"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "canvas.setBoundaryObstacles();";
  return code;
};
