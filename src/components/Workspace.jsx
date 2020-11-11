import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import * as Blockly from "blockly";
import "../customBlocks";
import * as canvas from "./canvasAssets";

let workspace = new Blockly.Workspace();
let j = 0;

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
    }
    j++;
  });

  function runCode() {
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    // alert(code);

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
  }

  function reset() {
    workspace.clear();
    canvas.clearCanvas();
  }
  return (
    <div className="BlocklyInnerContainer">
      <div className="buttonContainer">
        <Button size="sm" className="customButton" onClick={runCode}>
          {" "}
          run code{" "}
        </Button>
        <Button size="sm" className="customButton" onClick={reset}>
          {" "}
          reset{" "}
        </Button>
      </div>
      <div id="blocklyDiv"></div>
      <xml
        xmlns="https://developers.google.com/blockly/xml"
        id="toolbox"
        style={{ display: "none" }}
      >
        <category name="snake" colour="%{BKY_LOOPS_HUE}">
          <block type="block_type_create_area"></block>
          <block type="block_type_bg"></block>
          <block type="block_type_draw_snake"></block>
          <block type="block_type_move_snake"></block>
          <block type="block_type_boundary_obstacle"></block>
          <block type="block_type_generate_food"></block>
          <block type="block_type_eat_food"></block>
        </category>
        <category name="Loops" colour="%{BKY_LOOPS_HUE}">
          <block type="controls_repeat_ext">
            <value name="TIMES">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
          </block>
          <block type="controls_whileUntil"></block>
          <block type="controls_for">
            <field name="VAR">i</field>
            <value name="FROM">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
            <value name="TO">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
            <value name="BY">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
          <block type="controls_forEach"></block>
          <block type="controls_flow_statements"></block>
        </category>
      </xml>
    </div>
  );
}
