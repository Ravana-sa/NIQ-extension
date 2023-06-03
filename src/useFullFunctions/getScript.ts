import * as scripts from "../HelperScripts/scripts"

export default function getScript(scriptName: string): Function {
  return scripts[scriptName]
}
