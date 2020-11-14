import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import * as Blockly from "blockly";
import "../customBlocks";
import * as canvas from "./canvasAssets";

let workspace = new Blockly.Workspace();
let j = 0;
let newCode = "";

export default function Workspace(props) {
  useEffect(() => {
    if (j === 0) {
      workspace = Blockly.inject("blocklyDiv", {
        toolbox: document.getElementById("toolbox"),
        scrollbars: true,
        move: {
          drag: true,
          wheel: true
        },
        grid: { spacing: 40, length: 2, colour: "#ccc", snap: true }
      });

      Blockly.Xml.domToWorkspace(
        document.getElementById("startingBlock"),
        workspace
      );
    }
    j++;
    // workspace.addChangeListener(Blockly.Events.disableOrphans);
  });

  function runCode() {
    canvas.clearCanvas();
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    newCode = code;
    canvas.main();
    props.canvasBG({ backgroundColor: canvas.bg });
    canvas.generateFood();
  }

  function reset() {
    workspace.clear();
    canvas.clearCanvas();
    Blockly.Xml.domToWorkspace(
      document.getElementById("startingBlock"),
      workspace
    );
  }
  return (
    <div className="BlocklyInnerContainer">
      <div className="buttonContainer">
        <Button
          variant="dark"
          size="sm"
          className="customButton"
          onClick={runCode}
        >
          {" "}
          run code{" "}
        </Button>
        <Button
          variant="dark"
          size="sm"
          className="customButton"
          onClick={reset}
        >
          {" "}
          reset{" "}
        </Button>
      </div>
      <div id="blocklyDiv"></div>
      <xml
        xmlns="https://developers.google.com/blockly/xml"
        id="startingBlock"
        style={{ display: "none" }}
      >
        <block type="block_type_set_game" deletable="false" movable="false" />
      </xml>
      <xml
        xmlns="https://developers.google.com/blockly/xml"
        id="toolbox"
        style={{ display: "none" }}
      >
        <category name="Logic" colour="%{BKY_LOGIC_HUE}">
          <block type="controls_if"></block>
        </category>

        <category name="snake" colour="#4C97FF">
          <block type="block_type_bg"></block>
          <block type="block_type_timeout"></block>
          <block type="block_type_draw_snake"></block>
          <block type="block_type_move_snake"></block>
          <block type="block_type_draw_food"></block>
          <block type="block_type_generate_block"></block>
          <block type="block_type_eat_food"></block>
          <block type="block_type_increase_score"></block>
          <block type="block_type_check_food"></block>
          <block type="block_type_draw_score"></block>
          <block type="block_type_up"></block>
          <block type="block_type_down"></block>
          <block type="block_type_left"></block>
          <block type="block_type_right"></block>
          <block type="block_type_snake_touched_itself"></block>
          <block type="block_type_snake_touched_boundary"></block>
          <block type="block_type_end_game"></block>
        </category>
      </xml>
    </div>
  );
}

export { newCode };
