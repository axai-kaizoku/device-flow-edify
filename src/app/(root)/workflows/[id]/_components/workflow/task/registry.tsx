import { AppTask } from "./app-task";
import { InstructionTask } from "./instruction-task";
import { PathTask } from "./path-task";
import { SplitTask } from "./split-task";
import { StartTask } from "./start";

export const TaskRegistry = {
  START: StartTask,
  APP: AppTask,
  INSTRUCTION: InstructionTask,
  PATH: PathTask,
  SPLIT: SplitTask,
};
