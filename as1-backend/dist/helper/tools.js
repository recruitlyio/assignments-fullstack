import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { neo4jDriver } from '../models/neo4j.js';
import { model } from "./model.js";
export const createNode = tool(async (input) => {
    const { label, properties } = input;
    const session = neo4jDriver.session();
    try {
        const result = await session.run(`CREATE (n:${label} $props) RETURN id(n) as id`, { props: properties });
        const record = result.records[0];
        return record ? record.get('id').toString() : '';
    }
    finally {
        await session.close();
    }
}, {
    name: 'create_node',
    description: 'Create a node with a given label and properties in the Neo4j graph.',
    schema: z.object({
        label: z.string(),
        properties: z.record(z.any())
    })
});
export const addRelation = tool(async (input) => {
    const { startId, endId, relType, properties = {} } = input;
    const session = neo4jDriver.session();
    try {
        const result = await session.run(`MATCH (a),(b)
         WHERE id(a) = $start AND id(b) = $end
         CREATE (a)-[r:${relType} $props]->(b)
         RETURN id(r) as id`, { start: startId, end: endId, props: properties });
        const record = result.records[0];
        return record ? record.get('id').toString() : '';
    }
    finally {
        await session.close();
    }
}, {
    name: 'add_relation',
    description: 'Add a relationship of a specified type between two existing nodes in Neo4j, with optional properties.',
    schema: z.object({
        startId: z.number(),
        endId: z.number(),
        relType: z.string(),
        properties: z.record(z.any()).optional()
    })
});
export const getNode = tool(async (input) => {
    const { nodeId } = input;
    const session = neo4jDriver.session();
    try {
        const result = await session.run(`MATCH (n)
         WHERE id(n) = $id
         RETURN labels(n) AS labels, properties(n) AS props`, { id: nodeId });
        const record = result.records[0];
        return record
            ? { labels: record.get('labels'), properties: record.get('props') }
            : null;
    }
    finally {
        await session.close();
    }
}, {
    name: 'get_node',
    description: 'Retrieve a node by its ID, returning its labels and properties.',
    schema: z.object({
        nodeId: z.number()
    })
});
export const getRelations = tool(async (input) => {
    const { nodeId, relType } = input;
    const session = neo4jDriver.session();
    try {
        const query = `MATCH (n)-[r${relType ? `:${relType}` : ''}]->(m)
                     WHERE id(n) = $id
                     RETURN id(m) AS targetId, type(r) AS type, properties(r) AS props`;
        const params = { id: nodeId };
        const result = await session.run(query, params);
        return result.records.map(record => ({
            targetId: record.get('targetId').toNumber(),
            type: record.get('type'),
            properties: record.get('props')
        }));
    }
    finally {
        await session.close();
    }
}, {
    name: 'get_relations',
    description: 'Retrieve outgoing relationships from a node, optionally filtered by relationship type.',
    schema: z.object({
        nodeId: z.number(),
        relType: z.string().optional()
    })
});
export const bindToolModel = model.bindTools([createNode, getNode, addRelation, getRelations]);
