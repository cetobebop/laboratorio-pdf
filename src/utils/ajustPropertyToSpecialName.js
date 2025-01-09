import { specialExamNames } from "src/global/specialExamNames";

export function ajustPropertyToSpecialName(name) {
  if (!specialExamNames[name]) return name;
  return specialExamNames[name];
}
