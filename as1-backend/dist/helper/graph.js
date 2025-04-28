import { model } from "./model.js";
import { addRelation, createNode, getNode, getRelations } from "./tools.js";
export const bindToolModel = model.bindTools([createNode, getNode, addRelation, getRelations]);
export const initializeKnowledgeGraph = async () => {
};
