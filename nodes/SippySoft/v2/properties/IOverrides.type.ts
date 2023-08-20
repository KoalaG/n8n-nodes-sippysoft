import { INodeProperties } from "n8n-workflow";

export type ICollectionOption = Omit<INodeProperties, 'displayOptions' | 'required'>;
export type ICollectionOverrides = Partial<Omit<INodeProperties, 'type' | 'displayOptions' | 'options'>>;

